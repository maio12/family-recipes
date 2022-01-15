import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState.js";
import { RecipeDetails } from "../RecipeDetails/RecipeDetails";

export const RecipeTile = ({ recipe }) => {
  const { recipeListOpen, openRecipeList } = useContext(GlobalContext);

  const showRecipeDetails = (recipe) => {
    openRecipeList(recipe);
  };

  return (
    <div>
      <li
        className="recipe__list--item"
        key={recipe._id}
        onClick={() => {
          showRecipeDetails(recipe._id);
        }}
      >
        {recipe.name}
      </li>
      {recipeListOpen === recipe._id && <RecipeDetails recipeId={recipe._id} />}
    </div>
  );
};
