const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const app = require("./app");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
