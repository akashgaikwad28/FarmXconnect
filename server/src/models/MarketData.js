const mongoose = require('mongoose');
const marketDataSchema = new mongoose.Schema({
    market: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MarketData', marketDataSchema);