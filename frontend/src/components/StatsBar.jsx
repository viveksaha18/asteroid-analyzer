const StatsBar = ({ asteroids }) => {
  const total = asteroids.length;
  const high = asteroids.filter(a => a.riskLevel === "High").length;
  const medium = asteroids.filter(a => a.riskLevel === "Medium").length;
  const low = asteroids.filter(a => a.riskLevel === "Low").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-50 shadow rounded p-4 text-center">
        <p className="text-gray-600 font-medium">Total Asteroids</p>
        <p className="text-blue-800 font-bold text-2xl">{total}</p>
      </div>
      <div className="bg-blue-50 shadow rounded p-4 text-center">
        <p className="text-gray-600 font-medium">High Risk</p>
        <p className="text-blue-800 font-bold text-2xl">{high}</p>
      </div>
      <div className="bg-blue-50 shadow rounded p-4 text-center">
        <p className="text-gray-600 font-medium">Medium Risk</p>
        <p className="text-blue-800 font-bold text-2xl">{medium}</p>
      </div>
      <div className="bg-blue-50 shadow rounded p-4 text-center">
        <p className="text-gray-600 font-medium">Low Risk</p>
        <p className="text-blue-800 font-bold text-2xl">{low}</p>
      </div>
    </div>
  );
};

export default StatsBar;
