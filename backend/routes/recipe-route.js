const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe-model");
const authMiddleware = require("../middleware/auth-middleware");

//GET: list all owned recipes
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Lấy thông tin phân trang từ query parameters
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // Tính số document cần bỏ qua
    const skip = (page - 1) * limit;

    // Search
    const search = req.query.search?.trim() || "";

    // Category
    const categories = req.query.categories || "ALL";

    // Tạo filter object gửi vào query
    const filter = { ownerId: req.user.userId };

    // Search theo recipeName
    if (search) {
      filter.recipeName = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter category
    if (categories && categories !== "ALL") {
      filter.categories = categories;
    }

    // Lấy recipes từ database với filter
    const recipes = await Recipe.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Đếm tổng số recipes theo filter
    const totalCount = await Recipe.countDocuments(filter);

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
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,
      ownerId: req.user.userId,
    });

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
router.post("/", authMiddleware, async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      ownerId: req.user.userId,
    });

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
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      {
        _id: req.params.id,
        ownerId: req.user.userId,
      },
      {
        ...req.body,
        ownerId: req.user.userId,
      },
      {
        new: true,
        runValidators: true,
      },
    );

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
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user.userId,
    });

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
