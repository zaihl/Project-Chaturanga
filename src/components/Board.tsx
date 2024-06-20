// this function renders the board and the pieces on it

import { useState, useEffect } from "react";
import { initialPiecePositions } from "../utils/initialPiecePositions";
import { validMoves } from "../utils/possibleMoves";
import { boardBuilder } from "../utils/boardBuilder";

interface ChessPiece {
  piece: string;
  svg: React.ReactElement;
  position: { x: number; y: number };
}


const Board = ({ myColor }: { myColor: "black" | "white" }) => {
  const [piecePositions, setPiecePositions] = useState<ChessPiece[]>(
    initialPiecePositions
  );
  const [board, setBoard] = useState<React.ReactNode[]>([]);

  const validMovesArray = validMoves(piecePositions, myColor);

  useEffect(() => {
    const boardArray = boardBuilder(
      piecePositions,
      myColor,
      validMovesArray,
      handleBoardChange
    );
    setBoard(boardArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleBoardChange(newBoard: React.ReactNode[]) {
    setBoard(newBoard);
  }

  return (
    <div className="board bg-slate-800 flex items-center justify-center md:justify-start md:py-3 md:px-5 md:h-screen h-[65vh]">
      <div
        onClick={() => setPiecePositions(initialPiecePositions)}
        className="md:rounded-lg rounded-md overflow-hidden grid grid-rows-8 grid-cols-8"
      >
        {board}
      </div>
    </div>
  );
};


export default Board;
