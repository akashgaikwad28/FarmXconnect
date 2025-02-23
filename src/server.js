const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require("./src/routes/authRoutes");
const tradeRoutes = require("./src/routes/tradeRoutes");
const marketRoutes = require("./src/routes/marketRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/trades", tradeRoutes);
app.use("/api/market", marketRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
