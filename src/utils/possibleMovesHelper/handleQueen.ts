import { SquareOccupancy, validMoveInterface } from "../interfaces";
import { handleBishop } from "./handleBishop";
import { handleRook } from "./handleRook";

export function handleQueen(
  selectedPiece: SquareOccupancy,
  possibleBoard: SquareOccupancy[][],
): validMoveInterface[] {
  const validMoves: validMoveInterface[] = [];

  const bishopMoves = handleBishop(selectedPiece, possibleBoard);
  const rookMoves = handleRook(selectedPiece, possibleBoard);

  validMoves.push(...bishopMoves, ...rookMoves);

  return validMoves;
}
