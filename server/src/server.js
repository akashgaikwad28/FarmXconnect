const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const marketRoutes = require("./routes/marketInsightsRoutes.js");
const offerRoutes = require("./routes/offerRoutes");
const marketInsightsRoutes = require("./routes/marketInsightsRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/users", userRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/trades", tradeRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/market-insights", marketInsightsRoutes);
app.use("/api/messages", messageRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
