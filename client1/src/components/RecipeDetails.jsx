import React, {useContext} from 'react'
import {useQuery} from '@apollo/client';
import { getRecipeQuery } from '../queries/queries';
import { GlobalContext } from '../context/GlobalState.js';

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
      <div>Loading recipe info...</div> :
      recipe ?
      <div>
        <h2>{recipe.name}</h2>
        <p>{recipe.genre}</p>
        <p>Recipe by: {recipe.author.name}</p>
        <p>Preparation: {recipe.preparation}</p>
        <p>All recipes by this author</p>
          <ul className="recipe__author">
            {recipe.author.recipes.map(i => {
              return <li key={i.id}>{i.name}</li>
            })}
          </ul>
      </div> :
      <div>Select a recipe</div>
  )
}

export const RecipeDetails = ({ recipeId }) => {
  const {recipeListOpen} = useContext(GlobalContext);
  const userecipeId = recipeId ? recipeId : null
  const { loading, data, error } = useQuery(getRecipeQuery, { variables: { id: userecipeId} } );
    console.log(data)
  
  return (
    <div>
      <div className={recipeListOpen && "recipe__details--open"}>
        {displayRecipe(loading, data, error)}
      </div>
    </div>
  )
}
