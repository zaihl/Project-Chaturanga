import { create } from "zustand";
import { boardArray } from "../utils/BoardOccupancy";

interface SquareOccupancy {
    pieceType: string,
    pieceColor?: "black" | "white",
    pieceSVG: React.ReactNode,
    x: number;
    y: number;
    state: "piece" | "empty" | "possibleMove";
}

type boardStore = {
    currentBoard: SquareOccupancy[][],
}

export const useBoard = create<boardStore>(() => ({
    currentBoard: boardArray,
}))