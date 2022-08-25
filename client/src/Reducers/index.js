import {
    GET_RECIPES_BY_NAME, 
    GET_ALL_RECIPES, 
    GET_RECIPE_DETAIL, 
    CREATE_RECIPE, 
    FILTER_BY_DIET, 
    ALPHABETICALLY,
    ORDER_HEALTH_SCORE,
    GET_DIET_TYPES 
} from "./actions";

let initialState = {
    recipesByName: [],
    recipes: [],
    recipeDetail: {},
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
            const recipes = state.recipes
            let dietsfilter = action.payload === 'none' ? recipes : recipes.filter(r => r.diets.includes(action.payload))
            return {
                ...state,
                recipes: dietsfilter
            }
        case ALPHABETICALLY:
            const order = action.payload === 'A-Z' 
                ? state.recipes.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    else return -1
                    })
                : state.recipes.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
                    else return -1
                    })
            return {
                ...state,
                recipes: order
            }
        case GET_DIET_TYPES:
            return {
                ...state,
                diets: action.payload
            }
        case ORDER_HEALTH_SCORE:
            const orderScore = action.payload === 'highest' 
                ? state.recipes.sort((a, b) => {
                    if ((a.healthScore - b.healthScore) < 0) return 1
                    else return -1                           
                    }) 
                : state.recipes.sort((a, b) => {                        
                    if ((b.healthScore - a.healthScore) < 0) return 1
                    else return -1
                    })
            return {
                ...state,
                recipes: orderScore
            }
        default: return state
    }
}