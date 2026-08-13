const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe-model");
const authMiddleware = require("../middleware/auth-middleware");
const upload = require("../middleware/upload-middleware");
const uploadToCloudinary = require("../utils/upload-to-cloudinary");
const parseJsonField = require("../utils/parse-json-field");
const { DEFAULT_RECIPE_IMAGE } = require("../constants/recipe-constants");
const deleteFromCloudinary = require("../utils/delete-from-cloudinary");

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
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    let image = DEFAULT_RECIPE_IMAGE;
    let imagePublicId = null;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "recipes");

      image = result.secure_url;
      imagePublicId = result.public_id;
    }

    const categories = parseJsonField(req.body.categories, []);
    const ingredients = parseJsonField(req.body.ingredients, []);
    const instructions = parseJsonField(req.body.instructions, []);

    const recipe = new Recipe({
      recipeName: req.body.recipeName,
      description: req.body.description,
      categories,
      ingredients,
      instructions,
      image,
      imagePublicId,
      ownerId: req.user.userId,
    });

    const savedRecipe = await recipe.save();

    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error("Create recipe error:", error);

    res.status(500).json({
      message: "Failed to create recipe",
      error: error.message,
    });
  }
});

//PUT: update a recipe by id
router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
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

    const categories = parseJsonField(req.body.categories, []);

    const ingredients = parseJsonField(req.body.ingredients, []);

    const instructions = parseJsonField(req.body.instructions, []);

    let image = DEFAULT_RECIPE_IMAGE;
    let imagePublicId = null;

    // Upload ảnh mới nếu user chọn
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "recipes");

      image = result.secure_url;
      imagePublicId = result.public_id;
    }

    // Xóa ảnh cũ nếu đó là ảnh riêng của recipe
    if (recipe.imagePublicId) {
      await deleteFromCloudinary(recipe.imagePublicId);
    }

    recipe.recipeName = req.body.recipeName;
    recipe.description = req.body.description;
    recipe.categories = categories;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    recipe.image = image;
    recipe.imagePublicId = imagePublicId;

    const updatedRecipe = await recipe.save();

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("Update recipe error:", error);

    res.status(500).json({
      message: "Failed to update recipe",
      error: error.message,
    });
  }
});

//DELETE: delete a recipe by id
router.delete("/:id", authMiddleware, async (req, res) => {
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

    if (recipe.imagePublicId) {
      await deleteFromCloudinary(recipe.imagePublicId);
    }

    await recipe.deleteOne();

    res.status(200).json({
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.error("Delete recipe error:", error);

    res.status(500).json({
      message: "Failed to delete recipe",
      error: error.message,
    });
  }
});

module.exports = router;
