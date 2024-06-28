import { useBoard } from "../../Store/store";
import { en_passant, isValidMove, moveImpact } from "./moveAnalyzer";

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

export function handlePawn(
    selectedPiece: SquareOccupancy,
    possibleBoard: SquareOccupancy[][]
): validMoveInterface[] {
    const boardSate = useBoard.getState()
    const myMoves = selectedPiece.pieceColor === 'black' ? boardSate.blackMoves : boardSate.whiteMoves
    const opponentMoves = selectedPiece.pieceColor === 'white' ? boardSate.blackMoves : boardSate.whiteMoves

    const foundPawn = myMoves.find(move => move.piece === selectedPiece.id)
    const pawnFirstMove = foundPawn ? false : true

    const validMoves: validMoveInterface[] = [];
    const currentX = selectedPiece.x;
    const currentY = selectedPiece.y;
    if (selectedPiece.pieceColor === 'white') {
        const possibleMoves = [
            { x: currentX - 1, y: currentY },
            { x: currentX - 1, y: currentY - 1 },
            { x: currentX - 1, y: currentY + 1 },
        ]
        if (pawnFirstMove) possibleMoves.push({ x: currentX - 2, y: currentY });
        for (const move of possibleMoves) {
            if (isValidMove(move.x, move.y)) {
                const state = moveImpact(possibleBoard, move.x, move.y, selectedPiece.pieceColor)
                if (move.y !== currentY) {
                    if (state === 'kill' || en_passant(opponentMoves, move.x, move.y)) {
                        validMoves.push({
                            ...move, kill: true
                        })
                    }
                } else {
                    if (state === 'empty') {
                        validMoves.push({
                            ...move, kill: false
                        })
                    }
                }
            }
        }
    } else {
        const possibleMoves = [
            { x: currentX + 1, y: currentY },
            { x: currentX + 1, y: currentY - 1 },
            { x: currentX + 1, y: currentY + 1 },
        ]
        if (pawnFirstMove) possibleMoves.push({ x: currentX + 2, y: currentY });
        for (const move of possibleMoves) {
            if (isValidMove(move.x, move.y)) {
                const state = moveImpact(possibleBoard, move.x, move.y, selectedPiece.pieceColor!)
                if (move.y !== currentY) {
                    if (state === 'kill' || en_passant(opponentMoves, move.x, move.y)) {
                        validMoves.push({
                            ...move, kill: true
                        })
                    }
                } else {
                    if (state === 'empty') {
                        validMoves.push({
                            ...move, kill: false
                        })
                    }
                }
            }
        }
    }
    return validMoves;
}