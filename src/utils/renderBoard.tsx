// this file rederes the entire board based on the input revived from the boardBuilder function

import Square from "../components/Square";

interface ChessPiece {
    piece: string;
    svg: React.ReactElement;
    position: { x: number; y: number };
}

interface SquareInterface {
    pieceSVG: React.ReactElement;
    x: number;
    y: number;
    cursor: string;
    handleMouseClick: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        pieceName: string
    ) => void;
    pieceName: string;
    blob?: boolean;
}

export function renderBoard(
    piecePositions: ChessPiece[],
    handleMouseClick: SquareInterface["handleMouseClick"],
    prevBoard: React.ReactNode[]
) {
    const board: React.ReactNode[] = prevBoard;
    for (const piece of piecePositions) {
        board[piece.position.x * 8 + piece.position.y] = (
            <Square
        key= { piece.piece }
        pieceSVG = { piece.svg }
        x = { piece.position.x }
        y = { piece.position.y }
        cursor = "cursor-pointer"
        handleMouseClick = { handleMouseClick }
        pieceName = { piece.piece }
            />
    );
    }
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i * 8 + j]) continue;
            else
                board[i * 8 + j] = (
                    <Square
            key= {`${i},${j}`
        }
        pieceSVG = {<> </>}
        x = { i }
        y = { j }
        cursor = "cursor-default"
        handleMouseClick = { handleMouseClick }
        pieceName = "null"
            />
        );
    }
}
return board;
}