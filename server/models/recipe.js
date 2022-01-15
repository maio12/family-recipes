const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    prepTime: {
      type: Number,
      required: true,
    },
    cookTime: {
      type: Number,
      required: true,
    },
    ingredientsFor: {
      type: Number,
      required: true,
    },
    preparation: {
      type: String,
      required: true,
    },
    veggie: {
      type: Boolean,
      required: true,
    },
    ingredients: {
      type: [Object],
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
