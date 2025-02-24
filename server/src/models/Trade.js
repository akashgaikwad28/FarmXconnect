const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema({
  farmer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  trader: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  post: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Post", 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["Pending", "Negotiating", "Completed"], 
    default: "Pending" 
  },
  priceNegotiated: { 
    type: Number 
  },
  messages: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Message" 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  // For traders, whether the crop is added to their cart or not
  addedToCart: {
    type: Boolean,
    default: false,  // Initially, the crop is not in the cart
  },
  // For farmers, whether the crop has been sold
  soldCrop: {
    type: Boolean,
    default: false,  // Initially, the crop is not marked as sold
  }
});

module.exports = mongoose.model("Trade", TradeSchema);
