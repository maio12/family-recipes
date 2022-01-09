import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

export default function AddIngredient() {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQty, setIngredientQty] = useState(0);
  const { addIngredient } = useContext(GlobalContext);

  const submitForm = (e) => {
    e.preventDefault();
    setIngredientName("");
    setIngredientQty(0);

    const ingredient = {
      _id: Math.floor(Math.random() * 1000000),
      ingredientName,
      ingredientQty,
    };

    addIngredient(ingredient);
    console.log(ingredient, "INGREDIENTS");
  };

  return (
    <div>
      <div className="field__recipe--name">
        <label className="form__label" htmlFor="">
          Ingredient name
        </label>
        <input
          className="form__input"
          type="text"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          placeholder="Enter Ingredient Name..."
        />
      </div>
      <div className="field__recipe--genre">
        <label className="form__label" htmlFor="">
          Ingredient Qty
        </label>
        <input
          className="form__input"
          type="number"
          value={ingredientQty}
          onChange={(e) => setIngredientQty(parseInt(e.target.value, 10))}
        />
      </div>
      <button onClick={submitForm} className="add-ingredient__button">
        Add ingredient
      </button>
    </div>
  );
}
