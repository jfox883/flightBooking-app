import { takeLatest, call, put } from "redux-saga/effects";
import { RAPIDAPI_BASEURL } from '@env'
import {
    GET_LOCATIONS_START,
    GET_LOCATIONS_SUCCESS,
    GET_LOCATIONS_ERROR,
    GET_ITINERARIES_START,
    GET_ITINERARIES_SUCCESS,
    GET_ITINERARIES_ERROR
} from "../../constants/actionTypes";

import apiCall from '../api'

const baseURL = RAPIDAPI_BASEURL
const country = 'AR'
const currency = 'USD'
const locale = 'en-US'

export function* getLocations({ payload }) {
    try {
        const url = `${baseURL}/autosuggest/v1.0/${country}/${currency}/${locale}/?query=${payload.query}`
        const method = 'GET'

        const results = yield call(apiCall, method, url)
        yield put({ type: GET_LOCATIONS_SUCCESS, results: results.data.Places})
    } catch (error) {
        yield put({type: GET_LOCATIONS_ERROR, error})
    }
}

export function* getItineraries({ payload: { 
    originPlace,
    destinationPlace,
    outboundDate,
    inboundDate,
}}) {
    try {
        const url = `${baseURL}/browseroutes/v1.0/${country}/${currency}/${locale}/${originPlace}/${destinationPlace}/${outboundDate}/?inboundpartialdate=${inboundDate}`
        const method = 'GET'

        const results = yield call(apiCall, method, url)
        yield put({ type: GET_ITINERARIES_SUCCESS, results: results.data })
    } catch (error) {
        yield put({ type: GET_ITINERARIES_ERROR, error })
    }
}

export default function* itineraries() {
    yield takeLatest(GET_LOCATIONS_START, getLocations);
    yield takeLatest(GET_ITINERARIES_START, getItineraries);
}
