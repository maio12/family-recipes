import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { getRecipeQuery } from "../../queries/queries";
import { GlobalContext } from "../../context/GlobalState.js";
import { useTransition, animated } from "react-spring";

const displayRecipe = (l, d, e) => {
  let recipe;
  if (d) {
    recipe = d.recipe;
    console.log(recipe, "RECIPE------------");
  }
  if (e) {
    console.log(`error in RecipeDetails ${e}`);
    return;
  }
  return l ? (
    <div>Loading recipe info...</div>
  ) : recipe ? (
    <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.genre}</p>
      <p>Recipe by: {recipe.author.name}</p>
      <p>Preparation: {recipe.preparation}</p>
      <p>All recipes by this author</p>
      <ul className="recipe__author">
        {recipe.author.recipes.map((i) => {
          return <li key={i._id}>{i.name}</li>;
        })}
      </ul>
    </div>
  ) : (
    <div>Select a recipe</div>
  );
};

export const RecipeDetails = ({ recipeId }) => {
  const { recipeListOpen, closeRecipeList } = useContext(GlobalContext);
  const transition = useTransition(recipeListOpen, {
    from: { x: 400, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -400, y: 0, opacity: 0 },
  });
  const userecipeId = recipeId ? recipeId : null;
  const { loading, data, error } = useQuery(getRecipeQuery, {
    variables: { id: userecipeId },
  });
  console.log(data);

  return (
    <div className="recipe__details-container">
      {transition(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              onClick={closeRecipeList}
              className="recipe__details--open"
            >
              {recipeListOpen && displayRecipe(loading, data, error)}
            </animated.div>
          )
      )}
    </div>
  );
};
