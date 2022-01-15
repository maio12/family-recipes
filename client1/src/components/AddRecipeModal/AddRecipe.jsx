import React, { useContext, useReducer, useCallback } from "react";
import { GlobalContext } from "../../context/GlobalState";
import AddIngredient from "./AddIngredient";
import { useMutation } from "@apollo/client";

import { addRecipeMutation, getRecipesQuery } from "../../queries/queries";

import { CustomInput } from "../UI/Input";
import { CustomSelect } from "../UI/Select";

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

export const AddRecipe = () => {
  const [addRecipe] = useMutation(addRecipeMutation);
  const { ingredients, cleanIngredients, closeDialog } =
    useContext(GlobalContext);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      genre: "",
      preparation: "",
      prepTime: 0,
      cookTime: 0,
      ingredientsFor: 0,
      veggie: false,
    },
    inputValidities: {
      name: false,
      genre: false,
      preparation: false,
      prepTime: false,
      cookTime: false,
      ingredientsFor: false,
      veggie: false,
    },
    formIsValid: false,
  });

  const cleanFieldsAndIngredientsState = () => {
    cleanIngredients();
  };

  const submitForm = (e) => {
    e.preventDefault();
    addRecipe({
      variables: {
        name: formState.inputValues.name,
        genre: formState.inputValues.genre,
        ingredients: ingredients,
        preparation: formState.inputValues.preparation,
        prepTime: Number(formState.inputValues.prepTime),
        cookTime: Number(formState.inputValues.cookTime),
        ingredientsFor: Number(formState.inputValues.ingredientsFor),
        veggie: formState.inputValues.veggie === "true" ? true : false,
      },
      awaitRefetchQueries: true,
      refetchQueries: () => [getRecipesQuery, "getRecipes"],
    });

    cleanFieldsAndIngredientsState();
    closeDialog();
  };

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

  const selectChangeHandler = useCallback(
    (selectIdentifier, selectValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: selectValue,
        isValid: inputValidity,
        input: selectIdentifier,
      });
    },
    [dispatchFormState]
  );

  const veggieSelectOptions = [
    { value: "false", text: "False", id: 1 },
    { value: "true", text: "True", id: 2 },
  ];

  const genreSelectOptions = [
    { value: "primi", text: "Primi", id: 1 },
    { value: "secondi", text: "Secondi", id: 2 },
    { value: "antipasti", text: "Antipasti", id: 3 },
    { value: "contorni", text: "Contorni", id: 4 },
    { value: "dolci", text: "Dolci", id: 5 },
    { value: "lievitati", text: "Lievitati", id: 6 },
    { value: "unici", text: "Piatti unici", id: 7 },
  ];

  return (
    <form className="add-recipe" action="" onSubmit={submitForm}>
      <div className="field__recipe--name">
        <CustomInput
          id="name"
          label="Recipe name"
          errorText="Please enter a recipe name"
          onInputChange={inputChangeHandler}
          initialValue={""}
          initiallyValid={false}
          required
          type={"text"}
        />
      </div>
      <div className="field__recipe--genre">
        {/* <CustomInput
          id="genre"
          label="Genre"
          errorText="Please select a genre"
          onInputChange={inputChangeHandler}
          initialValue={""}
          initiallyValid={false}
          required
          type={"text"}
        /> */}
        <CustomSelect
          id="genre"
          onSelectChange={selectChangeHandler}
          label="Genre"
          initialValue={"Primi"}
          selectOptions={genreSelectOptions}
          required
          initiallyValid={false}
          errorText="Please select a genre"
        />
      </div>

      <div className="field__recipe--genre">
        <CustomInput
          id="preparation"
          label="Preparation steps"
          errorText="Please enter the preparation steps"
          onInputChange={inputChangeHandler}
          initialValue={""}
          initiallyValid={false}
          required
          type={"text"}
        />
      </div>
      <div className="field__recipe--genre">
        <CustomInput
          id="prepTime"
          label="Prep time"
          errorText="Please enter the prep time"
          onInputChange={inputChangeHandler}
          initialValue={""}
          initiallyValid={false}
          min={0}
          type={"number"}
        />
      </div>
      <div className="field__recipe--genre">
        <CustomInput
          id="cookTime"
          label="Cook time"
          errorText="Please enter the cooking time"
          onInputChange={inputChangeHandler}
          initialValue={""}
          initiallyValid={false}
          min={0}
          type={"number"}
        />
      </div>
      <div className="field__recipe--genre">
        <CustomInput
          id="ingredientsFor"
          label="Ingredients for"
          errorText="Please enter how many people is this recipe for"
          onInputChange={inputChangeHandler}
          initialValue={""}
          initiallyValid={false}
          min={0}
          type={"number"}
        />
      </div>
      <div className="field__recipe--genre">
        <CustomSelect
          id="veggie"
          onSelectChange={selectChangeHandler}
          label="Veggie?"
          initialValue={"false"}
          selectOptions={veggieSelectOptions}
        />
      </div>
      <AddIngredient />
      <button className="form__button" type="submit">
        +
      </button>
    </form>
  );
};
