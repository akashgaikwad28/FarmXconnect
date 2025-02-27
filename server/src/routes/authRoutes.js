const express = require("express");
const { login, logout, refreshAccessToken } = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", login); // Added login route
router.post("/login", login); // Added login route
router.post("/logout", authMiddleware, logout); // Logout route
router.post("/refresh", refreshAccessToken); // Added refresh token route



module.exports = router;
