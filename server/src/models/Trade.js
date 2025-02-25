const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema({
  // Indexing for performance optimization
  trader: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  farmer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  crop: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["Pending", "Negotiating", "Completed", "Sold Out"], 
    default: "Pending" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create an index on trader and farmer for faster queries
TradeSchema.index({ trader: 1, farmer: 1 });

module.exports = mongoose.model("Trade", TradeSchema);
