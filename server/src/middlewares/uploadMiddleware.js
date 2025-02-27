const express = require("express");
const upload = require("../utils/upload"); // Import the upload middleware
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

// Route for creating a post (with an image/video upload)
router.post("/create", authMiddleware, upload.single("media"), postController.createPost);


module.exports = router;
