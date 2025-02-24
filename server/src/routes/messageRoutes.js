const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, sendMessage); // Send message
router.get("/:userId", authMiddleware, getMessages); // Get messages with a specific user

module.exports = router;
