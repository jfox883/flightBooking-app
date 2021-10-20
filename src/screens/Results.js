import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { NativeBaseProvider, Center, Text } from "native-base";

import Itinerary from '../components/Itinerary';

import { getItineraries } from "../redux/actions/itineraries";

const Results = ({route}) => {
    const dispatch = useDispatch()
    const itineraries = useSelector(state => state.itineraries.itineraries)
    const [hasFetched, setHasFetched] = React.useState(false)
    const {
        originPlace,
        destinationPlace,
        outboundDate,
        inboundDate,
    } = route.params

    React.useEffect(() => {
        if(!hasFetched) {
            dispatch(getItineraries({
                originPlace,
                destinationPlace,
                outboundDate,
                inboundDate,
            }))
            setHasFetched(true)
        }
    },[hasFetched])

    console.log(itineraries)
    return (
        <NativeBaseProvider>
            <Center flex={1} px='5'>
                
            </Center>
        </NativeBaseProvider>
    )
}

export default Results
