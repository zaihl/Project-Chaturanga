import { useBoard } from "../Store/store";
import Square from "./Square";
import { playSound } from "../utils/playSound";
import { useEffect } from "react";

interface SquareOccupancy {
  id: string
  pieceType: string;
  pieceColor?: "black" | "white";
  pieceSVG: React.ReactNode;
  x: number;
  y: number;
  state: "piece" | "empty" | "possibleMove";
  selected: boolean;
  kill: boolean;
}

const Board = () => {
  const currentBoard = useBoard((state) => state.currentBoard);
  const gameOver = useBoard((state) => state.gameOver)
  console.log("IS IT CHECKMATE? ", gameOver)
  const renderedBoard = boardBuilder(currentBoard);
  useEffect(() => {
    playSound("move");
    playSound("kill")
  }, [])
  return (
    <div className="grid grid-cols-8 grid-rows-8 w-96 md:w-[42rem] rounded-lg overflow-hidden">
      {renderedBoard}
    </div>
  );
};

const boardBuilder = (currentBoard: SquareOccupancy[][]) => {
  const board = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board[8 * i + j] = (
        <Square
          key={`${i},${j}`}
          pieceSVG={currentBoard[i][j].pieceSVG}
          x={i}
          y={j}
          state={currentBoard[i][j].state}
          selected={currentBoard[i][j].selected}
          pieceType={currentBoard[i][j].pieceType}
          pieceColor={currentBoard[i][j].pieceColor}
          kill={currentBoard[i][j].kill}
        />
      );
    }
  }
  console.log('white move history', useBoard.getState().whiteMoves)
  console.log('black move history', useBoard.getState().blackMoves)
  console.log(board);
  return board;
};

export default Board;
