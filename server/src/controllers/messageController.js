const Message = require("../models/Message");

// 📩 Send Message
exports.sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;
    const newMessage = await Message.create({
      sender: req.user.id,
      receiver,
      message,
    });

    res.status(201).json({ message: "Message sent successfully!", data: newMessage });
  } catch (error) {
    res.status(500).json({ error: "Error sending message." });
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
    res.status(500).json({ error: "Error retrieving messages." });
  }
};
