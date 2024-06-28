import { useBoard } from "../../Store/store";
import { handleBishop } from "./handleBishop";
import { handleKnight } from "./handleKnight";
import { handlePawn } from "./handlePawn";
import { handleQueen } from "./handleQueen";
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

interface moveHistory {
    piece: string,
    from: { x: number, y: number },
    to: { x: number, y: number }
}

interface validMoveInterface {
    x: number;
    y: number;
    kill: boolean;
}

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


export function allOpponentPossibleMoves() {
    const boardState = useBoard.getState();
    const currentBoard = boardState.currentBoard
    const selectedPieceColor = boardState.selectedPlayerColor
    const opponentColor = selectedPieceColor === "white" ? "black" : "white"

    const opponentPieces = currentBoard.flat().filter((piece) => piece.pieceColor === opponentColor)
    let validMoves: validMoveInterface[] = []
    const opponentMoves: validMoveInterface[] = []

    for (const piece of opponentPieces) {
        switch (piece.pieceType) {
            case "pawn":
                validMoves = handlePawn(piece, currentBoard)
                opponentMoves.push(...validMoves)
                break;
            case "rook":
                validMoves = handleRook(piece, currentBoard)
                opponentMoves.push(...validMoves)
                break;
            case "knight":
                validMoves = handleKnight(piece, currentBoard)
                opponentMoves.push(...validMoves)
                break;
            case "bishop":
                validMoves = handleBishop(piece, currentBoard)
                opponentMoves.push(...validMoves)
                break;
            case "queen":
                validMoves = handleQueen(piece, currentBoard)
                opponentMoves.push(...validMoves)
                break;
            // case "king":
            //     validMoves = handleKing(piece, currentBoard)
            //     opponentMoves.push(...validMoves)
            //     break;
        }
    }
    return opponentMoves;
}