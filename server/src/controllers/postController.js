const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { cropName, price, volume, description } = req.body;
    let imageUrl = "";

    // Check if a file was uploaded
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL
    }

    const newPost = new Post({
      user: req.user.id,
      cropName,
      price,
      volume,
      description,
      image: imageUrl, // Store the image URL
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost };
