import { gql } from "@apollo/client";

export const getAuthorsQuery = gql`
  query getAuthors {
    authors {
      authors {
        name
        _id
        recipes {
          name
          genre
          veggie
          ingredients {
            ingredientName
            ingredientQty
          }
        }
      }
    }
  }
`;

export const getRecipesQuery = gql`
  query getRecipes {
    recipes {
      recipes {
        name
        genre
        prepTime
        cookTime
        veggie
        authorId
        author {
          name
        }
        ingredients {
          ingredientName
        }
        _id
      }
    }
  }
`;

export const addRecipeMutation = gql`
  mutation (
    $name: String!
    $genre: String!
    $ingredients: [IngredientIn!]!
    $authorId: ID!
    $preparation: String!
    $prepTime: Int!
    $cookTime: Int!
    $ingredientsFor: Int!
    $veggie: Boolean
  ) {
    addRecipe(
      name: $name
      genre: $genre
      authorId: $authorId
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
  mutation ($userInput: Object) {
    createUser(name: $name, email: $email, password: $password) {
      name
      email
      password
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
