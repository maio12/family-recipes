import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//initial state
const initialState = {
  ingredients: [],
  modalOpen: false,
  recipeListOpen: false,
}

//Create global context:
export const GlobalContext = createContext(initialState);

//Provider component:
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

//Actions
const deleteIngredient = (id) => {
  dispatch({
    type: 'DELETE_INGREDIENT',
    payload: id
  })
}

const cleanIngredients = () => {
  dispatch({
    type: 'CLEAN_INGREDIENTS'
  })
}

const addIngredient = (ingredient) => {
  dispatch({
    type: 'ADD_INGREDIENT',
    payload: ingredient
  })
}

const closeDialog = () => {
  dispatch({
    type: 'CLOSE_DIALOG',
  })
}

const openDialog = () => {
  dispatch({
    type: 'OPEN_DIALOG',
  })
}

const openRecipeList = () => {
  dispatch({
    type: 'OPEN_RECIPE_LIST',
  })
}

const closeRecipeList = () => {
  dispatch({
    type: 'CLOSE_RECIPE_LIST',
  })
}

  return (<GlobalContext.Provider value={{
    ingredients: state.ingredients,
    modalOpen: state.modalOpen,
    recipeListOpen: state.recipeListOpen,
    deleteIngredient,
    addIngredient,
    cleanIngredients,
    closeDialog,
    openDialog,
    openRecipeList,
    closeRecipeList,
  }}>
    {children}
  </GlobalContext.Provider>)
}

