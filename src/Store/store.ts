import { create } from "zustand";
import { boardArray } from "../utils/BoardOccupancy";

interface SquareOccupancy {
    id: string,
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
    setCheck: (check: boolean) => void,
    setSelectedPlayerColor: (color: "white" | "black") => void,
    setWhiteMoves: (move: moveHistory) => void,
    setBlackMoves: (move: moveHistory) => void
}

export const useBoard = create<boardStore>((set) => ({
    currentPlayerColor: "white",
    selectedPlayerColor: "white",
    whiteMoves: [],
    blackMoves: [],
    check: false,
    currentBoard: boardArray,
    setBoard: (newBoard: SquareOccupancy[][]) =>  set({currentBoard: newBoard}),
    setCheck: (check: boolean) => set({check}),
    setSelectedPlayerColor: (color: "white" | "black") => set({selectedPlayerColor: color}),
    setWhiteMoves: (move: moveHistory) => set((state) => ({whiteMoves: [...state.whiteMoves, move]})),
    setBlackMoves: (move: moveHistory) => set((state) => ({blackMoves: [...state.blackMoves, move]}))
}))