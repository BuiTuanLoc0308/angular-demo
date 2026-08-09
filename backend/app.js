require("dotenv").config();

const express = require("express");
const cors = require("cors");

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

module.exports = app;
