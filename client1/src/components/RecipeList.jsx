import React, { useState } from 'react'
import {RecipeDetails} from './RecipeDetails';
import {useQuery} from '@apollo/client';
import { getRecipesQuery } from '../queries/queries';

export const RecipeList = () => {
  const { loading, error, data } = useQuery(getRecipesQuery);
  console.log(data)
  const [selected, setSelected] = useState('');
  
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
            <li className="book__list--item" key={recipe.id} onClick={(e) => {setSelected(recipe.id)}}>{recipe.name}</li>
           
            )
    )
  }
  console.log(selected, 'SELECTED')
  return (
    <div>
      <ul className="book__list">
        {displayRecipes(loading, data, error)}
      </ul>
      <RecipeDetails recipeId={selected}/>
    </div>
  )
}
