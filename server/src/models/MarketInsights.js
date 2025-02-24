const mongoose = require("mongoose");

const MarketSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Market", MarketSchema);
