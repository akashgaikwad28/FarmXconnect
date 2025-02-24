const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); // Import Cloudinary config

// Configure Multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "agriculture-marketplace", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "mp4", "mov"], // Allowed formats
  },
});

// Create the upload middleware
const upload = multer({ storage });

module.exports = upload;
