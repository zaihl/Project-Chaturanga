import { handleClick } from "../utils/handleSquareClick";
import { SquareProps } from "../utils/interfaces";

const Square = ({
  pieceSVG,
  x,
  y,
  state,
  pieceType,
  pieceColor,
  selected,
  kill,
}: SquareProps) => {
  const highlighted = selected ? "border border-black" : "";
  const bgColor = kill
    ? "bg-red-400"
    : (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1)
      ? "bg-green-300"
      : "bg-green-100";
  const dim = state === "possibleMove" && !kill ? "sepia" : "";
  const cursor = state === "empty" ? "cursor-default" : "cursor-pointer";
  return (
    <div className={`${bgColor}`}>
      <button
        onClick={(e) => handleClick(e, x, y)}
        id={`${x},${y}`}
        className={`${bgColor} ${dim} ${highlighted} aspect-square w-12 md:w-[5.25rem] ${cursor}`}
      >
        <div
          className="flex justify-center items-center"
          aria-details={`${pieceColor} ${pieceType}`}
        >
          {pieceSVG}
        </div>
        <div>{`${x},${y}`}</div>
      </button>
    </div>
  );
};

export default Square;
