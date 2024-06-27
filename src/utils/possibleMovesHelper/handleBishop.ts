import { isValidMove, moveImpact } from "./moveAnalyzer";

interface SquareOccupancy {
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

export function handleBishop(
    selectedPiece: SquareOccupancy,
    possibleBoard: SquareOccupancy[][]
): validMoveInterface[] {
    const validMoves: validMoveInterface[] = [];
    const currentX = selectedPiece.x;
    const currentY = selectedPiece.y;

    const directions = [
        { x: 1, y: 1 },
        { x: -1, y: -1 },
        { x: 1, y: -1 },
        { x: -1, y: 1 },
    ];

    for (let i = 0; i < directions.length; i++) {
        let distance = 1;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const move = {
                x: currentX + distance * directions[i].x,
                y: currentY + distance * directions[i].y,
            };

            if (!isValidMove(move.x, move.y)) break;

            const state = moveImpact(possibleBoard, move.x, move.y, selectedPiece.pieceColor!);
            if (state === 'self') break;

            validMoves.push({
                ...move,
                kill: state === 'kill',
            });
            if (state === 'kill') break;

            distance++;
        }
    }
    return validMoves;
}