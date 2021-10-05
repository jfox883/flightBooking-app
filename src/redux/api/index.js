import axios from "axios"
import { RAPIDAPI_HOST, RAPIDAPI_KEY } from "@env";

export default (method, url, data, headers) =>
    axios({
        method,
        url,
        data,
        headers: {
            "x-rapidapi-host": RAPIDAPI_HOST,
            "x-rapidapi-key": RAPIDAPI_KEY,
            ...headers
        }
    })
