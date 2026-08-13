const mongoose = require("mongoose");
const reviewSchema = require("./review-model");

const recipeSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    recipeName: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    imagePublicId: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      required: true,
    },

    categories: [
      {
        type: String,
        required: true,
      },
    ],

    ingredients: [
      {
        ingredientName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],

    instructions: [
      {
        content: {
          type: String,
          required: true,
        },
      },
    ],

    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("recipe", recipeSchema);
