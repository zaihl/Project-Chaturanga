import { useState } from "react";
import { initialPiecePositions } from "./PieceLocations";

interface ChessPiece {
  piece: string;
  svg: React.ReactElement;
  position: { x: number; y: number };
}

const Board = () => {
  const [piecePositions, setPiecePositions] = useState<ChessPiece[]>(initialPiecePositions);

  const boardArray = boardBuilder(piecePositions);

  return (
    <div className="board bg-slate-800 flex items-center justify-center xl:justify-start py-2 xl:px-8 xl:h-screen">
      <div onClick={() => setPiecePositions(initialPiecePositions)} className="md:rounded-lg rounded-md overflow-hidden grid grid-rows-8 grid-cols-8">
        {boardArray}
      </div>
    </div>
  );
};

const Square = (props: {pieceSVG: React.ReactElement, x: number, y: number, cursor: string }) => {
  const lightColor = Boolean(
    (props.x % 2 === 0 && props.y % 2 === 0) ||
      (props.x % 2 === 1 && props.y % 2 === 1)
  );
  return (
    <button
      className={`w-[calc(100vw/8-2px)] aspect-square xl:w-[5.25rem] ${lightColor ? "bg-green-100" : "bg-green-200"} ${props.cursor} hover:brightness-90`}
    >
      <div className="flex justify-center items-center">{props.pieceSVG}</div>
    </button>
  );
};

const boardBuilder = (piecePositions: ChessPiece[]) => {
  const board: React.ReactNode[] = []
  for (const piece of piecePositions) {
    board[piece.position.x*8 + piece.position.y] = <Square pieceSVG={piece.svg} x={piece.position.x} y={piece.position.y} cursor="cursor-pointer"/>
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i*8 + j]) continue;
      else board[i*8 + j] = <Square pieceSVG={<></>} x={i} y={j} cursor="cursor-default"/>;
    }
  }
  return board;
}

export default Board;
