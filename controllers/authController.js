const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Signup Controller

exports.signup = async(req, res) => {
    const { name, email, password } = req.body;

    // Check if any field is empty
    if (!name || !email || !password) {
        return res.json({
            status: "FAILED",
            message: "Fill input fields",
        });
    }

    // Validate name (only alphabet characters and spaces)
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return res.json({
            status: "FAILED",
            message: "Invalid name entered",
        });
    }

    // Validate email
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.json({
            status: "FAILED",
            message: "Invalid email entered",
        });
    }

    // Validate password length
    if (password.length < 8) {
        return res.json({
            status: "FAILED",
            message: "Password is too short",
        });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({
                status: "FAILED",
                message: "User already exists",
            });
        }

        // Create and save the new user
        const newUser = new User({
            name,
            email,
            password
        });

        const result = await newUser.save();

        return res.json({
            status: "SUCCESS",
            message: "Signup successfully",
            data: result,
        });

    } catch (err) {
        console.error("Error during signup:", err);
        return res.json({
            status: "FAILED",
            message: "An error occurred during signup",
        });
    }
};


// Login Controller
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        // Exclude sensitive information from the user object
        const userData = {
            id: user._id,
            email: user.email,
            // Add other fields you want to include, excluding sensitive data like password
        };

        res.status(200).send({ token, user: userData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};