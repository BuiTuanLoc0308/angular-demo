const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe-model");

//GET: list all recipes
router.get("/", async (req, res) => {
  try {
    // Lấy thông tin phân trang từ query parameters
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // Tính số document cần bỏ qua
    const skip = (page - 1) * limit;

    // Lấy recipes
    const recipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Đếm tổng số recipes
    const totalCount = await Recipe.countDocuments();

    // Tính tổng số trang
    const totalPages = Math.ceil(totalCount / limit);

    // Trả response
    res.status(200).json({
      recipes,
      page,
      limit,
      totalCount,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch recipes",
      error: error.message,
    });
  }
});

//GET: get a recipe by id
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch recipe",
      error: error.message,
    });
  }
});

//POST: create a new recipe
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);

    const savedRecipe = await recipe.save();

    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create recipe",
      error: error.message,
    });
  }
});

//PUT: update a recipe by id
router.put("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update recipe",
      error: error.message,
    });
  }
});

//DELETE: delete a recipe by id
router.delete("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete recipe",
      error: error.message,
    });
  }
});

module.exports = router;
