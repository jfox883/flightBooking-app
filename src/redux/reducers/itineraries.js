import {
    GET_LOCATIONS_START,
    GET_LOCATIONS_SUCCESS,
    GET_LOCATIONS_ERROR
} from "../../constants/actionTypes";

export default function itineraries(state, action) {
    switch (action.type) {
        case GET_LOCATIONS_START:
            return {...state}
        case GET_LOCATIONS_SUCCESS:
            return {...state, places: action.results}
        case GET_LOCATIONS_ERROR:
            return {...state, places: null, error: action.error}
        default:
            return {}
    }
}
