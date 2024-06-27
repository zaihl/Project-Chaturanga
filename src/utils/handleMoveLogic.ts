interface SquareOccupancy {
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

  const selectedRow = newBoard.find((row) =>
    row.find((square) => square.selected)
  );
  if (selectedRow === undefined) return newBoard;
  const selectedPiece = selectedRow.find((square) => square.selected);
  if (selectedPiece === undefined) return newBoard;

  const emptySquare = newBoard.find((row) =>
    row.find((square) => square.state === "empty")
  );
  const emptySVG = emptySquare?.find(
    (square) => square.state === "empty"
  )?.pieceSVG;

  newBoard[x][y] = {
    ...selectedPiece,
    x,
    y,
  };
  newBoard[selectedPiece.x][selectedPiece.y] = {
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
