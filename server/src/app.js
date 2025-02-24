const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const marketRoutes = require("./routes/marketInsightsRoutes");
const offerRoutes = require("./routes/offerRoutes");
const messageRoutes = require("./routes/messageRoutes");

// Health Check Endpoint
app.get('/api/health', (req, res) => {
    console.log('Health check endpoint accessed');
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date(),
        server: 'FarmXConnect',
        version: '1.0.0'
    });
});


// Route Middleware

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/trades", tradeRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/messages", messageRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
