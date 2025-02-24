const MarketInsights = require("../models/MarketInsights");

// Get all market insights
exports.getAllMarketInsights = async (req, res) => {
  try {
    const insights = await MarketInsights.find();
    res.status(200).json(insights);
  } catch (error) {
    res.status(500).json({ error: "Error fetching market insights." });
  }
};

// Add dummy market data (for MVP)
exports.addDummyMarketData = async (req, res) => {
  try {
    const dummyData = [
      { cropName: "Wheat", location: "Pune", pricePerKg: 25 },
      { cropName: "Rice", location: "Nagpur", pricePerKg: 35 },
      { cropName: "Onion", location: "Nashik", pricePerKg: 18 },
      { cropName: "Tomato", location: "Mumbai", pricePerKg: 22 },
      { cropName: "Sugarcane", location: "Kolhapur", pricePerKg: 10 }
    ];

    await MarketInsights.insertMany(dummyData);
    res.status(201).json({ message: "Dummy market insights added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding dummy data." });
  }
};
