import { gql } from '@apollo/client';

export const getAuthorsQuery = gql`
  query getAuthors {
    authors {
      name
      id
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
`

export const getRecipesQuery = gql`
  query getRecipes {
    recipes {
      name
      genre
      prepTime
      cookTime
      type
      veggie
      author {
        name
        id
      }
      ingredients {
        ingredientName
      }
      id
    }
  }
`

export const addRecipeMutation = gql`
  mutation($name: String!, $genre: String!, $ingredients: [Ingredient], $authorId: ID!, $preparation: String!, $prepTime: Int!, $cookTime: Int!, $ingredientsFor: Int!, $veggie: Boolean ) {
    addRecipe(name: $name, genre: $genre, authorId: $authorId, ingredients: $ingredients, preparation: $preparation, prepTime: $prepTime, cookTime: $cookTime, ingredientsFor: $ingredientsFor, veggie: $veggie) {
      name
      id
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
      id
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
        id
        name
        recipes {
          name
          id
          type
        }
      }
    }
  }
`;
