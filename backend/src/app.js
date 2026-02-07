const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes/api.routes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

module.exports = app;
