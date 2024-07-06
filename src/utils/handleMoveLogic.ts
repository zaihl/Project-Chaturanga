import { SquareOccupancy } from "./interfaces";

export function handleMoveLogic(
  newBoard: SquareOccupancy[][],
  x: number,
  y: number
) {
  const currentBoard = newBoard.slice().map(row => row.slice().map(sq => ({...sq})))
  const selectedPiece = currentBoard
    .flat()
    .find((square) => square.selected) as SquareOccupancy;

  const emptySquare = currentBoard
    .flat()
    .find((square) => square.state === "empty") as SquareOccupancy;

  const emptySVG = emptySquare.pieceSVG;

  if (
    currentBoard[x][y].pieceType === "null" &&
    selectedPiece.pieceType === "pawn" &&
    (selectedPiece.x === x + 1 || selectedPiece.x === x - 1) &&
    (selectedPiece.y === y + 1 || selectedPiece.y === y - 1) &&
    (currentBoard[x + 1][y].pieceType === "pawn" ||
      currentBoard[x - 1][y].pieceType === "pawn")
  ) {
    handleEnPassant(currentBoard, x, y, selectedPiece, emptySVG);
  }

  if (
    selectedPiece.pieceType === "king" &&
    Math.abs(selectedPiece.y - y) === 2 &&
    selectedPiece.x === x
  ) {
    handleCastle(currentBoard, x, y, selectedPiece, emptySVG);
  }

  currentBoard[x][y] = {
    ...selectedPiece,
    x,
    y,
  };
  currentBoard[selectedPiece.x][selectedPiece.y] = {
    id: selectedPiece.id,
    x: selectedPiece.x,
    y: selectedPiece.y,
    selected: false,
    pieceType: "null",
    pieceSVG: emptySVG,
    kill: false,
    state: "empty",
  };
  currentBoard.forEach((row) =>
    row.forEach((square) => {
      square.selected = false;
      square.kill = false;
      square.state = square.pieceColor === undefined ? "empty" : "piece";
    })
  );
  return currentBoard;
}

function handleEnPassant(
  currentBoard: SquareOccupancy[][],
  x: number,
  y: number,
  selectedPiece: SquareOccupancy,
  emptySVG: React.ReactNode
) {
  const selectedColor = selectedPiece.pieceColor;
  if (selectedColor === "white") {
    currentBoard[x + 1][y] = {
      id: `null-${selectedPiece.x + 1}-${selectedPiece.y}`,
      x: selectedPiece.x,
      y: selectedPiece.y,
      selected: false,
      pieceType: "null",
      pieceSVG: emptySVG,
      kill: false,
      state: "empty",
    };
  } else {
    currentBoard[x - 1][y] = {
      id: `null-${selectedPiece.x - 1}-${selectedPiece.y}`,
      x: selectedPiece.x,
      y: selectedPiece.y,
      selected: false,
      pieceType: "null",
      pieceSVG: emptySVG,
      kill: false,
      state: "empty",
    };
  }
}

function handleCastle(currentBoard: SquareOccupancy[][], x: number, y: number, myKing: SquareOccupancy, emptySVG: React.ReactNode) {
  const currentRookPos = myKing.y > y ? y-2 : y+1;
  const newRookPos = myKing.y > y ? y+1 : y-1;
  const currentX = myKing.x
  const rook = currentBoard.flat().find(sq => sq.y === currentRookPos && sq.x === currentX)!

  currentBoard[currentX][newRookPos] = {
    ...rook,
    x: currentX,
    y: newRookPos,
  };
  currentBoard[rook.x][rook.y] = {
    id: rook.id,
    x: rook.x,
    y: rook.y,
    selected: false,
    pieceType: "null",
    pieceSVG: emptySVG,
    kill: false,
    state: "empty",
  };

}
