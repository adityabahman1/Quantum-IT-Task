const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// 🔐 Register Controller
exports.registerUser = async (req, res) => {
    const { fullname, email, password, dob } = req.body;

    // Improved validation with more specific error messages
    if (!fullname) {
        return res.status(400).json({ message: "Full name is required" });
    }
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }
    if (!dob) {
        return res.status(400).json({ message: "Date of birth is required" });
    }

    try {
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create user with proper date parsing
        // This ensures the date is properly converted regardless of format
        const parsedDob = new Date(dob);
        if (isNaN(parsedDob.getTime())) {
            return res.status(400).json({ message: "Invalid date format for date of birth" });
        }

        const user = await User.create({ 
            fullname, 
            email, 
            password, 
            dob: parsedDob 
        });

        // Get all users (including self), exclude password
        const allUsers = await User.find().select("-password");

        res.status(201).json({
            message: "Registration successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                dob: user.dob,
            },
            users: allUsers,
            token: generateToken(user._id)
        });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ 
            message: "Error during registration", 
            error: err.message 
        });
    }
};

// 🔐 Login Controller
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const allUsers = await User.find().select("-password");

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                dob: user.dob,
            },
            users: allUsers,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during login", error: error.message });
    }
};

// 👤 Get Authenticated User Info
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("password");

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({ user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
};
