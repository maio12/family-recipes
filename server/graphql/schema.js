const { buildSchema } = require("graphql");

module.exports = buildSchema(
  ` 
    type Recipe {
        _id: ID!
        name: String!
        genre: String!
        prepTime: Int!
        cookTime: Int!
        ingredientsFor: Int!
        preparation: String!
        veggie: Boolean!
        ingredients: [IngredientOut!]!
        author: User!
        authorId: ID!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        recipes: [Recipe!]!
    }

    type SignupUserData {
        user: User!
        authData: AuthData!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    input IngredientIn {
        _id: ID!
        ingredientName: String!
        ingredientQty: Int!
    }

    type IngredientOut {
        _id: ID!
        ingredientName: String!
        ingredientQty: Int!
    }

    type Author {
        _id: ID!
        name: String!
        recipes: [Recipe!]!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    type RecipeData {
        recipes: [Recipe!]!
        totalRecipes: Int!
    }

    type RecipeByGenreData {
        genre: String!
        recipes: RecipeData!
    }

    type ProvaGenre {
        recipesByGenre: [RecipeByGenreData!]!
    }

    type UsersData {
        users: [User!]!
        totalUsers: Int!
    }

    type RootQuery {
        recipe(id: ID!): Recipe!
        author(id: ID!): Author!
        recipes(page: Int): RecipeData!
        recipesByUser(userId: ID!): RecipeData!
        users: UsersData!
        user: User!
        recipesByGenre: ProvaGenre!
    }

    type RootMutation {
        createUser(userInput: UserInputData!): SignupUserData!
        login(email: String!, password: String!): AuthData!
        addAuthor(name: String!): Author!
        addRecipe(name: String!, genre: String!, prepTime: Int!, cookTime: Int!, ingredientsFor: Int!, preparation: String!, veggie: Boolean, ingredients: [IngredientIn!]!): Recipe!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `
);
