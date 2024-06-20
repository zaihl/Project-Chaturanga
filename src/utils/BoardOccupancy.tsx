import React from "react";
import {
  BlackBishop,
  BlackKnight,
  BlackPawn,
  BlackQueen,
  BlackRook,
  BlackKing,
  WhiteBishop,
  WhiteKnight,
  WhiteKing,
  WhitePawn,
  WhiteQueen,
  WhiteRook,
} from "../components/PieceSVG";


interface SquareOccupancy {
    pieceType: string,
    pieceColor?: "black" | "white",
    pieceSVG: React.ReactNode,
    x: number;
    y: number;
    state: "piece" | "empty" | "possibleMove";
}

const initialPiecePositions: SquareOccupancy[] = [
  {
    pieceType: "rook",
    pieceColor: "black",
    pieceSVG: BlackRook(),
    x: 0,
    y: 0,
    state: "piece",
  },
  {
    pieceType: "knight",
    pieceColor: "black",
    pieceSVG: BlackKnight(),
    x: 0,
    y: 1,
    state: "piece",
  },
  {
    pieceType: "bishop",
    pieceColor: "black",
    pieceSVG: BlackBishop(),
    x: 0,
    y: 2,
    state: "piece",
  },
  {
    pieceType: "queen",
    pieceColor: "black",
    pieceSVG: BlackQueen(),
    x: 0,
    y: 3,
    state: "piece",
  },
  {
    pieceType: "king",
    pieceColor: "black",
    pieceSVG: BlackKing(),
    x: 0,
    y: 4,
    state: "piece",
  },
  {
    pieceType: "bishop",
    pieceColor: "black",
    pieceSVG: BlackBishop(),
    x: 0,
    y: 5,
    state: "piece",
  },
  {
    pieceType: "knight",
    pieceColor: "black",
    pieceSVG: BlackKnight(),
    x: 0,
    y: 6,
    state: "piece",
  },
  {
    pieceType: "rook",
    pieceColor: "black",
    pieceSVG: BlackRook(),
    x: 0,
    y: 7,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "black",
    pieceSVG: BlackPawn(),
    x: 1,
    y: 0,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "black",
    pieceSVG: BlackPawn(),
    x: 1,
    y: 1,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "black",
    pieceSVG: BlackPawn(),
    x: 1,
    y: 2,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "black",
    pieceSVG: BlackPawn(),
    x: 1,
    y: 3,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "black",
    pieceSVG: BlackPawn(),
    x: 1,
    y: 4,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "black",
    pieceSVG: BlackPawn(),
    x: 1,
    y: 5,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "black",
    pieceSVG: BlackPawn(),
    x: 1,
    y: 6,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "black",
    pieceSVG: BlackPawn(),
    x: 1,
    y: 7,
    state: "piece",
  },
  // White pawns...
  {
    pieceType: "pawn",
    pieceColor: "white",
    pieceSVG: WhitePawn(),
    x: 6,
    y: 0,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "white",
    pieceSVG: WhitePawn(),
    x: 6,
    y: 1,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "white",
    pieceSVG: WhitePawn(),
    x: 6,
    y: 2,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "white",
    pieceSVG: WhitePawn(),
    x: 6,
    y: 3,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "white",
    pieceSVG: WhitePawn(),
    x: 6,
    y: 4,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "white",
    pieceSVG: WhitePawn(),
    x: 6,
    y: 5,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "white",
    pieceSVG: WhitePawn(),
    x: 6,
    y: 6,
    state: "piece",
  },
  {
    pieceType: "pawn",
    pieceColor: "white",
    pieceSVG: WhitePawn(),
    x: 6,
    y: 7,
    state: "piece",
  },
  {
    pieceType: "rook",
    pieceColor: "white",
    pieceSVG: WhiteRook(),
    x: 7,
    y: 0,
    state: "piece",
  },
  {
    pieceType: "knight",
    pieceColor: "white",
    pieceSVG: WhiteKnight(),
    x: 7,
    y: 1,
    state: "piece",
  },
  {
    pieceType: "bishop",
    pieceColor: "white",
    pieceSVG: WhiteBishop(),
    x: 7,
    y: 2,
    state: "piece",
  },
  {
    pieceType: "queen",
    pieceColor: "white",
    pieceSVG: WhiteQueen(),
    x: 7,
    y: 3,
    state: "piece",
  },
  {
    pieceType: "king",
    pieceColor: "white",
    pieceSVG: WhiteKing(),
    x: 7,
    y: 4,
    state: "piece",
  },
  {
    pieceType: "bishop",
    pieceColor: "white",
    pieceSVG: WhiteBishop(),
    x: 7,
    y: 5,
    state: "piece",
  },
  {
    pieceType: "knight",
    pieceColor: "white",
    pieceSVG: WhiteKnight(),
    x: 7,
    y: 6,
    state: "piece",
  },
  {
    pieceType: "rook",
    pieceColor: "white",
    pieceSVG: WhiteRook(),
    x: 7,
    y: 7,
    state: "piece",
  },
];

const boardArray: SquareOccupancy[][] = [];

for (let x = 0; x < 8; x++) {
  boardArray.push([]);
  for (let y = 0; y < 8; y++) {
    const piece = initialPiecePositions.find(
      (piece) => piece.x === x && piece.y === y
    );
    if (piece) {
      boardArray[x][y] = piece;
    } else {
      boardArray[x][y] = { pieceType: "null", pieceSVG: <></>, x, y, state: "empty" };
    }
  }
}

export { boardArray }

