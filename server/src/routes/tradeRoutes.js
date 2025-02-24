const express = require("express");
const { createTradeOffer, getTradeOffers, updateTradeStatus } = require("../controllers/tradeController");
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

router.post("/", authMiddleware, createTradeOffer); // Create a trade offer
router.get("/", authMiddleware, getTradeOffers); // Get all trade offers
router.put("/:tradeId", authMiddleware, updateTradeStatus); // Accept/Reject trade offer

module.exports = router;
