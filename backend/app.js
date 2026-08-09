require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth-route");
const recipeRoutes = require("./routes/recipe-route");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipe", recipeRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Recipe backend is running!",
  });
});

// Database connection
let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);

  mongoose.set("strictQuery", true);

  isConnected = true;

  console.log("MongoDB connected");
}

// Connect to database before handling request
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

module.exports = app;
