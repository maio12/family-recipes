const User = require("../models/user");
const Recipe = require("../models/recipe");

const recipes = async (recipeIds) => {
  try {
    const recipes = await Recipe.find({ _id: { $in: recipeIds } });
    return recipes.map((recipe) => ({
      ...recipe._doc,
      user: () => user(recipe._doc.author),
    }));
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      recipes: () => recipes(user._doc.recipes),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { recipes, user };
