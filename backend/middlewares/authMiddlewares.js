const jwt = require('jsonwebtoken');
const User = require("../models/user");

exports.protect = async (req, res, next) => {
    // ✅ Correct header key
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Not Authorized, no token" });
    }

    try {
        // 🔐 Decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 👤 Fetch full user including password
        req.user = await User.findById(decoded.id).select("-password"); // Includes all fields

        // ✅ Continue to next middleware or route
        next();
    } catch (err) {
        console.error("Token verification failed:", err.message);
        res.status(401).json({ message: "Not Authorized, token failed" });
    }
};