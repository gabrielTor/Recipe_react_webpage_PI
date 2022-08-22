import {
    GET_RECIPES_BY_NAME, 
    GET_ALL_RECIPES, 
    GET_RECIPE_DETAIL, 
    CREATE_RECIPE, 
    FILTER_BY_DIET, 
    ORDER_ALPHABETICALLY,
    ORDER_HEALTH_SCORE,
    GET_DIET_TYPES 
} from "./actions";

let initialState = {
    recipesByName: [],
    recipes: [],
    recipeDetail: [],
    diets: []
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                recipesByName: action.payload
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
                ...state,
                diets: action.payload
            }
        case ORDER_ALPHABETICALLY:
            return {
                ...state,
                recipes: state.recipes.sort()
            }
        case ORDER_HEALTH_SCORE:
            return {
                ...state,
                recipes: state.recipes.sort((a,b)=> a.healthScore - b.healthScore)
            }
        case GET_DIET_TYPES:
            return {
                ...state,
                diets: action.payload
            }
        default: return state
    }
}