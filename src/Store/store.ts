import { create } from "zustand";
import { boardArray } from "../utils/BoardOccupancy";
import { moveHistory, SquareOccupancy } from "../utils/interfaces";

type boardStore = {
  currentPlayerColor: "white" | "black"; // set at the beginning of game
  selectedPlayerColor: "white" | "black"; // whose chance it is right now
  whiteMoves: moveHistory[];
  blackMoves: moveHistory[];
  check: boolean;
  currentBoard: SquareOccupancy[][];
  gameOver: boolean;
  setBoard: (newBoard: SquareOccupancy[][]) => void;
  setCheck: (check: boolean) => void;
  setSelectedPlayerColor: (color: "white" | "black") => void;
  setWhiteMoves: (move: moveHistory) => void;
  setBlackMoves: (move: moveHistory) => void;
  setGameOver: (gameOver: boolean) => void;
};

export const useBoard = create<boardStore>((set) => ({
  currentPlayerColor: "white",
  selectedPlayerColor: "white",
  whiteMoves: [],
  blackMoves: [],
  check: false,
  currentBoard: boardArray,
  gameOver: false,
  setBoard: (newBoard: SquareOccupancy[][]) => set({ currentBoard: newBoard }),
  setCheck: (check: boolean) => set({ check }),
  setSelectedPlayerColor: (color: "white" | "black") =>
    set({ selectedPlayerColor: color }),
  setWhiteMoves: (move: moveHistory) =>
    set((state) => ({ whiteMoves: [...state.whiteMoves, move] })),
  setBlackMoves: (move: moveHistory) =>
    set((state) => ({ blackMoves: [...state.blackMoves, move] })),
  setGameOver: (gameOver: boolean) => set({ gameOver }),
}));
