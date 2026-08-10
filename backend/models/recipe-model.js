const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
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

  reviews: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("recipe", recipeSchema);
