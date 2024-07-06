import { SquareOccupancy } from "./interfaces";
import { allPossibleMovesOfGivenColor } from "./possibleMovesHelper/allOpponentPossibleMoves";

export function isKingChecked(currentBoard: SquareOccupancy[][], myColor: "white" | "black") {
    const opponentColor = myColor === "white" ? "black" : "white";
    const opponentMoves = allPossibleMovesOfGivenColor(currentBoard, opponentColor);
    const king = currentBoard.flat().find((piece) => piece.pieceType === "king" && piece.pieceColor === myColor);
    const kingX = king!.x;
    const kingY = king!.y;
    const isKingChecked = opponentMoves.some((move) => move.x === kingX && move.y === kingY);
    return isKingChecked;
}