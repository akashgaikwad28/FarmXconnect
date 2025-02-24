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
    res.status(500).json({ error: "Error creating trade offer." });
  }
};

// 📌 Get Trade Offers (For Trader and Farmer)
exports.getTradeOffers = async (req, res) => {
  try {
    const trades = await Trade.find({
      $or: [{ trader: req.user.id }, { farmer: req.user.id }],
    }).populate("trader farmer", "name email");

    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json({ error: "Error fetching trade offers." });
  }
};

// 📌 Update Trade Status (Accept/Reject)
exports.updateTradeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const trade = await Trade.findById(req.params.tradeId);

    if (!trade) return res.status(404).json({ error: "Trade offer not found." });

    if (trade.farmer.toString() !== req.user.id)
      return res.status(403).json({ error: "Only the farmer can update this trade." });

    trade.status = status;
    await trade.save();

    res.status(200).json({ message: "Trade status updated!", trade });
  } catch (error) {
    res.status(500).json({ error: "Error updating trade status." });
  }
};
