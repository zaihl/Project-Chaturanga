interface SquareProps {
  pieceSVG: React.ReactNode;
  x: number;
  y: number;
  state: "piece" | "empty" | "possibleMove";
}

const Square = ({ pieceSVG, x, y, state }: SquareProps) => {
  const dim = state === "possibleMove" ? "/50" : ""
  const bgColor =
    (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1)
      ? "bg-green-300"
      : "bg-green-100";
  return (
    <button
      id={`${x},${y}`}
      className={`${bgColor}${dim} aspect-square w-12 md:w-[5.25rem]`}
    >
      <div className="flex justify-center items-center">{pieceSVG}</div>
      <div>{`${x},${y}`}</div>
    </button>
  );
};

export default Square;
