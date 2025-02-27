const Post = require("../models/Post");

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

module.exports = { createPost };
