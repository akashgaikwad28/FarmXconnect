const jwt = require('jsonwebtoken');
module.exports = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};