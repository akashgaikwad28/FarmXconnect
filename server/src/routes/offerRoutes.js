const express = require("express");
const { sendOffer, getUserOffers, updateOfferStatus } = require("../controllers/offerController");
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

// Send an offer (Trader -> Farmer OR Farmer -> Trader
router.post("/send", authMiddleware(['Trader']), sendOffer);


router.get("/user/:userId", authMiddleware(['Farmer', 'Trader']), getUserOffers);


router.put("/update/:offerId", authMiddleware, updateOfferStatus); // Ensure only the user can update their offer


module.exports = router;
