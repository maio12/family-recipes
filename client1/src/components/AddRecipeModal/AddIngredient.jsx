import React, { useCallback, useContext, useReducer } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { CustomInput } from "../UI/Input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

export default function AddIngredient() {
  const { addIngredient } = useContext(GlobalContext);

  const submitForm = (e) => {
    e.preventDefault();

    const ingredient = {
      _id: Math.floor(Math.random() * 1000000),
      ingredientName: formState.inputValues.ingredientName,
      ingredientQty: Number(formState.inputValues.ingredientQty),
    };

    addIngredient(ingredient);
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      ingredientName: "",
      ingredientQty: 0,
    },
    inputValidities: {
      ingredientName: false,
      ingredientQty: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <div>
      <div className="field__recipe--name">
        <CustomInput
          id="ingredientName"
          label="Ingredient name"
          errorText="Please enter an ingredient"
          onInputChange={inputChangeHandler}
          initialValue={""}
          initiallyValid={false}
          required
          type={"text"}
          placeholder="Enter Ingredient Name..."
        />
        {/* <label className="form__label" htmlFor="">
          Ingredient name
        </label>
        <input
          className="form__input"
          type="text"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          placeholder="Enter Ingredient Name..."
        /> */}
      </div>
      <div className="field__recipe--genre">
        <CustomInput
          id="ingredientQty"
          label="Ingredient Qty"
          errorText="Please enter an ingredient"
          onInputChange={inputChangeHandler}
          initialValue={0}
          initiallyValid={false}
          required
          min={0}
          type={"number"}
          placeholder="Enter Ingredient quantity (g / ml)..."
        />

        {/* <label className="form__label" htmlFor="">
          Ingredient Qty
        </label>
        <input
          className="form__input"
          type="number"
          value={ingredientQty}
          onChange={(e) => setIngredientQty(parseInt(e.target.value, 10))}
        /> */}
      </div>
      <button onClick={submitForm} className="add-ingredient__button">
        Add ingredient
      </button>
    </div>
  );
}
