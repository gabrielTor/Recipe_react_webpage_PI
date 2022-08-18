import { 
    GET_ALL_RECIPES, 
    GET_RECIPE_DETAIL, 
    CREATE_RECIPE, 
    FILTER_BY_DIET, 
    ORDER_ALPHABETICALLY,
    ORDER_HEALTH_SCORE 
} from "./actions";

let initialState = {
    recipes: [],
    recipeDetail: {}
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload
            }
        case CREATE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.concat(action.peyload)
            }
        case FILTER_BY_DIET:
            return {

            }
        case ORDER_ALPHABETICALLY:
            return {
                ...state,
                recipes: state.recipes.sort()
            }
        default: return state
    }
}