import {
    GET_RECIPES_BY_NAME, 
    GET_ALL_RECIPES, 
    GET_RECIPE_DETAIL, 
    CREATE_RECIPE, 
    FILTER_BY_DIET, 
    ALPHABETICALLY,
    ORDER_HEALTH_SCORE,
    GET_DIET_TYPES,
    CLEARDETAILS,
    DELETERECIPE,
    EDIT_RECIPE,
    SHOW
} from "./actions";

let initialState = {
    recipesByName: [],
    recipes: [],
    recipeDetail: {},
    diets: [],
    recipesAll: [],
    hide: false
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                recipesAll: action.payload
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
            }
        case FILTER_BY_DIET:
            let dietsfilter = action.payload === 'none' ? state.recipesAll : state.recipesAll.filter(r => {
                for (let i = 0; i < r.dietTypes.length; i++) {
                    if(r.dietTypes[i].name === action.payload) return true
                }
            })
            return {
                ...state,
                recipes: dietsfilter,
                recipesByName: dietsfilter
            }
        case ALPHABETICALLY:
            const orderBy = (value) => {
                if(value === 'A-Z'){
                    const a_Z = state.recipes.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                        else return -1})
                    return a_Z
                    }
                else if(value === 'Z-A'){
                    const z_A = state.recipes.sort((a, b) => {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
                        else return -1})
                    return z_A
                    }
                else return state.recipesAll
                }
            return {
                ...state,
                recipes: orderBy(action.payload)
            }
        case GET_DIET_TYPES:
            return {
                ...state,
                diets: action.payload
            }
        case ORDER_HEALTH_SCORE:
            const orderhealthScore = (value) => {
                if(value === 'highest'){
                    const highest = state.recipes.sort((a, b) => b.healthScore - a.healthScore)
                    return highest
                    }
                else if(value === 'lowest'){
                    const lowest = state.recipes.sort((a, b) => a.healthScore - b.healthScore)
                    return lowest
                    }
                else return state.recipesAll
                }
            return {
                ...state,
                recipes: orderhealthScore(action.payload)
            }
        case CLEARDETAILS:
            return {
                ...state,
                recipeDetail: {},
                recipesByName: []
            }
        case DELETERECIPE:
            return {
                ...state
            }
        case EDIT_RECIPE:
            return {
                ...state,
            }
        case SHOW:
            return {
                ...state,
                hide: action.payload
            }
        default: return state
    }
}