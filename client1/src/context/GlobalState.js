import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//initial state
const initialState = {
  ingredients: []
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

  return (<GlobalContext.Provider value={{
    ingredients: state.ingredients,
    deleteIngredient,
    addIngredient,
    cleanIngredients
  }}>
    {children}
  </GlobalContext.Provider>)
}

