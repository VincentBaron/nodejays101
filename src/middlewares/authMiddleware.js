const jwt = require("jsonwebtoken");
const { User } = require("../models/User"); // Replace with your Mongoose User model

const authMiddleware = async (req, res, next) => {
  try {
    // Get the JWT token from the Authorization cookie
    const token = req.cookies.Authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Decode and validate the JWT token
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.sub;

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach the user to the request context
    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
