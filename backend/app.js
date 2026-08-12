require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth-route");
const recipeRoutes = require("./routes/recipe-route");

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:4200",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Database connection (lazy, per-invocation for serverless environments)
let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);

  isConnected = true;

  console.log("MongoDB connected");
}

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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipe", recipeRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Recipe backend is running!",
  });
});

module.exports = app;
