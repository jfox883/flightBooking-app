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
    adults,
    children
}}) {
    try {
        const urlGetToken = `${baseURL}/pricing/v1.0/`
        const method = 'POST'
        const body = new URLSearchParams({
            originPlace,
            destinationPlace,
            outboundDate,
            inboundDate,
            adults,
            children,
            country,
            currency,
            locale
        })
        const headers = {
            'content-type': 'application/x-www-form-urlencoded' 
        }
        
        const sessionKeyResult = yield call(apiCall, method, urlGetToken, body, headers)
        const headerLocation = sessionKeyResult.headers.location
        if(headerLocation) {
            const sessionToken = headerLocation.substring(headerLocation.lastIndexOf('/')+1, headerLocation.length)
            
            const urlGetItineraries = `${baseURL}/pricing/uk2/v1.0/${sessionToken}?pageIndex=0&pageSize=20`
            const method = 'GET'
            const itineraries = yield call(apiCall, method, urlGetItineraries)
            
            (itineraries.data) 
                ? yield put({ type: GET_ITINERARIES_SUCCESS, itineraries: itineraries.data})
                : yield put({ type: GET_ITINERARIES_ERROR, error: 'No results found'})
        }
    } catch (error) {
        yield put({ type: GET_ITINERARIES_ERROR, error })
    }
}

export default function* itineraries() {
    yield takeLatest(GET_LOCATIONS_START, getLocations);
    yield takeLatest(GET_ITINERARIES_START, getItineraries);
}
