interface ChessPiece {
    piece: string;
    svg: React.ReactElement;
    position: { x: number; y: number };
}

interface ValidMovesReturn {
    name: string;
    validMoves: {
        x: number;
        y: number;
    }[];
}

type chessColor = "black" | "white";

export const validMoves = (piecePosistions: ChessPiece[], myColor: chessColor) => {
    const result: ValidMovesReturn[] = [{ name: "null", validMoves: [{ x: 0, y: 0 }] }];
    for (const piece of piecePosistions) {
        const pieceName = piece.piece;
        const pieceColor = pieceName.includes("black") ? "black" : "white";
        if (pieceName.includes("Rook")) {
            const validMoves = handleRook(piece.position.x, piece.position.y, pieceColor, myColor)
            result.push({ name: pieceName, validMoves })

        } else if (pieceName.includes("Knight")) {
            const validMoves = handleKnight(piece.position.x, piece.position.y, pieceColor, myColor)
            result.push({ name: pieceName, validMoves })

        } else if (pieceName.includes("Bishop")) {
            const validMoves = handleBishop(piece.position.x, piece.position.y, pieceColor, myColor)
            result.push({ name: pieceName, validMoves })

        } else if (pieceName.includes("Queen")) {
            const validMoves = handleQueen(piece.position.x, piece.position.y, pieceColor, myColor)
            result.push({ name: pieceName, validMoves })

        } else if (pieceName.includes("King")) {
            const validMoves = handleKing(piece.position.x, piece.position.y, pieceColor, myColor)
            result.push({ name: pieceName, validMoves })

        } else {
            const validMoves = handlePawn(piece.position.x, piece.position.y, pieceColor, myColor)
            result.push({ name: pieceName, validMoves })

        }
    }
    return result;
}

function handleRook(x: number, y: number, pieceColor: "black" | "white", myColor: chessColor): { x: number, y: number }[] {
    x; y; pieceColor; myColor;
    const result: { x: number, y: number }[] = [];
    for (let i = 0; i < 8; i++) {
        result.push({ x: i, y: y });
    }
    for (let i = 0; i < 8; i++) {
        result.push({ x: x, y: i });
    }
    return result;
}

function handleKnight(x: number, y: number, pieceColor: "black" | "white", myColor: chessColor): { x: number, y: number }[] {
    pieceColor; myColor;
    const moves = [
        { x: x - 2, y: y - 1 },
        { x: x - 2, y: y + 1 },
        { x: x - 1, y: y - 2 },
        { x: x - 1, y: y + 2 },
        { x: x + 1, y: y - 2 },
        { x: x + 1, y: y + 2 },
        { x: x + 2, y: y - 1 },
        { x: x + 2, y: y + 1 },
    ]
    return moves.filter(move => move.x >= 0 && move.x < 8 && move.y >= 0 && move.y < 8)
}

function handleBishop(x: number, y: number, pieceColor: "black" | "white", myColor: chessColor): { x: number, y: number }[] {
    pieceColor; myColor;
    const moves = []
    for (let i = 1; i < 8; i++) {
        moves.push({ x: x + i, y: y + i });
        moves.push({ x: x + i, y: y - i });
        moves.push({ x: x - i, y: y + i });
        moves.push({ x: x - i, y: y - i });
    }
    return moves.filter(move => move.x >= 0 && move.x < 8 && move.y >= 0 && move.y < 8)
}

function handleQueen(x: number, y: number, pieceColor: "black" | "white", myColor: chessColor): { x: number, y: number }[] {
    pieceColor; myColor;
    const rookMoves = handleRook(x, y, pieceColor, myColor).concat(handleBishop(x, y, pieceColor, myColor));
    const bishopMoves = handleBishop(x, y, pieceColor, myColor);
    const moves = Array.from(new Set([...rookMoves, ...bishopMoves]));
    return moves.filter(move => move.x >= 0 && move.x < 8 && move.y >= 0 && move.y < 8);
}

function handleKing(x: number, y: number, pieceColor: "black" | "white", myColor: chessColor): { x: number, y: number }[] {
    pieceColor; myColor;
    const moves = [
        { x: x - 1, y: y - 1 },
        { x: x - 1, y: y },
        { x: x - 1, y: y + 1 },
        { x: x, y: y - 1 },
        { x: x, y: y + 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y: y },
        { x: x + 1, y: y + 1 },
    ]
    return moves.filter(move => move.x >= 0 && move.x < 8 && move.y >= 0 && move.y < 8);
}

function handlePawn(x: number, y: number, pieceColor: "black" | "white", myColor: chessColor): { x: number, y: number }[] {
    if (myColor === pieceColor) {
        return [
            { x: x - 1, y: y },
            { x: x - 2, y: y },
        ]
    } else {
        return [
            { x: x + 1, y: y },
            { x: x + 2, y: y },
        ]
    }
}
