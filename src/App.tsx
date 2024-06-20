import Board from "./components/Board";

const App = () => {
  return (
    <>
      <div className="bg-slate-800 min-h-screen flex max-md:flex-col items-center max-md:justify-center">
        <div className="w-1/2 md:pl-4">
          <Board />
        </div>
      </div>
    </>
  );
};

export default App;
