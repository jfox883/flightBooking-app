import React from 'react'
import { NativeBaseProvider, Center, Spinner } from "native-base";

import { getItem } from "../utils/SecureStorage";

export default function Loading({navigation}) {
    React.useEffect(() => {
        (async () => {
            const token = await getItem('accessToken')
            token
                ? navigation.navigate('Home')
                : navigation.navigate('Auth')
        })()
    },[])

    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Spinner color='indigo.500' size={120}/>
            </Center>
        </NativeBaseProvider>
    )
}
