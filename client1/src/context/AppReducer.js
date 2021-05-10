const AppReducer = (state, action) => {
  switch(action.type) {
    case 'DELETE_INGREDIENT':
      return {
        ...state,
        ingredients: state.ingredients.filter(ingredient => ingredient.id !== action.payload)
      }
      case 'ADD_INGREDIENT':
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload]
        }
      case 'CLEAN_INGREDIENTS':
        return {
          ...state,
          ingredients: []
        }
    default:
      return state;
  }
}


export default AppReducer;