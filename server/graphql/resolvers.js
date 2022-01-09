const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Author = require("../models/author");
const Recipe = require("../models/recipe");
const User = require("../models/user");
const { recipes, author } = require("./helpers");

module.exports = {
  createUser: async function ({ userInput }, req) {
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User already exists!");
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw,
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
  login: async function ({ email, password }) {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("User not found.");
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Password is incorrect.");
      error.code = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    return { token: token, userId: user._id.toString() };
  },
  addAuthor: async function ({ name, age }, req) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const author = new Author({
      name,
      age,
    });
    const createdAuthor = await author.save();
    return {
      ...createdAuthor._doc,
      _id: createdAuthor._id.toString(),
      createdAt: createdAuthor.createdAt.toISOString(),
      updatedAt: createdAuthor.updatedAt.toISOString(),
    };
  },
  addRecipe: async function (
    {
      name,
      genre,
      authorId,
      prepTime,
      cookTime,
      ingredientsFor,
      preparation,
      veggie,
      ingredients,
    },
    req
  ) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const user = await User.findById(req.userId);
    const author = await Author.findById(authorId);
    if (!user) {
      const error = new Error("Invalid user.");
      error.code = 401;
      throw error;
    }
    const recipe = new Recipe({
      name,
      genre,
      authorId,
      prepTime,
      cookTime,
      ingredientsFor,
      preparation,
      veggie,
      ingredients,
      author,
    });
    const createdRecipe = await recipe.save();
    user.recipes.push(createdRecipe);
    await user.save();
    author.recipes.push(createdRecipe);
    await author.save();
    return {
      ...createdRecipe._doc,
      _id: createdRecipe._id.toString(),
      createdAt: createdRecipe.createdAt.toISOString(),
      updatedAt: createdRecipe.updatedAt.toISOString(),
    };
  },
  recipe: async function ({ id }, req) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const foundRecipe = await Recipe.findById(id);
    if (!foundRecipe) {
      const error = new Error("No recipe found");
      error.code = 404;
      throw error;
    }
    return {
      ...foundRecipe._doc,
      author: () => author(foundRecipe._doc.authorId),
      _id: foundRecipe._id.toString(),
      createdAt: foundRecipe.createdAt.toISOString(),
      updatedAt: foundRecipe.updatedAt.toISOString(),
    };
  },
  author: async function ({ id }, req) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const foundAuthor = await Author.findById(id);
    if (!foundAuthor) {
      const error = new Error("No author found");
      error.code = 404;
      throw error;
    }
    return {
      ...foundAuthor._doc,
      _id: foundAuthor._id.toString(),
      recipes: () => recipes(foundAuthor._doc.recipes),
      createdAt: foundAuthor.createdAt.toISOString(),
      updatedAt: foundAuthor.updatedAt.toISOString(),
    };
  },
  user: async function (_, req) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("No user found!");
      error.code = 404;
      throw error;
    }
    return { ...user._doc, _id: user._id.toString() };
  },
  recipes: async function (_, req) {
    console.log(req, "req---------------");
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const recipes = await Recipe.find();
    const totalRecipes = await Recipe.find().countDocuments();
    return {
      recipes: recipes.map((r) => {
        return {
          ...r._doc,
          author: () => author(r._doc.author),
          _id: r._id.toString(),
          createdAt: r.createdAt.toISOString(),
          updatedAt: r.updatedAt.toISOString(),
        };
      }),
      totalRecipes,
    };
  },
  authors: async function (_, req) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const authors = await Author.find();
    const totalAuthors = await Author.find().countDocuments();
    return {
      authors: authors.map((a) => {
        return {
          ...a._doc,
          _id: a._id.toString(),
          recipes: () => recipes(a._doc.recipes),
          createdAt: a.createdAt.toISOString(),
          updatedAt: a.updatedAt.toISOString(),
        };
      }),
      totalAuthors,
    };
  },

  recipeByName: async function ({ name }, req) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const recipes = await Recipe.find();
    const filtered = recipes.filter(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    if (!filtered.length) {
      const error = new Error("No recipe found");
      error.code = 404;
      throw error;
    }
    return {
      ...filtered._doc,
      _id: filtered._id.toString(),
      createdAt: filtered.createdAt.toISOString(),
      updatedAt: filtered.updatedAt.toISOString(),
    };
  },
};
