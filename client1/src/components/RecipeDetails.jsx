import React from 'react'
import {useQuery} from '@apollo/client';
import { getRecipeQuery } from '../queries/queries';

const displayRecipe = (l, d, e) => {
  let recipe;
  if (d) 
  { recipe = d.recipe};
  if (e) {
    console.log(`error in RecipeDetails ${e}`)
    return 
  }
  return (
    l ? 
      <div>Loading book info...</div> :
      recipe ?
      <div>
        <h2>{recipe.name}</h2>
        <p>{recipe.genre}</p>
        <p>{recipe.author.name}</p>
        <p>All recipes by this author</p>
          <ul className="books__author">
            {recipe.author.recipes.map(i => {
              return <li key={i.id}>{i.name}</li>
            })}
          </ul>
      </div> :
      <div>Select a book</div>
  )
}

export const RecipeDetails = ({ recipeId }) => {
  const userecipeId = recipeId ? recipeId : null
  const { loading, data, error } = useQuery(getRecipeQuery, { variables: { id: userecipeId} } );
    console.log(data)
  
  return (
    <div>
      <div className="book__details">
        {displayRecipe(loading, data, error)}
      </div>
    </div>
  )
}
