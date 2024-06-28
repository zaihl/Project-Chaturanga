interface SquareOccupancy {
  id: string;
  pieceType: string;
  pieceColor?: "black" | "white";
  pieceSVG: React.ReactNode;
  x: number;
  y: number;
  state: "piece" | "empty" | "possibleMove";
  selected: boolean;
  kill: boolean;
}

export function handleMoveLogic(
  newBoard: SquareOccupancy[][],
  x: number,
  y: number
) {

  const selectedPiece = newBoard.flat().find((square) => square.selected) as SquareOccupancy;

  const emptySquare = newBoard.flat().find((square) => square.state === "empty") as SquareOccupancy;
  const emptySVG = emptySquare.pieceSVG;
  if (newBoard[x][y].pieceType === 'null') {
    handleEnPassant(newBoard, x, y, selectedPiece, emptySVG);
  }
  newBoard[x][y] = {
    ...selectedPiece,
    x,
    y,
  };
  newBoard[selectedPiece.x][selectedPiece.y] = {
    id: selectedPiece.id,
    x: selectedPiece.x,
    y: selectedPiece.y,
    selected: false,
    pieceType: "null",
    pieceSVG: emptySVG,
    kill: false,
    state: "empty",
  };
  newBoard.forEach((row) =>
    row.forEach((square) => {
      square.selected = false;
      square.kill = false;
      square.state = square.pieceColor === undefined ? "empty" : "piece";
    })
  );
  return newBoard;
}


function handleEnPassant(newBoard: SquareOccupancy[][], x: number, y: number, selectedPiece: SquareOccupancy, emptySVG: React.ReactNode) {
  const selectedColor = selectedPiece.pieceColor;
  console.log('here in en passant handler')
  console.log(x, y, selectedPiece)
  if (selectedColor === 'white') {
    newBoard[x+1][y] = {
      id: `null-${selectedPiece.x+1}-${selectedPiece.y}`,
      x: selectedPiece.x,
      y: selectedPiece.y,
      selected: false,
      pieceType: "null",
      pieceSVG: emptySVG,
      kill: false,
      state: "empty",
    };
  } else {
    newBoard[x-1][y] = {
      id: `null-${selectedPiece.x-1}-${selectedPiece.y}`,
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