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

    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5s",
      },
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successfully",
      accessToken: accessToken,
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

// POST: refresh access token
router.post("/refresh", (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token not found",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const accessToken = jwt.sign(
      {
        userId: decoded.userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    console.error("REFRESH TOKEN ERROR:", error);

    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
});

// POST: logout
router.post("/logout", (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  res.status(200).json({
    message: "Logout successfully",
  });
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
