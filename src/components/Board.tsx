import { useState } from "react";
import { initialPiecePositions } from "./PieceLocations";
import { validMoves } from "../utils/validMoves";

interface ChessPiece {
  piece: string;
  svg: React.ReactElement;
  position: { x: number; y: number };
}

interface SquareInterface {
  pieceSVG: React.ReactElement;
  x: number;
  y: number;
  cursor: string;
  handleMouseClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    pieceName: string
  ) => void;
  pieceName: string;
  blob?: boolean;
}

const Board = ({ myColor }: { myColor: "black" | "white" }) => {
  const [piecePositions, setPiecePositions] = useState<ChessPiece[]>(
    initialPiecePositions
  );
  const [board, setBoard] = useState<React.ReactNode[]>([]);
  const [renderBoard, setRenderBoard] = useState<number>(0);

  const validMovesArray = validMoves(piecePositions, myColor);

  if (renderBoard === 0) {
    const boardArray = boardBuilder(
      piecePositions,
      myColor,
      validMovesArray,
      handleBoardChange
    );
    setBoard(boardArray);
    setRenderBoard(renderBoard + 1);
  }

  function handleBoardChange(newBoard: React.ReactNode[]) {
    setBoard(newBoard);
    setRenderBoard(renderBoard + 1);
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

const Square = ({
  pieceSVG,
  x,
  y,
  cursor,
  handleMouseClick,
  pieceName,
  blob = false,
}: SquareInterface) => {
  const lightColor = Boolean(
    (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1)
  );
  return (
    <button
      className={`relative aspect-square w-12 md:w-[5.25rem] ${lightColor ? "bg-green-100" : "bg-green-200"} ${cursor} hover:brightness-90`}
      onClick={(e) => handleMouseClick(e, pieceName)}
    >
      {blob && (
        <div className="absolute w-5 h-5 bg-gray-700 opacity-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full " />
      )}
      <div className="flex justify-center items-center">{pieceSVG}</div>
      {/* <div>{`${x},${y}`}</div> */}
    </button>
  );
};

const boardBuilder = (
  piecePositions: ChessPiece[],
  myColor: "black" | "white",
  validMovesArray: { name: string; validMoves: { x: number; y: number }[] }[],
  handleBoardChange: (newBoard: React.ReactNode[]) => void
) => {
  if (myColor === "white") {
    // do something
  } else {
    // do something else
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

function renderBoard(
  piecePositions: ChessPiece[],
  handleMouseClick: SquareInterface["handleMouseClick"],
  prevBoard: React.ReactNode[]
) {
  const board: React.ReactNode[] = prevBoard;
  for (const piece of piecePositions) {
    board[piece.position.x * 8 + piece.position.y] = (
      <Square
        key={piece.piece}
        pieceSVG={piece.svg}
        x={piece.position.x}
        y={piece.position.y}
        cursor="cursor-pointer"
        handleMouseClick={handleMouseClick}
        pieceName={piece.piece}
      />
    );
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i * 8 + j]) continue;
      else
        board[i * 8 + j] = (
          <Square
            key={`${i},${j}`}
            pieceSVG={<></>}
            x={i}
            y={j}
            cursor="cursor-default"
            handleMouseClick={handleMouseClick}
            pieceName="null"
          />
        );
    }
  }
  return board;
}

export default Board;
