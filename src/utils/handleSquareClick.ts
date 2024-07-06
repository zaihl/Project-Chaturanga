import { useBoard } from "../Store/store";
import { handleMoveLogic } from "./handleMoveLogic";
import { playSound } from "./playSound";
import { isKingChecked } from "./isKingChecked";
import { possibleMoves } from "./possibleMoves";
import { handleCheckmate } from "./handleCheckmate";
import { SquareOccupancy } from "./interfaces";

export function handleClick(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  x: number,
  y: number
) {
  const boardState = useBoard.getState();
  const selectedPlayerColor = boardState.selectedPlayerColor;
  const setSelectedPlayerColor = boardState.setSelectedPlayerColor;
  const setWhiteMoves = boardState.setWhiteMoves;
  const setBlackMoves = boardState.setBlackMoves;
  const setCheck = boardState.setCheck;

  const board = useBoard.getState().currentBoard;
  const setBoard = useBoard.getState().setBoard;
  e.preventDefault();

  const newBoard = board.slice().map(row => row.slice().map(sq => ({...sq})));

  if (newBoard[x][y].pieceColor !== selectedPlayerColor && newBoard[x][y].state !== "possibleMove") {
    newBoard.forEach((row) =>
      row.forEach((square) => {
        square.selected = false;
        square.kill = false;
        square.state = square.pieceColor === undefined ? "empty" : "piece";
      })
    );
    setBoard(newBoard);
    return;
  }

  if (newBoard[x][y].state === "possibleMove") {
    const selectedPiece = newBoard.flat().find((square) => square.selected) as SquareOccupancy;
    const selectedX = selectedPiece.x;
    const selectedY = selectedPiece.y;
    const currentColor = selectedPlayerColor;
    
    let tempBoard = newBoard.slice().map(row => row.slice().map(sq => ({...sq})));
    tempBoard = handleMoveLogic(tempBoard, x, y);

    // if king is checked, we cannot make a move that would remove the check
    if (isKingChecked(tempBoard, currentColor)) {
      newBoard.forEach((row) =>
        row.forEach((square) => {
          square.selected = false;
          square.kill = false;
          square.state = square.pieceColor === undefined ? "empty" : "piece";
        })
      );
      newBoard[selectedX][selectedY].selected = true;
      setCheck(true);
      setBoard(newBoard);
      return;
    }

    if (currentColor === "white") {
      setWhiteMoves({
        piece: newBoard[selectedX][selectedY].id,
        from: { x: selectedX, y: selectedY},
        to: { x, y },
      })
    } else {
      setBlackMoves({
        piece: newBoard[selectedX][selectedY].id,
        from: { x: selectedX, y: selectedY },
        to: { x, y },
      })
    }

    const newColor = selectedPlayerColor === "black" ? "white" : "black";
    newBoard[x][y].kill ? playSound("kill") : playSound("move");
    const possibleBoard = handleMoveLogic(newBoard, x, y);
    setSelectedPlayerColor(newColor);
    setBoard(possibleBoard);

    // checking if opponent's move ended up giving us check
    possibleBoard[x][y].selected = true;
    if (isKingChecked(possibleBoard, newColor)) {
      setCheck(true);
      handleCheckmate(currentColor);
    }
    possibleBoard[x][y].selected = false;

    return;
  }
  newBoard.forEach((row) =>
    row.forEach((square) => {
      square.selected = false;
      square.kill = false;
      square.state = square.pieceColor === undefined ? "empty" : "piece";
    })
  );
  newBoard[x][y].selected = newBoard[x][y].state === "empty" ? false : true;
  const possibleBoard = possibleMoves(newBoard);
  setBoard(possibleBoard);
}
