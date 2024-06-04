import {
  BlackKing,
  BlackQueen,
  BlackRook,
  BlackBishop,
  BlackKnight,
  BlackPawn,
  WhiteKing,
  WhiteQueen,
  WhiteRook,
  WhiteBishop,
  WhiteKnight,
  WhitePawn,
} from "./Pieces";

interface ChessPiece {
  piece: string;
  svg: React.ReactElement;
  position: { x: number; y: number };
}

export const initialPiecePositions: ChessPiece[] = [
  {
    piece: "blackLeftRook",
    svg: BlackRook(),
    position: { x: 0, y: 0 },
  },
  {
    piece: "blackLeftKnight",
    svg: BlackKnight(),
    position: { x: 0, y: 1 },
  },
  {
    piece: "blackLeftBishop",
    svg: BlackBishop(),
    position: { x: 0, y: 2 },
  },
  {
    piece: "blackQueen",
    svg: BlackQueen(),
    position: { x: 0, y: 3 },
  },
  {
    piece: "blackKing",
    svg: BlackKing(),
    position: { x: 0, y: 4 },
  },
  {
    piece: "blackRightBishop",
    svg: BlackBishop(),
    position: { x: 0, y: 5 },
  },
  {
    piece: "blackRightKnight",
    svg: BlackKnight(),
    position: { x: 0, y: 6 },
  },
  {
    piece: "blackRightRook",
    svg: BlackRook(),
    position: { x: 0, y: 7 },
  },
  {
    piece: "black0Pawn",
    svg: BlackPawn(),
    position: { x: 1, y: 0 },
  },
  {
    piece: "black1Pawn",
    svg: BlackPawn(),
    position: { x: 1, y: 1 },
  },
  {
    piece: "black2Pawn",
    svg: BlackPawn(),
    position: { x: 1, y: 2 },
  },
  {
    piece: "black3Pawn",
    svg: BlackPawn(),
    position: { x: 1, y: 3 },
  },
  {
    piece: "black4Pawn",
    svg: BlackPawn(),
    position: { x: 1, y: 4 },
  },
  {
    piece: "black5Pawn",
    svg: BlackPawn(),
    position: { x: 1, y: 5 },
  },
  {
    piece: "black6Pawn",
    svg: BlackPawn(),
    position: { x: 1, y: 6 },
  },
  {
    piece: "black7Pawn",
    svg: BlackPawn(),
    position: { x: 1, y: 7 },
  },
  {
    piece: "white0Pawn",
    svg: WhitePawn(),
    position: { x: 6, y: 0 },
  },
  {
    piece: "white1Pawn",
    svg: WhitePawn(),
    position: { x: 6, y: 1 },
  },
  {
    piece: "white2Pawn",
    svg: WhitePawn(),
    position: { x: 6, y: 2 },
  },
  {
    piece: "white3Pawn",
    svg: WhitePawn(),
    position: { x: 6, y: 3 },
  },
  {
    piece: "white4Pawn",
    svg: WhitePawn(),
    position: { x: 6, y: 4 },
  },
  {
    piece: "white5Pawn",
    svg: WhitePawn(),
    position: { x: 6, y: 5 },
  },
  {
    piece: "white6Pawn",
    svg: WhitePawn(),
    position: { x: 6, y: 6 },
  },
  {
    piece: "white7Pawn",
    svg: WhitePawn(),
    position: { x: 6, y: 7 },
  },
  {
    piece: "whiteLeftRook",
    svg: WhiteRook(),
    position: { x: 7, y: 0 },
  },
  {
    piece: "whiteLeftKnight",
    svg: WhiteKnight(),
    position: { x: 7, y: 1 },
  },
  {
    piece: "whiteLeftBishop",
    svg: WhiteBishop(),
    position: { x: 7, y: 2 },
  },
  {
    piece: "whiteQueen",
    svg: WhiteQueen(),
    position: { x: 7, y: 3 },
  },
  {
    piece: "whiteKing",
    svg: WhiteKing(),
    position: { x: 7, y: 4 },
  },
  {
    piece: "whiteRightBishop",
    svg: WhiteBishop(),
    position: { x: 7, y: 5 },
  },
  {
    piece: "whiteRightKnight",
    svg: WhiteKnight(),
    position: { x: 7, y: 6 },
  },
  {
    piece: "whiteRightRook",
    svg: WhiteRook(),
    position: { x: 7, y: 7 },
  },
];
