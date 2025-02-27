const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials (this should include hashing and comparing passwords)
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate access token
  const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });

  // Generate refresh token
  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  // Store refresh token in user document
  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json({ accessToken, refreshToken });
};

const refreshAccessToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  const user = await User.findOne({ refreshToken: token });
  if (!user) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  // Generate new access token
  const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });

  res.status(200).json({ accessToken });
};

const logout = (req, res) => {
  // Clear the token on the client side
  res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { login, refreshAccessToken, logout };
