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
        author: Author!
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

    type AuthorData {
        authors: [Author!]!
        totalAuthors: Int!
    }

    type RootQuery {
        recipe(id: ID!): Recipe!
        author(id: ID!): Author!
        recipes: RecipeData!
        recipeByName(name: String!): Recipe!
        authors: AuthorData!
        user: User!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        login(email: String!, password: String!): AuthData!
        addAuthor(name: String!, age: Int!): Author!
        addRecipe(name: String!, genre: String!, authorId: ID!, prepTime: Int!, cookTime: Int!, ingredientsFor: Int!, preparation: String!, veggie: Boolean, ingredients: [IngredientIn!]!): Recipe!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `
);
