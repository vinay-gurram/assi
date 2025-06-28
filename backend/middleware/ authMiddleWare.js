const jwt = require("jsonwebtoken");

const authMiddleware = (requireAdmin = false) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (requireAdmin && decoded.role !== "admin") {
        return res.status(403).json({ message: "Not authorized as admin" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = authMiddleware;
