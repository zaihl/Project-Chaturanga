import { SquareOccupancy, validMoveInterface } from "../interfaces";
import { handleCastle } from "./handleCastle";
import { isValidMoveForKing, moveImpact } from "./moveAnalyzer";

export function handleKing(
    selectedPiece: SquareOccupancy,
    possibleBoard: SquareOccupancy[][]
): validMoveInterface[] {
    let validMoves: validMoveInterface[] = [];
    const currentX = selectedPiece.x;
    const currentY = selectedPiece.y;

    const possibleMoves = [
        { x: currentX - 1, y: currentY },
        { x: currentX - 1, y: currentY - 1 },
        { x: currentX - 1, y: currentY + 1 },
        { x: currentX, y: currentY - 1 },
        { x: currentX, y: currentY + 1 },
        { x: currentX + 1, y: currentY },
        { x: currentX + 1, y: currentY - 1 },
        { x: currentX + 1, y: currentY + 1 },
    ]

    for (const move of possibleMoves) {
        if (isValidMoveForKing(move.x, move.y, possibleBoard, selectedPiece.pieceColor!)) {
            const state = moveImpact(possibleBoard, move.x, move.y, selectedPiece.pieceColor!)
            if (state !== 'self') {
                validMoves.push({
                    ...move,
                    kill: state === 'kill',
                })
            }
        }
    }

    const castleMoves = handleCastle(possibleBoard, selectedPiece.pieceColor!)
    if (castleMoves.length>0) validMoves = [...validMoves, ...castleMoves]

    return validMoves;
}