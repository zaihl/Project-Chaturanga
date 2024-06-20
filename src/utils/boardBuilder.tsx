// this file updates the board with the valid moves when a piece is clicked

import Square from "../components/Square";
import { renderBoard } from "./renderBoard";

interface ChessPiece {
  piece: string;
  svg: React.ReactElement;
  position: { x: number; y: number };
}

export const boardBuilder = (
  piecePositions: ChessPiece[],
  myColor: "black" | "white",
  validMovesArray: { name: string; validMoves: { x: number; y: number }[] }[],
  handleBoardChange: (newBoard: React.ReactNode[]) => void
) => {
  if (myColor === "white") {
    // do something
  } else {
    // do something
  }

  let board: React.ReactNode[] = [];
  let prevBoard: React.ReactNode[] = [];

  const handleMouseClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    pieceName: string
  ) => {
    e;
    for (const piece of validMovesArray) {
      if (piece.name === pieceName) {
        prevBoard = [];
        for (const move of piece.validMoves) {
          prevBoard[move.x * 8 + move.y] = (
            <Square
              key={`${move.x},${move.y}`}
              pieceSVG={<></>}
              x={move.x}
              y={move.y}
              cursor="cursor-default"
              handleMouseClick={handleMouseClick}
              pieceName="null"
              blob={true}
            />
          );
        }
        board = renderBoard(piecePositions, handleMouseClick, prevBoard);
        handleBoardChange(board);
      }
    }
  };

  board = renderBoard(piecePositions, handleMouseClick, prevBoard);
  return board;
};
