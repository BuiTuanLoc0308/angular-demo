const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const PORT = 3000;

// eneble cors for all routes
app.use(cors());

//eneble json parsing for all routes
app.use(express.json());

// import routes
const authRoutes = require("./routes/auth-route");
const recipeRoutes = require("./routes/recipe-route");

// use routes
app.use("/api/auth", authRoutes);
app.use("/api/recipe", recipeRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World! Welcome to the backend server.");
});

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting the server:", error);
  } else {
    console.log("Server is running on port:", PORT);
  }
});

connectToDatabase().catch((error) => {
  console.error("Error connecting to the database:", error);

  process.exit(1); // Exit the process with an error code
});

async function connectToDatabase() {
  const connectionString = process.env.MONGODB_URI;

  await mongoose.connect(connectionString);

  mongoose.set("strictQuery", true);
}
