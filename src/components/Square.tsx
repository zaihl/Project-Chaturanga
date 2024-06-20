// this file renders each square on the board and the pieces on it

interface SquareInterface {
  pieceSVG: React.ReactElement;
  x: number;
  y: number;
  cursor: string;
  handleMouseClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    pieceName: string
  ) => void;
  pieceName: string;
  blob?: boolean;
}

const Square = ({
  pieceSVG,
  x,
  y,
  cursor,
  handleMouseClick,
  pieceName,
  blob = false,
}: SquareInterface) => {
  const lightColor = Boolean(
    (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1)
  );
  return (
    <button
      className={`relative aspect-square w-12 md:w-[5.25rem] ${lightColor ? "bg-green-100" : "bg-green-200"} ${cursor} hover:brightness-90`}
      onClick={(e) => handleMouseClick(e, pieceName)}
    >
      {blob && (
        <div className="absolute w-5 h-5 bg-gray-700 opacity-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full " />
      )}
      <div className="flex justify-center items-center">{pieceSVG}</div>
      {/* <div>{`${x},${y}`}</div> */}
    </button>
  );
};

export default Square;
