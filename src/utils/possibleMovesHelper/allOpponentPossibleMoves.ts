import { SquareOccupancy, validMoveInterface } from "../interfaces";
import { isValidMove, moveImpact } from "./moveAnalyzer";

export function allPossibleMovesOfGivenColor(
  currentBoard: SquareOccupancy[][],
  opponentColor: "white" | "black",
) {
  const opponentPieces = currentBoard
    .flat()
    .filter((piece) => piece.pieceColor === opponentColor);
  let validMoves: validMoveInterface[] = [];
  const opponentMoves: validMoveInterface[] = [];

  for (const piece of opponentPieces) {
    switch (piece.pieceType) {
      case "pawn":
        validMoves = handlePawnForKing(piece, currentBoard);
        opponentMoves.push(...validMoves);
        break;
      case "rook":
        validMoves = handleRookForKing(piece, currentBoard);
        opponentMoves.push(...validMoves);
        break;
      case "knight":
        validMoves = handleKnightForKing(piece, currentBoard);
        opponentMoves.push(...validMoves);
        break;
      case "bishop":
        validMoves = handleBishopForKing(piece, currentBoard);
        opponentMoves.push(...validMoves);
        break;
      case "queen":
        validMoves = handleQueenForKing(piece, currentBoard);
        opponentMoves.push(...validMoves);
        break;
      case "king":
        validMoves = handleKingForKing(piece, currentBoard);
        opponentMoves.push(...validMoves);
        break;
    }
  }
  return opponentMoves;
}

function handlePawnForKing(
  selectedPiece: SquareOccupancy,
  possibleBoard: SquareOccupancy[][],
) {
  possibleBoard;
  const validMoves: validMoveInterface[] = [];
  const currentX = selectedPiece.x;
  const currentY = selectedPiece.y;
  if (selectedPiece.pieceColor === "white") {
    validMoves.push(
      { x: currentX - 1, y: currentY - 1, kill: false },
      { x: currentX - 1, y: currentY + 1, kill: false },
    );
  } else {
    validMoves.push(
      { x: currentX + 1, y: currentY - 1, kill: false },
      { x: currentX + 1, y: currentY + 1, kill: false },
    );
  }
  return validMoves;
}

function handleBishopForKing(
  selectedPiece: SquareOccupancy,
  possibleBoard: SquareOccupancy[][],
) {
  const currentX = selectedPiece.x;
  const currentY = selectedPiece.y;
  const validMoves: validMoveInterface[] = [];
  const directions = [
    { x: 1, y: 1 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
  ];
  for (let i = 0; i < directions.length; i++) {
    let distance = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const move = {
        x: currentX + distance * directions[i].x,
        y: currentY + distance * directions[i].y,
      };

      if (!isValidMove(move.x, move.y)) break;
      const state = moveImpact(
        possibleBoard,
        move.x,
        move.y,
        selectedPiece.pieceColor!,
      );

      validMoves.push({
        ...move,
        kill: state === "kill",
      });
      if (
        state === "self" ||
        (state === "kill" && possibleBoard[move.x][move.y].pieceType !== "king")
      )
        break;

      distance++;
    }
  }
  return validMoves;
}

function handleKnightForKing(
  selectedPiece: SquareOccupancy,
  possibleBoard: SquareOccupancy[][],
) {
  possibleBoard;
  const validMoves: validMoveInterface[] = [];
  const currentX = selectedPiece.x;
  const currentY = selectedPiece.y;
  validMoves.push(
    { x: currentX - 2, y: currentY - 1, kill: false },
    { x: currentX - 2, y: currentY + 1, kill: false },
    { x: currentX + 2, y: currentY - 1, kill: false },
    { x: currentX + 2, y: currentY + 1, kill: false },
    { x: currentX - 1, y: currentY - 2, kill: false },
    { x: currentX - 1, y: currentY + 2, kill: false },
    { x: currentX + 1, y: currentY - 2, kill: false },
    { x: currentX + 1, y: currentY + 2, kill: false },
  );
  return validMoves;
}

function handleRookForKing(
  selectedPiece: SquareOccupancy,
  possibleBoard: SquareOccupancy[][],
) {
  const currentX = selectedPiece.x;
  const currentY = selectedPiece.y;
  const validMoves: validMoveInterface[] = [];
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];
  for (let i = 0; i < directions.length; i++) {
    let distance = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const move = {
        x: currentX + distance * directions[i].x,
        y: currentY + distance * directions[i].y,
      };

      if (!isValidMove(move.x, move.y)) break;
      const state = moveImpact(
        possibleBoard,
        move.x,
        move.y,
        selectedPiece.pieceColor!,
      );

      validMoves.push({
        ...move,
        kill: state === "kill",
      });
      if (
        state === "self" ||
        (state === "kill" && possibleBoard[move.x][move.y].pieceType !== "king")
      )
        break;

      distance++;
    }
  }
  return validMoves;
}

function handleQueenForKing(
  piece: SquareOccupancy,
  currentBoard: SquareOccupancy[][],
) {
  const validMoves: validMoveInterface[] = [];
  const bishopMoves = handleBishopForKing(piece, currentBoard);
  const rookMoves = handleRookForKing(piece, currentBoard);
  validMoves.push(...bishopMoves, ...rookMoves);
  return validMoves;
}

function handleKingForKing(
  selectedPiece: SquareOccupancy,
  possibleBoard: SquareOccupancy[][],
) {
  possibleBoard;
  const validMoves: validMoveInterface[] = [];
  const currentX = selectedPiece.x;
  const currentY = selectedPiece.y;
  validMoves.push(
    { x: currentX - 1, y: currentY - 1, kill: false },
    { x: currentX - 1, y: currentY, kill: false },
    { x: currentX - 1, y: currentY + 1, kill: false },
    { x: currentX, y: currentY - 1, kill: false },
    { x: currentX, y: currentY + 1, kill: false },
    { x: currentX + 1, y: currentY - 1, kill: false },
    { x: currentX + 1, y: currentY, kill: false },
    { x: currentX + 1, y: currentY + 1, kill: false },
  );
  return validMoves;
}
