import { useBoard } from "../Store/store";
import { handlePawn } from "./possibleMovesHelper/handlePawn";
import { handleKnight } from "./possibleMovesHelper/handleKnight";
import { handleBishop } from "./possibleMovesHelper/handleBishop";
import { handleRook } from "./possibleMovesHelper/handleRook";
import { handleQueen } from "./possibleMovesHelper/handleQueen";
import { handleMoveLogic } from "./handleMoveLogic";
import { playSound } from "./playSound";

interface SquareOccupancy {
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
    const currentColor = selectedPlayerColor;
    if (currentColor === "white") {
      setWhiteMoves({
        piece: newBoard[x][y].pieceType,
        from: { x: newBoard[x][y].x, y: newBoard[x][y].y },
        to: { x, y },
      })
    } else {
      setBlackMoves({
        piece: newBoard[x][y].pieceType,
        from: { x: newBoard[x][y].x, y: newBoard[x][y].y },
        to: { x, y },
      })
    }
    const newColor = selectedPlayerColor === "black" ? "white" : "black";
    newBoard[x][y].kill ? playSound("kill") : playSound("move");
    const possibleBoard = handleMoveLogic(newBoard, x, y);
    setSelectedPlayerColor(newColor);
    setBoard(possibleBoard);
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
    validMoves = handlePawn(selectedPiece, possibleBoard);
  }
  for (const move of validMoves) {
    possibleBoard[move.x][move.y] = {
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
