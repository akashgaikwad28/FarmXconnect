const jwt = require("jsonwebtoken");

module.exports = (roles = []) => (req, res, next) => {

  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access Denied. No token provided." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    // Check if the user role is authorized
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access Denied. You do not have the right permissions." });
    }
    next();

  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};
