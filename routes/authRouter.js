const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const authController = require('../controllers/authController');
const keysecret = "yashmehta20041311290";
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "yashm13114@gmail.com",
        pass: "pkwbruokbahvijda"
    },
});

// testing process
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("ready for messages");
        console.log(success);
    }
});

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post("/register", async(req, res) => {
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

        // Hash the password
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Create and save the new user
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            verified: false,
        });

        // const result = await newUser.save()
        newUser
            .save()


        // return res.json({
        //     status: "SUCCESS",
        //     message: "Signup successfully",
        //     data: result,
        // });
    } catch (err) {
        console.error("Error during signup:", err);
        return res.json({
            status: "FAILED",
            message: "An error occurred during signup",
        });
    }
});
router.post('/sendpasswordlink', async(req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ status: "FAILED", message: "Enter Your Email" });
    }

    try {
        console.log("Received email:", email);
        const user = await User.findOne({ email: email });
        console.log("User found:", user);

        if (!user) {
            return res.status(404).json({ status: "FAILED", message: "User not found" });
        }

        // Generate token
        const token = jwt.sign({ _id: user._id }, keysecret, { expiresIn: "2m" });
        user.verifytoken = token;
        await user.save();

        const mailOptions = {
            from: "yashm13114@mail.com",
            to: email,
            subject: "Password Reset",
            text: `This link is valid for 2 minutes: https://localhost:5173/forgotpassword/${user._id}/${token}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ status: "FAILED", message: "Email not sent" });
            } else {
                console.log("Email sent:", info.response);
                return res.status(200).json({ status: "SUCCESS", message: "Email sent successfully" });
            }
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({ status: "FAILED", message: "An error occurred" });
    }
});

// verify user for forgot password time
router.get("/forgotpassword/:id/:token", async(req, res) => {
    const { id, token } = req.params;

    try {
        const validuser = await User.findOne({ _id: id, verifytoken: token });

        const verifyToken = jwt.verify(token, keysecret);

        console.log(verifyToken);

        if (validuser && verifyToken._id) {
            res.status(201).json({ status: 201, validuser });
        } else {
            res.status(401).json({ status: 401, message: "user not exist" });
        }
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
});

// change password

router.post("/:id/:token", async(req, res) => {
    const { id, token } = req.params;

    const { password } = req.body;

    try {
        const validuser = await User.findOne({ _id: id, verifytoken: token });

        const verifyToken = jwt.verify(token, keysecret);

        if (validuser && verifyToken._id) {
            const newpassword = await bcrypt.hash(password, 12);

            const setnewuserpass = await User.findByIdAndUpdate({ _id: id }, { password: newpassword });

            setnewuserpass.save();
            res.status(201).json({ status: 201, setnewuserpass });
        } else {
            res.status(401).json({ status: 401, message: "user not exist" });
        }
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
});
module.exports = router;