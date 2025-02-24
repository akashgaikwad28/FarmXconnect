const express = require("express");
const { getAllMarketInsights, addDummyMarketData } = require("../controllers/marketInsightsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get market insights data
router.get("/", authMiddleware, getAllMarketInsights);

// Add dummy market insights data (MVP only)
router.post("/dummy", authMiddleware, addDummyMarketData);

module.exports = router;
