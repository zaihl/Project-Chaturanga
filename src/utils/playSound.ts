import { useBoard } from "../Store/store";

export const playSound = (state: "move" | "kill") => {
    const boardState = useBoard.getState();
    const blackMovesLength = boardState.blackMoves.length;
    const whiteMovesLength = boardState.whiteMoves.length;
    let src;
    state === 'kill' ? src = '/capture.mp3' : src = '/move.mp3';
    const audio = new Audio(src);
    if (blackMovesLength === 0 && whiteMovesLength === 0) {
        audio.muted = true;
    } else {
        audio.muted = false;
    }
    audio.play();
};

