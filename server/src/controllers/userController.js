const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// 🆕 Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, location, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists." });

    // Create new user
    const user = await User.create({ name, email, password, phone, location, role });

    res.status(201).json({
      message: "User registered successfully!",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ error: "Error registering user." });
  }
};

// 🔑 Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    res.status(200).json({
      message: "Login successful!",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in." });
  }
};

// 📄 Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found." });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving profile." });
  }
};

// ✏️ Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found." });

    // Update fields if provided
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.location = req.body.location || user.location;
    if (req.body.password) user.password = req.body.password;

    const updatedUser = await user.save();
    res.status(200).json({ message: "Profile updated successfully!", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Error updating profile." });
  }
};

// 🔍 Get All Users (Admin use case)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users." });
  }
};
