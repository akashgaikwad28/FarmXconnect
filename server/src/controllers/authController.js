const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
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

const registerUser = async (req, res) => {
  const { name, email, password, phone, location, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: "User already exists." });

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await User.create({ name, email, password: hashedPassword, phone, location, role });

  res.status(201).json({
    message: "User registered successfully!",
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token: generateToken(user),
  });
};

module.exports = { login, registerUser };
