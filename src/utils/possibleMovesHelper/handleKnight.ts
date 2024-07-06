import { SquareOccupancy, validMoveInterface } from "../interfaces";
import { isValidMove, moveImpact } from "./moveAnalyzer";

export function handleKnight(
    selectedPiece: SquareOccupancy,
    possibleBoard: SquareOccupancy[][]
): validMoveInterface[] {
    const validMoves: validMoveInterface[] = [];
    const currentX = selectedPiece.x;
    const currentY = selectedPiece.y;

    const possibleMoves = [
        { x: currentX - 2, y: currentY - 1 },
        { x: currentX - 2, y: currentY + 1 },
        { x: currentX + 2, y: currentY - 1 },
        { x: currentX + 2, y: currentY + 1 },
        { x: currentX - 1, y: currentY - 2 },
        { x: currentX - 1, y: currentY + 2 },
        { x: currentX + 1, y: currentY - 2 },
        { x: currentX + 1, y: currentY + 2 },
    ]

    for (const move of possibleMoves) {
        if (isValidMove(move.x, move.y)) {
            const state = moveImpact(possibleBoard, move.x, move.y, selectedPiece.pieceColor!)
            if (state !== 'self') {
                validMoves.push({
                    ...move,
                    kill: state === 'kill',
                })
            }
        }
    }

    return validMoves;
}