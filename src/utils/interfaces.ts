export interface SquareOccupancy {
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

export interface validMoveInterface {
    x: number;
    y: number;
    kill: boolean;
}

export interface SquareProps {
    pieceType: string;
    pieceColor?: "black" | "white";
    pieceSVG: React.ReactNode;
    x: number;
    y: number;
    state: "piece" | "empty" | "possibleMove";
    selected: boolean;
    kill: boolean;
}

export interface moveHistory {
    piece: string,
    from: { x: number, y: number },
    to: { x: number, y: number }
}