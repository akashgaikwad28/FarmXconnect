const Trade = require("../models/Trade");

// 📌 Create Trade Offer
exports.createTradeOffer = async (req, res) => {
  try {
    const { farmer, crop, price, quantity } = req.body;

    const newTrade = await Trade.create({
      trader: req.user.id,
      farmer,
      crop,
      price,
      quantity,
    });

    res.status(201).json({ message: "Trade offer created!", data: newTrade });
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error creating trade offer. Please try again later."));


  }
};

// 📌 Get Trade Offers (For Trader and Farmer)
exports.getTradeOffers = async (req, res) => {
  try {
    const { location, crop, price, deadlineType, deadline } = req.query; // Accept filter parameters
    const filter = {
      $or: [{ trader: req.user.id }, { farmer: req.user.id }],
    };

    // Add filters based on query parameters
    if (location) {
      filter.location = location; // Assuming location is a field in Trade model
    }
    if (crop) {
      filter.crop = crop; // Assuming crop is a field in Trade model
    }
    if (price) {
      filter.price = { $lte: price }; // Filter trades with price less than or equal to the specified price
    }
    if (deadlineType && deadline) {
      filter[deadlineType] = { $lte: new Date(deadline) }; // Filter based on buying/selling deadline
    }
    
    const trades = await Trade.find(filter).populate("trader farmer", "name email");


    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error fetching trade offers. Please try again later."));


  }
};

 // 📌 Get Trade History for a User
exports.getTradeHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tradeHistory = await Trade.find({
      $or: [{ trader: userId }, { farmer: userId }],
    }).populate("trader farmer", "name email");

    res.status(200).json(tradeHistory);
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error fetching trade history. Please try again later."));
  }
};

// 📌 Update Trade Status (Accept/Reject)

exports.updateTradeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const trade = await Trade.findById(req.params.tradeId);

    if (!trade) return res.status(404).json(new ApiError(404, "Trade offer not found."));


    if (trade.farmer.toString() !== req.user.id)
      return res.status(403).json({ error: "Only the farmer can update this trade." });

    trade.status = status;
    await trade.save();

    res.status(200).json({ message: "Trade status updated!", trade });

  } catch (error) {
    res.status(500).json(new ApiError(500, "Error updating trade status. Please try again later."));


  }
};
