import React, { useState, useContext } from "react";

import { RecipeTile } from "../RecipeTile/RecipeTile";
import { Paginator } from "../Paginator/Paginator";
import { GlobalContext } from "../../context/GlobalState";

export const RecipeList = (props) => {
  const [recipesLoading, setRecipesLoading] = useState(false);
  const [recipesPageX, setRecipesPageX] = useState(1);
  const { setRecipesPage, closeRecipeList } = useContext(GlobalContext);

  const loadRecipes = (direction) => {
    if (direction) {
      setRecipesLoading(true);
    }
    let page = recipesPageX;
    if (direction === "next") {
      page++;
      setRecipesPage(page);
      setRecipesPageX(page);
    }
    if (direction === "previous") {
      page--;
      setRecipesPage(page);
      setRecipesPageX(page);
    }
    closeRecipeList();
  };

  return (
    <Paginator
      onPrevious={() => loadRecipes("previous")}
      onNext={() => loadRecipes("next")}
      lastPage={Math.ceil(props.totalRecipes / 10)}
      currentPage={recipesPageX}
    >
      <div className="container">
        <ul className="recipe__list">
          {props.recipes.map((r) => {
            return <RecipeTile key={r._id} recipe={r} />;
          })}
        </ul>
        {props.children}
      </div>
    </Paginator>
  );
};
