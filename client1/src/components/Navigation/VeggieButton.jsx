import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

export const VeggieButton = (props) => {
  const { setRecipes } = useContext(GlobalContext);
  console.log(props, "VEGGIE BUTTON PROPS---------------");

  const veggieHandler = () => {
    setRecipes(props.recipes, true);
  };

  return (
    <div>
      <div
        onClick={() => {
          veggieHandler();
        }}
      >
        Veggie Recipes
      </div>
    </div>
  );
};
