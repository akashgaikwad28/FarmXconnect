const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    crop: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["Open", "Negotiating", "Closed"], default: "Open" },
}, { timestamps: true });

module.exports = mongoose.model("Trade", TradeSchema);
