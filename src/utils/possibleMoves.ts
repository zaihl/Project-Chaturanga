import { SquareOccupancy, validMoveInterface } from "./interfaces";
import { handleBishop } from "./possibleMovesHelper/handleBishop";
import { handleKing } from "./possibleMovesHelper/handleKing";
import { handleKnight } from "./possibleMovesHelper/handleKnight";
import { handlePawn } from "./possibleMovesHelper/handlePawn";
import { handleQueen } from "./possibleMovesHelper/handleQueen";
import { handleRook } from "./possibleMovesHelper/handleRook";

export function possibleMoves(newBoard: SquareOccupancy[][]): SquareOccupancy[][] {
    const possibleBoard = newBoard.slice().map(row => row.slice().map(sq => ({...sq})));
    const selectedPiece = possibleBoard.flat().find(sq => sq.selected === true)!
    const pieceType = selectedPiece.pieceType;
    let validMoves: validMoveInterface[] = [];
    if (pieceType === "pawn") {
        validMoves = handlePawn(selectedPiece, possibleBoard);
    } else if (pieceType === "knight") {
        validMoves = handleKnight(selectedPiece, possibleBoard);
    } else if (pieceType === "rook") {
        validMoves = handleRook(selectedPiece, possibleBoard);
    } else if (pieceType === "bishop") {
        validMoves = handleBishop(selectedPiece, possibleBoard);
    } else if (pieceType === "queen") {
        validMoves = handleQueen(selectedPiece, possibleBoard);
    } else if (pieceType === "king") {
        validMoves = handleKing(selectedPiece, possibleBoard);
    }
    for (const move of validMoves) {
        possibleBoard[move.x][move.y] = {
            id: possibleBoard[move.x][move.y].id,
            x: move.x,
            y: move.y,
            selected: false,
            pieceType: possibleBoard[move.x][move.y].pieceType,
            pieceSVG: possibleBoard[move.x][move.y].pieceSVG,
            pieceColor: possibleBoard[move.x][move.y].pieceColor,
            kill: move.kill,
            state: "possibleMove",
        };
    }

    return possibleBoard;
}