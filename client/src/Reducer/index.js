import { GET_ALL_DOGS, GET_NAME_DOG, GET_TEMPERAMENT, FILTER_BY_TEMPERAMENTS, FILTER_CREATED, ORDER_BY_NAME,ORDER_BY_WEIGHT,GET_DETAILS,CREATE_DOG } from "../Actions"

const initialState = {
    dogs: [],
   /*  allDogs: [], */
    temperaments:[],
    detail:[],
    filterDogs: []
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload,
                filterDogs: action.payload
            }
        case GET_NAME_DOG:
            return {
                ...state,
                dogs: action.payload
            }
        case GET_TEMPERAMENT:
            return {
                ...state,
                temperaments: action.payload
            }

            case FILTER_BY_TEMPERAMENTS:
                const allDogs = state.filterDogs;
                const temperamentFilter = 
                action.payload === 'All' ? allDogs
                : allDogs.filter((e)=>
                e.temperament?.includes(action.payload))

                return {
                    ...state,
                    dogs: temperamentFilter,
                }

        case FILTER_CREATED:
            const allDogsCreated = state.filterDogs
            const createdFilter = action.payload === 'created' ?
                allDogsCreated.filter((e) => e.createdInDataBase)
                : action.payload === 'api' ?
                    allDogsCreated.filter((e) => !e.createdInDataBase)
                    : action.payload === 'all' &&
                    allDogsCreated
            return {
                ...state,
                dogs: createdFilter,

            }                
          case ORDER_BY_NAME:
            let ordenado = action.payload === "az" ? state.dogs.sort(function (a, b) {
                 if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                } 
                return 0
                /* return a.name - b.name; */
            }) :
                state.dogs.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                dogs: ordenado
            } 
            case ORDER_BY_WEIGHT:
                let sortedArrWeight = action.payload === 'desc' ?
                state.dogs.sort((a, b) => {
                    return b.minweight - a.minweight
                }) :
                state.dogs.sort((a, b) => {
                    return a.minweight - b.minweight
                })
                return{
                    ...state,
                    dogs: sortedArrWeight
                }
                case GET_DETAILS:
            return{
                ...state,
                detail: action.payload
            }
            case CREATE_DOG:
                return{
                    ...state,
                }
        default:
            return state;
    }
}


