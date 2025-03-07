const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Farmer", "Trader"], required: true },
  profilePic: { type: String, default: "" },
  location: { type: String, required: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
  refreshToken: { type: String } // Added field for storing refresh token
});


module.exports = mongoose.model("User", UserSchema);
