import { 
    GET_LOCATIONS_START, 
    GET_LOCATIONS_SUCCESS, 
    GET_LOCATIONS_ERROR 
} from "../../constants/actionTypes";

export default function itineraries(state, action) {
    switch (action.type) {
        case GET_LOCATIONS_START:
            return {}
        case GET_LOCATIONS_SUCCESS:
            return {}
        case GET_LOCATIONS_ERROR:
            return {}
        default:
            return {}
    }
}