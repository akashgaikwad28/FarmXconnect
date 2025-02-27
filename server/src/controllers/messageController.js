const Message = require("../models/Message");

// 📩 Send Message
exports.sendMessage = async (req, res) => {
  try {
    const { receiver, message, tradeOfferId } = req.body; // Added tradeOfferId
    const newMessage = await Message.create({
      sender: req.user.id,
      receiver,
      message,
      tradeOfferId, // Store the trade offer ID with the message
    });

    res.status(201).json({ message: "Message sent successfully!", data: newMessage });
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error sending message."));
  }
};

// 📥 Get Messages with a Specific User
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.id },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error retrieving messages."));
  }
};
