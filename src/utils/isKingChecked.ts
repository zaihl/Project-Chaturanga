import { allPossibleMovesOfGivenColor } from "./possibleMovesHelper/allOpponentPossibleMoves";

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

export function isKingChecked(currentBoard: SquareOccupancy[][], myColor: "white" | "black") {
    const opponentColor = myColor === "white" ? "black" : "white";
    const opponentMoves = allPossibleMovesOfGivenColor(currentBoard, opponentColor);
    const king = currentBoard.flat().find((piece) => piece.pieceType === "king" && piece.pieceColor === myColor);
    const kingX = king!.x;
    const kingY = king!.y;
    const isKingChecked = opponentMoves.some((move) => move.x === kingX && move.y === kingY);
    return isKingChecked;
}