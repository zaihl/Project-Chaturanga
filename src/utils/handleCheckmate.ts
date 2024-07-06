import { useBoard } from "../Store/store";
import { handleMoveLogic } from "./handleMoveLogic";
import { SquareOccupancy } from "./interfaces";
import { isKingChecked } from "./isKingChecked";
import { possibleMoves } from "./possibleMoves";

export function handleCheckmate(currentColor: "white" | "black") {
  // move is from our side. We have to check if opponent is checkmated
  const boardState = useBoard.getState();
  const board = boardState.currentBoard;
  const setGameOver = boardState.setGameOver;
  const opponentColor = currentColor === "black" ? "white" : "black";
  const currentBoard: SquareOccupancy[][] = board
    .slice()
    .map((row) => row.slice().map((sq) => ({ ...sq })));
  const opponentPieces = currentBoard
    .flat()
    .filter((sq) => sq.pieceColor === opponentColor)!;

  let count = 0;

  for (const piece of opponentPieces) {
    currentBoard.forEach((row) =>
      row.forEach((square) => {
        square.selected = false;
        square.kill = false;
        square.state = square.pieceColor === undefined ? "empty" : "piece";
      }),
    );
    const currentX = piece.x;
    const currentY = piece.y;
    const selectedPiece = currentBoard
      .flat()
      .find((sq) => sq.x === currentX && sq.y === currentY)!;
    selectedPiece.selected = true;
    const possibleSquares: SquareOccupancy[][] = possibleMoves(currentBoard);
    const validMoves = possibleSquares
      .flat()
      .filter((sq) => sq.state === "possibleMove");
    for (const move of validMoves) {
      count = count + 1;
      const selectedPiece = currentBoard
        .flat()
        .find((sq) => sq.x === currentX && sq.y === currentY)!;
      selectedPiece.selected = true;
      const tempBoard = handleMoveLogic(currentBoard, move.x, move.y);
      const isChecked = isKingChecked(tempBoard, opponentColor);
      if (!isChecked) {
        return;
      }
    }
  }
  setGameOver(true);
}
