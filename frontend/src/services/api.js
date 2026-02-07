import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // backend URL
});

export const fetchAsteroids = async () => {
  const res = await API.get("/api/data");
  return res.data;
};
