import axios from "axios"
import { RAPIDAPI_HOST, RAPIDAPI_KEY } from "@env";

export default (baseURL, method, url, data, headers) => 
    axios({
        baseURL,
        method,
        url,
        data,
        headers: {
            "x-rapidapi-host": RAPIDAPI_HOST,
            "x-rapidapi-key": RAPIDAPI_KEY,
            ...headers
        }
    })

