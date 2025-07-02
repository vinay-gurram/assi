const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = decoded;

    if (decoded.isVerified === true) {
      return next(); 
    } else {
      return res.status(403).json({ message: "Not authorized as the Admin" });
    }

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = authMiddleWare;