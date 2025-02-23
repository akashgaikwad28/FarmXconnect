const fs = require('fs');
const path = require('path');

// Helper function to create directories recursively
const createDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Helper function to create files with dummy content
const createFile = (filePath, content = '') => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
};

// Main function to create the project structure
const createProjectStructure = () => {
    // Define the directory structure
    const dirs = [
        'src/config',
        'src/models',
        'src/routes',
        'src/controllers',
        'src/middlewares',
        'src/services',
        'src/utils',
        'src/public',
        'tests'
    ];

    // Create all directories
    dirs.forEach(dir => createDir(path.join(__dirname, dir)));

    // Create main files in the root directory
    createFile(path.join(__dirname, 'package.json'), JSON.stringify({
        name: "farmxconnect",
        version: "1.0.0",
        description: "",
        main: "index.js",
        scripts: {
            test: "echo \"Error: no test specified\" && exit 1"
        },
        keywords: [],
        author: "",
        license: "ISC"
    }, null, 2));

    createFile(path.join(__dirname, '.gitignore'), 'node_modules/\n.env\n');

    createFile(path.join(__dirname, 'README.md'), '# FarmXconnect\n\nYour project documentation goes here.');

    createFile(path.join(__dirname, '.env'), 'PORT=3000\nDB_URI=your-mongo-db-uri\nJWT_SECRET=your-jwt-secret\n');

    createFile(path.join(__dirname, 'src/app.js'), `const express = require('express');
const app = express();
app.use(express.json());

// Add your routes here

module.exports = app;`);

    createFile(path.join(__dirname, 'src/server.js'), `const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`);

    // Creating files in 'src/config'
    createFile(path.join(__dirname, 'src/config/db.js'), `const mongoose = require('mongoose');
module.exports = mongoose;`);

    createFile(path.join(__dirname, 'src/config/dotenv.js'), `require('dotenv').config();`);

    // Creating files in 'src/models'
    createFile(path.join(__dirname, 'src/models/User.js'), `const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);`);

    createFile(path.join(__dirname, 'src/models/Trade.js'), `const mongoose = require('mongoose');
const tradeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    tradeType: { type: String, required: true },
    status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Trade', tradeSchema);`);

    createFile(path.join(__dirname, 'src/models/MarketData.js'), `const mongoose = require('mongoose');
const marketDataSchema = new mongoose.Schema({
    market: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MarketData', marketDataSchema);`);

    // Creating files in 'src/routes'
    createFile(path.join(__dirname, 'src/routes/authRoutes.js'), `const express = require('express');
const router = express.Router();
// Add your authentication routes here
module.exports = router;`);

    createFile(path.join(__dirname, 'src/routes/tradeRoutes.js'), `const express = require('express');
const router = express.Router();
// Add your trade-related routes here
module.exports = router;`);

    createFile(path.join(__dirname, 'src/routes/marketRoutes.js'), `const express = require('express');
const router = express.Router();
// Add your market data routes here
module.exports = router;`);

    createFile(path.join(__dirname, 'src/routes/userRoutes.js'), `const express = require('express');
const router = express.Router();
// Add your user profile routes here
module.exports = router;`);

    // Creating files in 'src/controllers'
    createFile(path.join(__dirname, 'src/controllers/authController.js'), `// Add your authentication logic here
module.exports = {};`);

    createFile(path.join(__dirname, 'src/controllers/tradeController.js'), `// Add your trade management logic here
module.exports = {};`);

    createFile(path.join(__dirname, 'src/controllers/marketController.js'), `// Add your market data fetching logic here
module.exports = {};`);

    createFile(path.join(__dirname, 'src/controllers/userController.js'), `// Add your user profile handling logic here
module.exports = {};`);

    // Creating files in 'src/middlewares'
    createFile(path.join(__dirname, 'src/middlewares/authMiddleware.js'), `// Add your JWT authentication logic here
module.exports = {};`);

    createFile(path.join(__dirname, 'src/middlewares/errorHandler.js'), `// Add your global error handling logic here
module.exports = {};`);

    // Creating files in 'src/services'
    createFile(path.join(__dirname, 'src/services/notificationService.js'), `// Add your Firebase/Twilio notification logic here
module.exports = {};`);

    createFile(path.join(__dirname, 'src/services/paymentService.js'), `// Add your payment API (Stripe/Razorpay) logic here
module.exports = {};`);

    // Creating files in 'src/utils'
    createFile(path.join(__dirname, 'src/utils/generateToken.js'), `const jwt = require('jsonwebtoken');
module.exports = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};`);
};

// Run the project structure creation
createProjectStructure();
console.log('Project structure created successfully!');
