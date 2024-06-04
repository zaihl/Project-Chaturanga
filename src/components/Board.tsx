const Board = () => {
  const boardArray = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let lightColor;
      if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) {
        lightColor = true;
      } else {
        lightColor = false;
      }
      const num = i * 8 + j;
      boardArray.push(
        <Square key={num} lightColor={lightColor}>
          {num}
        </Square>
      );
    }
  }

  return (
    <div className="board bg-slate-800 flex items-center justify-center xl:justify-start py-2 xl:px-8 xl:h-screen">
      <div className="md:rounded-lg rounded-md overflow-hidden grid grid-rows-8 grid-cols-8">
        {boardArray}
      </div>
    </div>
  );
};

const Square = (props: { children: React.ReactNode; lightColor: boolean }) => {
  return (
    <button
      className={`w-[calc(100vw/8-2px)] aspect-square xl:w-[5.25rem] ${props.lightColor ? "bg-green-100" : "bg-green-200"}`}
    >
      {props.children}
    </button>
  );
};

export default Board;
