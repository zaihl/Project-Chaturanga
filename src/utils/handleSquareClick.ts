import { useBoard } from "../Store/store";
import { handlePawn } from "./possibleMovesHelper/handlePawn";
import { handleKnight } from "./possibleMovesHelper/handleKnight";
import { handleBishop } from "./possibleMovesHelper/handleBishop";
import { handleRook } from "./possibleMovesHelper/handleRook";
import { handleQueen } from "./possibleMovesHelper/handleQueen";

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
  const board = useBoard.getState().currentBoard;
  const setBoard = useBoard.getState().setBoard;
  e.preventDefault();
  const newBoard = board.slice();
  newBoard.forEach((row) => row.forEach((square) => {
    square.selected = false;
    square.kill = false;
    square.state = square.pieceColor === undefined ? 'empty' : 'piece';
  }));
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