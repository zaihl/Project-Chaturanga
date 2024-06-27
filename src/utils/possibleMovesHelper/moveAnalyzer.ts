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

interface moveHistory {
    piece: string,
    from: { x: number, y: number },
    to: { x: number, y: number }
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
    if (lastMove.piece === 'pawn') {
        if ((lastMove.to.x === x-1 || lastMove.to.x === x+1) && (lastMove.to.y === y)) {
            if ((lastMove.from.x - x === 1) || (x - lastMove.from.x === 1)) {
                return true;
            }
        }
    } 
    return false;
}
