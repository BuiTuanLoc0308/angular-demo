const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

// POST: login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "Wrong username or password",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Wrong username or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({
      message: "Login successfully",
      accessToken: token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

//POST: register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    const newUser = new User({
      username,
      password,
    });

    await newUser.save();

    res.status(201).json({
      message: "Register successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
