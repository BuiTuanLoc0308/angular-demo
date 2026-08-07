const express = require("express");
const router = express.Router();
const User = require("../models/user-model");

//GET: list all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
});

//GET: get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const foundUser = await User.findById(id);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(foundUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
});

//POST: create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
});

//PUT: update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
});

//DELETE: delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
});

module.exports = router;
