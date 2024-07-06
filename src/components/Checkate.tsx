const Checkmate = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Checkmate!</h2>
        <p className="mb-6">You have been checkmated.</p>
        <div className="flex justify-center space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
            Review Match
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Find New Match
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkmate;
