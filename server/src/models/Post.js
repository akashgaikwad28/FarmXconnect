const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  description: { 
    type: String 
  },
  location: { // New field for location
    type: String,
    required: true // Assuming location is required
  },
  image: { 
    type: String 
  },
  video: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }

});

module.exports = mongoose.model("Post", PostSchema);
