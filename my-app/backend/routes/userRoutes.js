const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CredentialModel = require("../models/ManageCredentials");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, age, gender, contact, email, password } = req.body;

    const existingUser = await CredentialModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new CredentialModel({
      name,
      age,
      gender,
      contact,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await CredentialModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "your_secret_key", // Use environment variable in real project
      { expiresIn: "2h" }
    );

    res.json({ message: "Login successful!", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Export the router correctly
module.exports = router;
