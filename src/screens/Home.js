import React from 'react'
import { Dimensions } from "react-native";
import { NativeBaseProvider, Box, Center, Avatar, VStack, HStack, Button } from "native-base";

import { getItem } from "../utils/SecureStorage";

import SearchInput from "../components/SearchInput";
import DatePicker from '../components/DatePicker';
import NumberPicker from '../components/NumberPicker';

const { width, height } = Dimensions.get('window')

const Home = ({navigation}) => {
    const [userData, setUserData] = React.useState(null)

    const [originPlace, setOriginPlace] = React.useState('')
    const [destinationPlace, setDestinationPlace] = React.useState('')
    const [outboundDate, setOutboundDate] = React.useState('')
    const [inboundDate, setInboundDate] = React.useState('')
    const [adults, setAdults] = React.useState(0)
    const [children, setChildren] = React.useState(0)

    const handleOriginDateChange = (value) => setOriginPlace(value)
    const handleDestinationDateChange = (value) => setDestinationPlace(value)
    const handleOutboundDateChange = (value) => setOutboundDate(value)
    const handleInboundDateChange = (value) => setInboundDate(value)
    const handleAdultsChange = (value) => setAdults(value)
    const handleChildrenChange = (value) => setChildren(value)

    React.useEffect(() => {
        (async () => {
            let userResult = await getItem('userInfo')
            if(userResult) setUserData(JSON.parse(userResult))
        })()
    },[])

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => null,
            headerRight: () => (
                <NativeBaseProvider>
                    <Box flex={1} justifyContent='center' pr={3}>
                        <Avatar size='sm' source={{uri: userData && userData.photoUrl}}/>
                    </Box>
                </NativeBaseProvider>
            )
        })
    },[navigation, userData])

    return (
        <NativeBaseProvider>
            <Center flex={1} safeArea>
                <VStack space={4} width={width*0.9}>
                    <SearchInput 
                        label='Origen'
                        iconName='home'
                        value={originPlace}
                        onChangeText={handleOriginDateChange}
                        isRequired
                    />
                    <SearchInput 
                        label='Destino'
                        iconName='airplane'
                        value={destinationPlace}
                        onChangeText={handleDestinationDateChange}
                        isRequired
                    />
                    <HStack space={1} width={width*0.45}>
                        <DatePicker 
                            label='Ida'
                            iconName='calendar'
                            onChangeText={handleOutboundDateChange}
                            isRequired
                        />
                        <DatePicker 
                            label='Regreso'
                            iconName='calendar'
                            onChangeText={handleInboundDateChange}
                        />
                    </HStack>
                    <HStack space={2} width={width*0.50} alignItems='center'>
                        <Box width={width*0.45}>
                            <NumberPicker 
                                label='Adultos' 
                                items={9} 
                                isRequired
                                selectedValue={adults}
                                onValueChange={handleAdultsChange}
                            />
                            <NumberPicker 
                                label='Niños' 
                                items={9} 
                                selectedValue={children}
                                onValueChange={handleChildrenChange}
                            />
                        </Box>
                        <Button top='4' width='90%' height={60}>Buscar</Button>
                    </HStack>
                </VStack>
            </Center>
        </NativeBaseProvider>
    )
}

export default Home
