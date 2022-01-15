import React, { useContext } from "react";
import { useTransition, animated } from "react-spring";
import { GlobalContext } from "../../../context/GlobalState";

export const RecipesTypeDropdown = ({ open, recipesByGenre }) => {
  const { setRecipes } = useContext(GlobalContext);

  const transition = useTransition(open, {
    from: { x: 0, y: 0, opacity: 0 },
    enter: { x: 0, y: 5, opacity: 1 },
    leave: { x: 0, y: -100, opacity: 0 },
  });

  const recipesHandler = (genre) => {
    const recipesOfOneGenreFiltered = recipesByGenre.filter(
      (r) => r.genre === genre
    );

    setRecipes(recipesOfOneGenreFiltered[0].recipes.recipes, true);
  };

  return (
    <div>
      <div>Recipes</div>
      <ul className="authors-dropdown__container">
        {transition(
          (style, item) =>
            item && (
              <animated.div
                style={style}
                onClick={() => {}}
                className="authors-dropdown__container--open"
              >
                {open &&
                  recipesByGenre.map((r) => {
                    return (
                      <li
                        onClick={() => {
                          recipesHandler(r.genre);
                        }}
                        key={r.genre}
                      >
                        {r.genre}
                      </li>
                    );
                  })}
              </animated.div>
            )
        )}
      </ul>
    </div>
  );
};
