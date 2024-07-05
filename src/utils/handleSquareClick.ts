import { useBoard } from "../Store/store";
import { handlePawn } from "./possibleMovesHelper/handlePawn";
import { handleKnight } from "./possibleMovesHelper/handleKnight";
import { handleBishop } from "./possibleMovesHelper/handleBishop";
import { handleRook } from "./possibleMovesHelper/handleRook";
import { handleQueen } from "./possibleMovesHelper/handleQueen";
import { handleMoveLogic } from "./handleMoveLogic";
import { playSound } from "./playSound";
import { isKingChecked } from "./isKingChecked";
import { handleKing } from "./possibleMovesHelper/handleKing";

interface SquareOccupancy {
  id: string;
  pieceType: string;
  pieceColor?: "black" | "white";
  pieceSVG: React.ReactNode;
  x: number;
  y: number;
  state: "piece" | "empty" | "possibleMove";
  selected: boolean;
  kill: boolean;
}

interface validMoveInterface {
  x: number;
  y: number;
  kill: boolean;
}

export function handleClick(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  x: number,
  y: number
) {
  const boardState = useBoard.getState();
  const selectedPlayerColor = boardState.selectedPlayerColor;
  const setSelectedPlayerColor = boardState.setSelectedPlayerColor;
  const setWhiteMoves = boardState.setWhiteMoves;
  const setBlackMoves = boardState.setBlackMoves;
  const setCheck = boardState.setCheck;
  const setGameOver = boardState.setGameOver;

  const board = useBoard.getState().currentBoard;
  const setBoard = useBoard.getState().setBoard;
  e.preventDefault();

  const newBoard = board.slice();

  if (newBoard[x][y].pieceColor !== selectedPlayerColor && newBoard[x][y].state !== "possibleMove") {
    newBoard.forEach((row) =>
      row.forEach((square) => {
        square.selected = false;
        square.kill = false;
        square.state = square.pieceColor === undefined ? "empty" : "piece";
      })
    );
    setBoard(newBoard);
    return;
  }

  if (newBoard[x][y].state === "possibleMove") {
    const selectedPiece = newBoard.flat().find((square) => square.selected) as SquareOccupancy;
    const selectedX = selectedPiece.x;
    const selectedY = selectedPiece.y;
    const currentColor = selectedPlayerColor;
    
    let tempBoard = board.map(row => row.slice().map(sq => ({...sq})));

    tempBoard = handleMoveLogic(tempBoard, x, y);

    if (isKingChecked(tempBoard, currentColor)) {
      newBoard.forEach((row) =>
        row.forEach((square) => {
          square.selected = false;
          square.kill = false;
          square.state = square.pieceColor === undefined ? "empty" : "piece";
        })
      );
      newBoard[selectedX][selectedY].selected = true;
      setCheck(true);
      setBoard(newBoard);
      return;
    }

    if (currentColor === "white") {
      setWhiteMoves({
        piece: newBoard[selectedX][selectedY].id,
        from: { x: selectedX, y: selectedY},
        to: { x, y },
      })
    } else {
      setBlackMoves({
        piece: newBoard[selectedX][selectedY].id,
        from: { x: selectedX, y: selectedY },
        to: { x, y },
      })
    }
    const newColor = selectedPlayerColor === "black" ? "white" : "black";
    newBoard[x][y].kill ? playSound("kill") : playSound("move");
    const possibleBoard = handleMoveLogic(newBoard, x, y);
    setSelectedPlayerColor(newColor);
    setBoard(possibleBoard);

    possibleBoard[x][y].selected = true;
    if (isKingChecked(possibleBoard, newColor)) {
      setCheck(true);
      const selectedKing = possibleBoard.flat().find(sq => sq.pieceColor !== currentColor && sq.pieceType === "king")!
      const validMoves = handleKing(selectedKing, possibleBoard);
      console.log("here are the valid moves", validMoves);
      if (validMoves.length===0) {
        setGameOver(true);
      }
    }
    possibleBoard[x][y].selected = false;
    return;
  }
  newBoard.forEach((row) =>
    row.forEach((square) => {
      square.selected = false;
      square.kill = false;
      square.state = square.pieceColor === undefined ? "empty" : "piece";
    })
  );
  newBoard[x][y].selected = newBoard[x][y].state === "empty" ? false : true;
  const possibleBoard = possibleMoves(newBoard);
  setBoard(possibleBoard);
}

function possibleMoves(newBoard: SquareOccupancy[][]): SquareOccupancy[][] {
  const possibleBoard = newBoard;
  const selectedRow = newBoard.find((row) => row.find((sq) => sq.selected));
  if (selectedRow === undefined) return possibleBoard;
  const selectedPiece = selectedRow.find((square) => square.selected);
  if (selectedPiece === undefined) return possibleBoard;
  const pieceType = selectedPiece.pieceType;
  let validMoves: validMoveInterface[] = [];
  if (pieceType === "pawn") {
    validMoves = handlePawn(selectedPiece, possibleBoard);
  } else if (pieceType === "knight") {
    validMoves = handleKnight(selectedPiece, possibleBoard);
  } else if (pieceType === "rook") {
    validMoves = handleRook(selectedPiece, possibleBoard);
  } else if (pieceType === "bishop") {
    validMoves = handleBishop(selectedPiece, possibleBoard);
  } else if (pieceType === "queen") {
    validMoves = handleQueen(selectedPiece, possibleBoard);
  } else if (pieceType === "king") {
    validMoves = handleKing(selectedPiece, possibleBoard);
  }
  for (const move of validMoves) {
    possibleBoard[move.x][move.y] = {
      id: possibleBoard[move.x][move.y].id,
      x: move.x,
      y: move.y,
      selected: false,
      pieceType: possibleBoard[move.x][move.y].pieceType,
      pieceSVG: possibleBoard[move.x][move.y].pieceSVG,
      pieceColor: possibleBoard[move.x][move.y].pieceColor,
      kill: move.kill,
      state: "possibleMove",
    };
  }

  return possibleBoard;
}
