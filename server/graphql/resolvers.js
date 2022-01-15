const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Author = require("../models/author");
const Recipe = require("../models/recipe");
const User = require("../models/user");
const { recipes, user } = require("./helpers");

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
    const token = await jwt.sign(
      {
        userId: createdUser._id.toString(),
        email: createdUser.email,
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    return {
      user: { ...createdUser._doc },
      _id: createdUser._id.toString(),
      authData: { token: token, userId: createdUser._id.toString() },
      createdAt: createdUser.createdAt.toISOString(),
      updatedAt: createdUser.updatedAt.toISOString(),
    };
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

  // addAuthor: async function ({ name, age }, req) {
  //   if (!req.isAuth) {
  //     const error = new Error("Not authenticated!");
  //     error.code = 401;
  //     throw error;
  //   }
  //   const author = new Author({
  //     name,
  //     age,
  //   });
  //   const createdAuthor = await author.save();
  //   return {
  //     ...createdAuthor._doc,
  //     _id: createdAuthor._id.toString(),
  //     createdAt: createdAuthor.createdAt.toISOString(),
  //     updatedAt: createdAuthor.updatedAt.toISOString(),
  //   };
  // },

  addRecipe: async function (
    {
      name,
      genre,
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
    const author = await User.findById(req.userId);
    const authorId = author._id;
    if (!author) {
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
      author: () => user(foundRecipe._doc.author._id),
      _id: foundRecipe._id.toString(),
      createdAt: foundRecipe.createdAt.toISOString(),
      updatedAt: foundRecipe.updatedAt.toISOString(),
    };
  },

  // author: async function ({ id }, req) {
  //   if (!req.isAuth) {
  //     const error = new Error("Not authenticated!");
  //     error.code = 401;
  //     throw error;
  //   }
  //   const foundAuthor = await Author.findById(id);
  //   if (!foundAuthor) {
  //     const error = new Error("No author found");
  //     error.code = 404;
  //     throw error;
  //   }
  //   return {
  //     ...foundAuthor._doc,
  //     _id: foundAuthor._id.toString(),
  //     recipes: () => recipes(foundAuthor._doc.recipes),
  //     createdAt: foundAuthor.createdAt.toISOString(),
  //     updatedAt: foundAuthor.updatedAt.toISOString(),
  //   };
  // },

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
    return {
      ...user._doc,
      _id: user._id.toString(),
      recipes: () => recipes(user._doc.recipes),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  },

  recipes: async function ({ page }, req) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    if (!page) {
      page = 1;
    }
    const perPage = 10;
    const recipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate("user");
    const totalRecipes = await Recipe.find().countDocuments();
    return {
      recipes: recipes.map((r) => {
        return {
          ...r._doc,
          author: () => user(r._doc.author),
          _id: r._id.toString(),
          createdAt: r.createdAt.toISOString(),
          updatedAt: r.updatedAt.toISOString(),
        };
      }),
      totalRecipes,
    };
  },

  // recipesByAuthor: async function ({ authorId }, req) {
  //   if (!req.isAuth) {
  //     const error = new Error("Not authenticated!");
  //     error.code = 401;
  //     throw error;
  //   }
  //   const recipes = await Recipe.find();
  //   const filtered = recipes.filter((r) => r.authorId === authorId);
  //   if (!filtered.length) {
  //     const error = new Error("No recipe available for this user found");
  //     error.code = 404;
  //     throw error;
  //   }
  //   const totalRecipes = filtered.length;
  //   return {
  //     recipes: filtered.map((f) => {
  //       return {
  //         ...f._doc,
  //         author: () => user(f._doc.author),
  //         _id: f._id.toString(),
  //         createdAt: f.createdAt.toISOString(),
  //         updatedAt: f.updatedAt.toISOString(),
  //       };
  //     }),
  //     totalRecipes,
  //   };
  // },

  recipesByUser: async function ({ userId }, req) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const recipes = await Recipe.find();
    const filtered = recipes.filter((r) => r.authorId === userId);
    if (!filtered.length) {
      const error = new Error("No recipe available for this user found");
      error.code = 404;
      throw error;
    }
    const totalRecipes = filtered.length;
    return {
      recipes: filtered.map((f) => {
        return {
          ...f._doc,
          author: () => user(f._doc.author),
          _id: f._id.toString(),
          createdAt: f.createdAt.toISOString(),
          updatedAt: f.updatedAt.toISOString(),
        };
      }),
      totalRecipes,
    };
  },

  // authors: async function (_, req) {
  //   if (!req.isAuth) {
  //     const error = new Error("Not authenticated!");
  //     error.code = 401;
  //     throw error;
  //   }
  //   const authors = await Author.find();
  //   const totalAuthors = await Author.find().countDocuments();
  //   return {
  //     authors: authors.map((a) => {
  //       return {
  //         ...a._doc,
  //         _id: a._id.toString(),
  //         recipes: () => recipes(a._doc.recipes),
  //         createdAt: a.createdAt.toISOString(),
  //         updatedAt: a.updatedAt.toISOString(),
  //       };
  //     }),
  //     totalAuthors,
  //   };
  // },

  users: async function (_, req) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const users = await User.find();
    const totalUsers = await User.find().countDocuments();
    return {
      users: users.map((u) => {
        return {
          ...u._doc,
          _id: u._id.toString(),
          recipes: () => recipes(u._doc.recipes),
          createdAt: u.createdAt.toISOString(),
          updatedAt: u.updatedAt.toISOString(),
        };
      }),
      totalUsers,
    };
  },

  recipesByGenre: async function (_, req) {
    // if (!req.isAuth) {
    //   const error = new Error("Not authenticated!");
    //   error.code = 401;
    //   throw error;
    // }
    // if (!genre) {
    //   genre = "Primi";
    // }
    // console.log(genre, "genre", typeof genre);
    const recipes = await Recipe.find();
    const totalRecipes = await Recipe.find().countDocuments();

    const filtered = recipes.reduce((objectsByKeyValue, obj) => {
      const value = obj.genre;
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
    if (!Object.keys(filtered).length) {
      const error = new Error("No genre found");
      error.code = 404;
      throw error;
    }

    return {
      recipesByGenre: Object.keys(filtered).map((genre) => {
        return {
          genre: genre,
          recipes: {
            recipes: filtered[genre].map((fi) => {
              return {
                ...fi._doc,
                author: () => user(fi._doc.author),
                _id: fi._id.toString(),
                createdAt: fi.createdAt.toISOString(),
                updatedAt: fi.updatedAt.toISOString(),
              };
            }),
            totalRecipes: filtered[genre].length,
          },
        };
      }),
    };
  },

  // recipeByName: async function ({ name }, req) {
  //   if (!req.isAuth) {
  //     const error = new Error("Not authenticated!");
  //     error.code = 401;
  //     throw error;
  //   }
  //   const recipes = await Recipe.find();
  //   const filtered = recipes.filter(
  //     (p) => p.name.toLowerCase() === name.toLowerCase()
  //   );
  //   if (!filtered.length) {
  //     const error = new Error("No recipe found");
  //     error.code = 404;
  //     throw error;
  //   }
  //   return {
  //     ...filtered._doc,
  //     _id: filtered._id.toString(),
  //     createdAt: filtered.createdAt.toISOString(),
  //     updatedAt: filtered.updatedAt.toISOString(),
  //   };
  // },
};
