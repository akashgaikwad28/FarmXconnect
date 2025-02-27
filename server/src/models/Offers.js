const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who made the offer
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who received the offer
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // Related post (crop listing)
  cropName: { type: String, required: true }, // Crop name
  priceOffered: { type: Number, required: true }, // Price proposed in the offer
  volume: { type: Number, required: true }, // Quantity of crop
  sellingDeadline: {
    type: Date,
    validate: {
      validator: function() {
        return this.sender && this.sender.role === 'Farmer' ? !!this.sellingDeadline : true;
      },
      message: "Selling deadline is required for Farmer offers."
    }
  },
  buyingDeadline: {
    type: Date,
    validate: {
      validator: function() {
        return this.sender && this.sender.role === 'Trader' ? !!this.buyingDeadline : true;
      },
      message: "Buying deadline is required for Trader offers."
    }
  },

  status: { 
    type: String, 
    enum: ["Pending", "Accepted", "Rejected"], 
    default: "Pending" 
  }, // Offer status
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Offer", OfferSchema);
