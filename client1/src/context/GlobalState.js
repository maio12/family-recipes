import React, { createContext, useReducer, useState } from "react";
import { AUTH_TOKEN } from "../constants/constants";
import AppReducer from "./AppReducer";

//initial state
const initialState = {
  ingredients: [],
  modalOpen: false,
  recipeListOpen: "",
  isAuthenticated: false,
  modalLoginOpen: false,
  modalSignupOpen: false,
  recipePage: 1,
  resettable: false,
  recipes: [],
  login: () => {},
};

//Create global context:
export const GlobalContext = createContext(initialState);

//Provider component:
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [isAuthenticated, setAuthenticated] = useState(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return token !== null;
  });

  //Actions
  const deleteIngredient = (id) => {
    dispatch({
      type: "DELETE_INGREDIENT",
      payload: id,
    });
  };

  const cleanIngredients = () => {
    dispatch({
      type: "CLEAN_INGREDIENTS",
    });
  };

  const addIngredient = (ingredient) => {
    dispatch({
      type: "ADD_INGREDIENT",
      payload: ingredient,
    });
  };

  const closeDialog = () => {
    dispatch({
      type: "CLOSE_DIALOG",
    });
  };

  const openDialog = () => {
    dispatch({
      type: "OPEN_DIALOG",
    });
  };

  const openLoginDialog = () => {
    dispatch({
      type: "OPEN_LOGIN_DIALOG",
    });
  };

  const closeLoginSignupDialog = () => {
    dispatch({
      type: "CLOSE_LOGIN_SIGNUP_DIALOG",
    });
  };

  const openSignupDialog = () => {
    dispatch({
      type: "OPEN_SIGNUP_DIALOG",
    });
  };

  const openRecipeList = (recipeId) => {
    dispatch({
      type: "OPEN_RECIPE_LIST",
      payload: recipeId,
    });
  };

  const closeRecipeList = () => {
    dispatch({
      type: "CLOSE_RECIPE_LIST",
    });
  };

  const setRecipesPage = (pageNum) => {
    dispatch({
      type: "SET_RECIPES_PAGE",
      payload: pageNum,
    });
  };

  const setRecipes = (recipes, resettable = false) => {
    dispatch({
      type: "SET_RECIPES",
      payload: { recipes, resettable },
    });
  };

  const loginProva = () => {
    setAuthenticated(true);
  };

  const logoutProva = () => {
    setAuthenticated(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        ingredients: state.ingredients,
        modalOpen: state.modalOpen,
        recipeListOpen: state.recipeListOpen,
        token: state.token,
        modalLoginOpen: state.modalLoginOpen,
        modalSignupOpen: state.modalSignupOpen,
        isAuthenticated,
        recipePage: state.recipePage,
        resettable: state.resettable,
        recipes: state.recipes,
        deleteIngredient,
        addIngredient,
        cleanIngredients,
        closeDialog,
        openDialog,
        openRecipeList,
        closeRecipeList,
        loginProva,
        logoutProva,
        openLoginDialog,
        openSignupDialog,
        closeLoginSignupDialog,
        setRecipesPage,
        setRecipes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
