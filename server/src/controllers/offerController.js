const Offer = require("../models/Offer");

// Send an Offer
exports.sendOffer = async (req, res) => {
  try {
    const { receiver, post, cropName, priceOffered, volume } = req.body;
    const sender = req.user.id;

    const newOffer = new Offer({
      sender,
      receiver,
      post,
      cropName,
      priceOffered,
      volume,
    });

    await newOffer.save();
    res.status(201).json({ message: "Offer sent successfully!", offer: newOffer });

  } catch (error) {
    res.status(500).json({ error: "Error sending offer." });
  }
};

// Get all offers received by a user
exports.getUserOffers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const offers = await Offer.find({ receiver: userId }).populate("sender post");
    res.status(200).json(offers);

  } catch (error) {
    res.status(500).json({ error: "Error fetching offers." });
  }
};

// Update Offer Status (Accept/Reject)
exports.updateOfferStatus = async (req, res) => {
  try {
    const { offerId } = req.params;
    const { status } = req.body; // "Accepted" or "Rejected"

    const offer = await Offer.findById(offerId);
    if (!offer) return res.status(404).json({ error: "Offer not found." });

    offer.status = status;
    await offer.save();

    res.status(200).json({ message: `Offer ${status.toLowerCase()} successfully!`, offer });

  } catch (error) {
    res.status(500).json({ error: "Error updating offer status." });
  }
};
