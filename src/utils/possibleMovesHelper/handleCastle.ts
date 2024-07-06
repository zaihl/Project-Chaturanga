import { useBoard } from "../../Store/store";
import { handleMoveLogic } from "../handleMoveLogic";
import { SquareOccupancy, validMoveInterface } from "../interfaces";
import { isKingChecked } from "../isKingChecked";

export function handleCastle(currentBoard: SquareOccupancy[][], currentColor: "white" | "black"): validMoveInterface[] {
    const boardState = useBoard.getState();
    const whiteHistory = boardState.whiteMoves
    const blackHistory = boardState.blackMoves
    const check = boardState.check

    const myHistory = currentColor === 'white' ? whiteHistory : blackHistory
    const myKing = currentBoard.flat().find(sq => sq.pieceColor === currentColor && sq.pieceType === 'king')!
    // const kingSideRook = currentBoard.flat().find(sq => sq.pieceColor === currentColor && sq.pieceType === 'rook' && sq.y-myKing.y===3)!
    // const queenSideRook = currentBoard.flat().find(sq => sq.pieceColor === currentColor && sq.pieceType === 'rook' && myKing.y-sq.y === 4)!

    const validMoves: validMoveInterface[] = []

    const historyIncludesKing = myHistory.some(move => move.piece.includes(`${currentColor}-king`))
    if (historyIncludesKing || check) return validMoves;

    const historyIncludesKingSideRook = myHistory.some(move => move.piece.includes(`${currentColor}-rook-7`))
    const historyIncludesQueenSideRook = myHistory.some(move => move.piece.includes(`${currentColor}-rook-0`))

    const kingSidePosition = myKing.y + 2;
    const queenSidePosition = myKing.y - 2;
    const myKingX = myKing.x

    const isKingSideClear = isWayClear(currentBoard, myKing.y+1, myKing.y+2, myKing.x);
    const isQueenSideClear = isWayClear(currentBoard, myKing.y-3, myKing.y-1, myKing.x);

    const isKingSideChecked = isPositionChecked(currentBoard, {x: myKingX, y: kingSidePosition, kill: false}, myKing)
    const isQueenSideChecked = isPositionChecked(currentBoard, {x: myKingX, y: queenSidePosition, kill: false }, myKing)

    if (!historyIncludesKingSideRook && isKingSideClear && !isKingSideChecked) {
        validMoves.push({x: myKingX, y: kingSidePosition, kill: false})
    }
    
    if (!historyIncludesQueenSideRook && isQueenSideClear && !isQueenSideChecked) {
        validMoves.push({x: myKingX, y: queenSidePosition, kill: false})
    }

    return validMoves;
}

function isPositionChecked(currentBoard: SquareOccupancy[][], validMoves: validMoveInterface, myKing: SquareOccupancy) {
    const newBoard = currentBoard.slice().map(row => row.slice().map(sq => ({...sq})))
    const myColor = myKing.pieceColor
    const opponentColor = myColor === 'white' ? "black" : "white"
    const selectedPiece = myKing
    selectedPiece.selected = true
    const tempBoard = handleMoveLogic(newBoard, validMoves.x, validMoves.y)
    const isChecked = isKingChecked(tempBoard, opponentColor)
    if (!isChecked) {
        return false;
    }
    return true;
}

function isWayClear(currentBoard: SquareOccupancy[][], fromY: number, toY: number, currentX: number) {
    for (let i = fromY; i <= toY; i++) {
        if (!currentBoard[currentX][i].pieceType.includes("null")) {
            return false;
        }
    }
    return true;
}