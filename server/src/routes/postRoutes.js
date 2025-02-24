const express = require("express");
const { createPost, getPosts, updatePost, deletePost } = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new post
router.post("/", authMiddleware, createPost); 

// Get all posts
router.get("/", authMiddleware, getPosts);

// Update a specific post by ID
router.put("/:postId", authMiddleware, updatePost); 

// Delete a specific post by ID
router.delete("/:postId", authMiddleware, deletePost);

module.exports = router;
