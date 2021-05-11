import React, { useState, useContext } from 'react'

import {RecipeDetails} from './RecipeDetails';
import {useQuery} from '@apollo/client';
import { getRecipesQuery } from '../queries/queries';
import { GlobalContext } from '../context/GlobalState.js';

export const RecipeList = () => {
  const { loading, error, data } = useQuery(getRecipesQuery);
  console.log(data)
  const {recipeListOpen, openRecipeList} = useContext(GlobalContext);
  const [selected, setSelected] = useState('');
  
  const prova = (recipe) => {
    setSelected(recipe);
    openRecipeList()
  }

  const displayRecipes = (l, d, e) => {
    let recipes;
    if (d) 
    { recipes = d.recipes}
    if (e) {
      console.log(`error in RecipeList ${e}`)
      return 
    }
    return (
      l ? 
        <div>Loading Recipes...</div> : 
        recipes.map(  
          recipe => 
            <li className="recipe__list--item" key={recipe.id} onClick={(e) => {prova(recipe.id)}}>{recipe.name}</li>
           
            )
    )
  }
  console.log(selected, 'SELECTED')
  console.log(recipeListOpen)
  return (
    <div>
      <ul className="recipe__list">
        {displayRecipes(loading, data, error)}
      </ul>
      {recipeListOpen && <RecipeDetails recipeId={selected}/>}
    </div>
  )
}
