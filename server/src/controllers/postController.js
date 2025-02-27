const Post = require("../models/Post");

// Create Post
const createPost = async (req, res) => {
  try {
    const { location, description } = req.body; // Include location

    let imageUrl = "";

    // Check if a file was uploaded
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL
    }

    const newPost = new Post({
      user: req.user.id,
      location, // Add location
      description,
      image: imageUrl, // Store the image URL
      video: req.body.video // Assuming video is also sent in the request body
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Post
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found." });

    // Update fields if provided
    post.location = req.body.location || post.location;
    post.description = req.body.description || post.description;
    post.image = req.file ? req.file.path : post.image; // Update image if a new one is uploaded
    post.video = req.body.video || post.video; // Update video if provided

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found." });

    await post.remove();
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getAllPosts, updatePost, deletePost };
