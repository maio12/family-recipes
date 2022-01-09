import React, { useState, useContext } from "react";

import { RecipeDetails } from "../RecipeDetails/RecipeDetails";
import { useQuery } from "@apollo/client";
import { getRecipesQuery } from "../../queries/queries";
import { GlobalContext } from "../../context/GlobalState.js";

export const RecipeList = () => {
  const { loading, error, data } = useQuery(getRecipesQuery);
  const { recipeListOpen, openRecipeList } = useContext(GlobalContext);
  const [selected, setSelected] = useState("");

  const showRecipeDetails = (recipe) => {
    setSelected(recipe);
    openRecipeList();
  };

  const displayRecipes = (l, d, e) => {
    let recipes;
    if (d) {
      recipes = d.recipes.recipes;
      console.log(recipes, "RECIPES FROM THE RECIPE LIST", d);
    }
    if (e) {
      console.log(`error in RecipeList ${e}`);
      return;
    }
    return l ? (
      <div>Loading Recipes...</div>
    ) : (
      recipes.map((recipe) => (
        <li
          className="recipe__list--item"
          key={recipe._id}
          onClick={() => {
            showRecipeDetails(recipe._id);
          }}
        >
          {recipe.name}
        </li>
      ))
    );
  };

  return (
    <div className="container">
      <ul className="recipe__list">{displayRecipes(loading, data, error)}</ul>
      {recipeListOpen && <RecipeDetails recipeId={selected} />}
    </div>
  );
};
