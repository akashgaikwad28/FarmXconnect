const express = require("express");
const { sendOffer, getUserOffers, updateOfferStatus } = require("../controllers/offerController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Send an offer (Trader -> Farmer OR Farmer -> Trader)
router.post("/send", authMiddleware, sendOffer);

// Get all offers received by a user (Farmer or Trader)
router.get("/user/:userId", authMiddleware, getUserOffers);

// Accept or Reject an offer
router.put("/update/:offerId", authMiddleware, updateOfferStatus);

module.exports = router;
