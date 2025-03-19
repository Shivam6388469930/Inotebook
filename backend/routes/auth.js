const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const jwt_secret = "shivamcoder";

// Route 1: Handle POST "api/auth/createuser" request to create a new user
router.post('/createuser', [
    body('email', "Please enter a valid email").isEmail(),
    body('name', "Name must be at least 3 characters long").isLength({ min: 3 }),
    body('password', "Password must be at least 5 characters long").isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // Check if user with the same email exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "A user with this email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        // Generate JWT token
        const data = { user: { id: user.id } };
        const auth_token = JWT.sign(data, jwt_secret, { expiresIn: '1h' }); // Token valid for 1 hour
        success = true;
        res.json({ success, auth_token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route 2: Authenticate user using POST "api/auth/login", no login required
router.post('/login', [
    body('email', "Please enter a valid email").isEmail(),
    body('password', "Password cannot be empty").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const data = { user: { id: user.id } };
        const auth_token = JWT.sign(data, jwt_secret, { expiresIn: '1h' }); // Token valid for 1 hour
        success = true;
        res.json({ success, auth_token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route 3: Get logged-in user details using POST "api/auth/getuser", login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id; // Use const or let
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
