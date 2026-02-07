const { fetchDataFromAPI } = require("../services/externalApi.service");
const { calculateRisk } = require("../services/riskEngine.service");

const getExternalData = async (req, res) => {
  try {
    const rawData = await fetchDataFromAPI();

    const dateKey = Object.keys(rawData.near_earth_objects)[0];
    const asteroids = rawData.near_earth_objects[dateKey];

    const analyzedAsteroids = asteroids.map(calculateRisk);

    res.status(200).json({
      success: true,
      date: dateKey,
      totalAsteroids: analyzedAsteroids.length,
      data: analyzedAsteroids
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Risk analysis failed"
    });
  }
};

module.exports = { getExternalData };
