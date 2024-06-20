import { useBoard } from "../Store/store";
import Square from "./Square";

interface SquareOccupancy {
  pieceType: string;
  pieceColor?: "black" | "white";
  pieceSVG: React.ReactNode;
  x: number;
  y: number;
  state: "piece" | "empty" | "possibleMove";
}

const Board = () => {
  const currentBoard = useBoard((state) => state.currentBoard);
  const renderedBoard = boardBuilder(currentBoard);
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
          pieceSVG={currentBoard[i][j].pieceSVG}
          x={i}
          y={j}
          state={currentBoard[i][j].state}
        />
      );
    }
  }
  return board;
};

export default Board;
