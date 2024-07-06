import { moveHistory, SquareOccupancy } from "../interfaces";
import { allPossibleMovesOfGivenColor } from "./allOpponentPossibleMoves";

export function isValidMove(x: number, y: number) {
    if (x < 8 && y < 8 && x >= 0 && y >= 0) {
        return true;
    }
    return false;
}

export function moveImpact(
    possibleBoard: SquareOccupancy[][],
    x: number,
    y: number,
    selectedPieceColor: "white" | "black" | undefined
): "kill" | "empty" | "self" {
    if (possibleBoard[x][y].pieceColor === undefined) {
        return "empty";
    } else {
        if (possibleBoard[x][y].pieceColor === selectedPieceColor) {
            return "self";
        } else {
            return "kill";
        }
    }
}

export function en_passant(opponentMoves: moveHistory[], x: number, y: number): boolean {
    const lastMove = opponentMoves[opponentMoves.length - 1]
    if (lastMove?.piece.includes('pawn')) {
        if ((lastMove.to.x === x - 1 || lastMove.to.x === x + 1) && (lastMove.to.y === y)) {
            if ((lastMove.from.x - x === 1) || (x - lastMove.from.x === 1)) {
                return true;
            }
        }
    }
    return false;
}



export function isValidMoveForKing(x: number, y: number, currentBoard: SquareOccupancy[][], selectedColor: "white" | "black") {
    if (!isValidMove(x, y)) {
        return false;
    }
    const opponentColor = selectedColor === "black" ? "white" : "black";
    const opponentMoves = allPossibleMovesOfGivenColor(currentBoard, opponentColor)
    for (const opponentMove of opponentMoves) {
        if (opponentMove.x === x && opponentMove.y === y) {
            return false;
        }
    }
    return true;
}