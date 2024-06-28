import { handleBishop } from "./handleBishop";
import { handleRook } from "./handleRook";

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

export function handleQueen(
  selectedPiece: SquareOccupancy,
  possibleBoard: SquareOccupancy[][]
): validMoveInterface[] {
  const validMoves: validMoveInterface[] = [];

  const bishopMoves = handleBishop(selectedPiece, possibleBoard);
  const rookMoves = handleRook(selectedPiece, possibleBoard);

  validMoves.push(...bishopMoves, ...rookMoves);

  return validMoves;
}
