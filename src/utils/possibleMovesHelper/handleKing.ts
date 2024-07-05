import { isValidMoveForKing, moveImpact } from "./moveAnalyzer";

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

export function handleKing(
    selectedPiece: SquareOccupancy,
    possibleBoard: SquareOccupancy[][]
): validMoveInterface[] {
    const validMoves: validMoveInterface[] = [];
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

    return validMoves;
}