const axios = require("axios");

const fetchDataFromAPI = async () => {
  const today = new Date().toISOString().split("T")[0];

  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${process.env.NASA_API_KEY}`;

  const response = await axios.get(url);
  return response.data;
};

module.exports = { fetchDataFromAPI };
