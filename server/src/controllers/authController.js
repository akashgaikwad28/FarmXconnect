const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json(new ApiError(500, error.message));
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json(new ApiError(404, "User not found"));

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json(new ApiError(401, "Invalid credentials"));

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ token, user });
    } catch (error) {
        res.status(500).json(new ApiError(500, error.message));
    }
};
