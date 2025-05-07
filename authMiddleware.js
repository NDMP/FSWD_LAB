const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  if (!req.cookies || !req.cookies.authToken) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(req.cookies.authToken, "secretKey", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded; // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticate