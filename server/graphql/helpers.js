const Author = require("../models/author");
const Recipe = require("../models/recipe");

const recipes = async (recipeIds) => {
  try {
    const recipes = await Recipe.find({ _id: { $in: recipeIds } });
    return recipes.map((recipe) => ({
      ...recipe._doc,
      author: () => author(recipe._doc.author),
    }));
  } catch (err) {
    throw err;
  }
};

const author = async (authorId) => {
  try {
    const author = await Author.findById(authorId);
    return {
      ...author._doc,
      recipes: () => recipes(author._doc.recipes),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { recipes, author };
