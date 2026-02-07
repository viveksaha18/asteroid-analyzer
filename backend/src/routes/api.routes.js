const express = require("express");
const router = express.Router();

const { getExternalData } = require("../controllers/api.controller");

router.get("/data", getExternalData);

module.exports = router;
