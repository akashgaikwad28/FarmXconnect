const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser); // Register
router.post("/login", loginUser); // Login
router.get("/profile", authMiddleware, getUserProfile); // Get user profile
router.put("/profile", authMiddleware, updateUserProfile); // Update profile
router.get("/", authMiddleware, getAllUsers); // Get all users (admin use case)

module.exports = router;


