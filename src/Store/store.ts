import { create } from "zustand";
import { boardArray } from "../utils/BoardOccupancy";

interface SquareOccupancy {
    pieceType: string,
    pieceColor?: "black" | "white",
    pieceSVG: React.ReactNode,
    x: number;
    y: number;
    state: "piece" | "empty" | "possibleMove",
    selected: boolean;
    kill: boolean;
}

interface moveHistory {
    piece: string,
    from: {x: number, y: number},
    to: {x: number, y: number}
}

type boardStore = {
    currentPlayerColor: "white" | "black", // set at the beginning of game
    selectedPlayerColor: "white" | "black", // whose chance it is right now
    whiteMoves: moveHistory[],
    blackMoves: moveHistory[],
    check: boolean,
    currentBoard: SquareOccupancy[][],
    setBoard: (newBoard: SquareOccupancy[][]) => void,
    setCheck: (check: boolean) => void
}

export const useBoard = create<boardStore>((set) => ({
    currentPlayerColor: "white",
    selectedPlayerColor: "white",
    whiteMoves: [],
    blackMoves: [{ piece: 'pawn', from: { x: 2, y: 5 }, to: { x: 4, y: 5 } }],
    check: false,
    currentBoard: boardArray,
    setBoard: (newBoard: SquareOccupancy[][]) =>  set({currentBoard: newBoard}),
    setCheck: (check: boolean) => set({check})
}))