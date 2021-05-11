const AppReducer = (state, action) => {
    switch (action.type) {
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
        case 'CLOSE_DIALOG':
            return {
                ...state,
                modalOpen: false
            }
        case 'OPEN_DIALOG':
            return {
                ...state,
                modalOpen: true
            }
        case 'OPEN_RECIPE_LIST':
            return {
                ...state,
                recipeListOpen: true
            }
        case 'CLOSE_RECIPE_LIST':
            return {
                ...state,
                recipeListOpen: false
            }
        default:
            return state;
    }
}


export default AppReducer;