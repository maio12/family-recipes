import { gql } from "@apollo/client";

export const getUsersQuery = gql`
  query getUsers {
    users {
      users {
        name
        _id
        recipes {
          name
        }
      }
      totalUsers
    }
  }
`;

export const getRecipesQuery = gql`
  query getRecipes($page: Int) {
    recipes(page: $page) {
      recipes {
        name
        genre
        prepTime
        cookTime
        veggie
        author {
          name
        }
        ingredients {
          ingredientName
        }
        _id
      }
      totalRecipes
    }
  }
`;

export const recipesByGenreQuery = gql`
  query recipesByGenre {
    recipesByGenre {
      recipesByGenre {
        genre
        recipes {
          recipes {
            name
            genre
            prepTime
            cookTime
            veggie
            author {
              name
            }
            ingredients {
              ingredientName
            }
            _id
          }
          totalRecipes
        }
      }
    }
  }
`;

export const addRecipeMutation = gql`
  mutation (
    $name: String!
    $genre: String!
    $ingredients: [IngredientIn!]!
    # $authorId: ID!
    $preparation: String!
    $prepTime: Int!
    $cookTime: Int!
    $ingredientsFor: Int!
    $veggie: Boolean
  ) {
    addRecipe(
      name: $name
      genre: $genre
      # authorId: $authorId
      ingredients: $ingredients
      preparation: $preparation
      prepTime: $prepTime
      cookTime: $cookTime
      ingredientsFor: $ingredientsFor
      veggie: $veggie
    ) {
      name
      _id
      genre
      ingredients {
        ingredientQty
        ingredientName
      }
      preparation
      prepTime
      cookTime
      veggie
      ingredientsFor
    }
  }
`;

export const getRecipeQuery = gql`
  query getRecipe($id: ID!) {
    recipe(id: $id) {
      name
      _id
      genre
      ingredients {
        ingredientQty
        ingredientName
      }
      preparation
      prepTime
      cookTime
      ingredientsFor
      veggie
      author {
        _id
        name
        recipes {
          name
          _id
        }
      }
    }
  }
`;

export const loginMutation = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
    }
  }
`;

export const signupMutation = gql`
  mutation ($userInput: UserInputData!) {
    createUser(userInput: $userInput) {
      user {
        name
        email
        password
      }
      authData {
        token
        userId
      }
    }
  }
`;

// export const getRecipeByNameQuery = gql `
//   query getRecipe($id: ID!) {
//     recipe(id: $id) {
//       id
//       genre
//       ingredients {
//         ingredientQty
//         ingredientName
//       }
//       preparation
//       prepTime
//       cookTime
//       ingredientsFor
//       veggie
//       author {
//         id
//         name
//         recipes {
//           name
//           id
//           type
//         }
//       }
//     }
//   }
// `;
