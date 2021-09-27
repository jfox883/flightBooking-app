import { GET_LOCATIONS_START } from '../../constants/actionTypes'

export const getLocations = payload => ({
    type: GET_LOCATIONS_START,
    payload
})