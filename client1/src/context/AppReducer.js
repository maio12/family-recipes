const AppReducer = (state, action) => {
  switch (action.type) {
    case "DELETE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        ),
      };
    case "ADD_INGREDIENT":
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case "CLEAN_INGREDIENTS":
      return {
        ...state,
        ingredients: [],
      };
    case "CLOSE_DIALOG":
      return {
        ...state,
        modalOpen: false,
      };
    case "OPEN_DIALOG":
      return {
        ...state,
        modalOpen: true,
      };
    case "CLOSE_LOGIN_SIGNUP_DIALOG":
      return {
        ...state,
        modalLoginOpen: false,
        modalSignupOpen: false,
      };
    case "OPEN_LOGIN_DIALOG":
      return {
        ...state,
        modalLoginOpen: true,
      };
    case "OPEN_SIGNUP_DIALOG":
      return {
        ...state,
        modalSignupOpen: true,
      };
    case "OPEN_RECIPE_LIST":
      return {
        ...state,
        recipeListOpen: action.payload,
      };
    case "CLOSE_RECIPE_LIST":
      return {
        ...state,
        recipeListOpen: "",
      };
    case "SET_RECIPES_PAGE":
      return {
        ...state,
        recipePage: action.payload,
      };
    case "SET_RECIPES":
      return {
        ...state,
        recipes: action.payload.recipes,
        resettable: action.payload.resettable,
      };
    default:
      return state;
  }
};

export default AppReducer;
