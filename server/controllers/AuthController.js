const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/users');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({
                message: "User already exists, please log in",
                success: false,
            });
        }

        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        res.status(201).json({
            message: "Signup successful",
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found, please sign up",
                success: false,
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        // 🔍 Check if JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing in environment variables");
            return res.status(500).json({
                message: "Internal server error",
                success: false,
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );


        // ✅ Send user name and token in the response
        res.status(200).json({
            message: "Login successful",
            success: true,
            token,  // JWT token
            name: user.name,  // Send user name
        });

    } catch (error) {
        console.error("Login Error:", error); // Log for debugging
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};


// Export signup and login functions
module.exports = { signup, login };
