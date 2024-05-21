const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category:{ type: String, required: true },
    ingredients: {
      type: [String],
      required: true,
    },
    image: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const Recipe = mongoose.model("recipe", recipeSchema);
module.exports = Recipe;
