import { GET_LOCATIONS_START, GET_ITINERARIES_START } from '../../constants/actionTypes'

export const getLocations = payload => ({
    type: GET_LOCATIONS_START,
    payload
})

export const getItineraries = payload => ({
    type: GET_ITINERARIES_START,
    payload
})