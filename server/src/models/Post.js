const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  cropName: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  volume: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String 
  },
  image: { 
    type: String 
  },
  video: { 
    type: String 
  },
  // Conditional field based on the role of the user
  sellingDeadline: {
    type: Date,
    // This will only be valid if the user is a Farmer
    validate: {
      validator: function(value) {
        return this.user && this.user.role === 'Farmer' ? !!value : true;
      },
      message: "Selling deadline is required for Farmer posts."
    }
  },
  buyingDeadline: {
    type: Date,
    // This will only be valid if the user is a Trader
    validate: {
      validator: function(value) {
        return this.user && this.user.role === 'Trader' ? !!value : true;
      },
      message: "Buying deadline is required for Trader posts."
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Post", PostSchema);
