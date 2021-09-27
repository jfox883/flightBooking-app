import React from 'react'
import { Dimensions } from "react-native";
import { NativeBaseProvider, Box, Center, Avatar, VStack, HStack, Button, Text } from "native-base";

import { getItem } from "../utils/SecureStorage";

import SearchInput from "../components/SearchInput";
import DatePicker from '../components/DatePicker';
import NumberPicker from '../components/NumberPicker';

const { width } = Dimensions.get('window')

const FORM_UPDATE = 'FORM_UPDATE'
const FORM_RESET = 'FORM_RESET'

const INITIAL_STATE = {
    inputValues:{
        originPlace: '',
        destinationPlace: '',
        depart: '',
        return: '',
        adults: 0,
        children: 0,
    },
    inputValidities: {
        originPlace: false,
        destinationPlace: false,
        depart: false,
        return: true,
        adults: false,
        children: true,
    },
    formIsValid: false,
}

const formReducer = (state, action) => {
    switch(action.type) {
        default:
            return state
        case FORM_UPDATE:
            const updatedValues = {
                ...state.inputValues,
                [action.input]: action.value,
            }
            
            const updatedValidities = {
                ...state.inputValidities,
                [action.input]: action.isValid,
            }
    
            let updatedFormIsValid = true
            for(const key in updatedValidities) {
                updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
            }
    
            return {
                formIsValid: updatedFormIsValid,
                inputValidities: updatedValidities,
                inputValues: updatedValues
            }
        case FORM_RESET:
            return INITIAL_STATE
    }
}

const Home = ({navigation}) => {
    const [userData, setUserData] = React.useState(null)
    const [formState, formDispatch] = React.useReducer(formReducer, INITIAL_STATE)
    const [resetView, setResetView] = React.useState(0)

    React.useEffect(() => {
        (async () => {
            let userResult = await getItem('userInfo')
            if(userResult) setUserData(JSON.parse(userResult))
        })()
    },[])

    const handleValueChange = React.useCallback((inputIdentifier, inputValue, inputValidity) => {
        formDispatch({
            type: FORM_UPDATE,
            input: inputIdentifier,
            value: inputValue,
            isValid: inputValidity
        })
    },[formDispatch])

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

    const handleSearchPress = () => {
        console.log(formState)
    }

    const handleReset = () => setResetView(resetView => resetView+1)

    return (
        <NativeBaseProvider key={resetView}>
            <Center flex={1} bg='white' safeArea>
                <VStack space={4} width={width*0.9}>
                    <SearchInput 
                        id='originPlace'
                        label='From where? '
                        iconName='home'
                        onInputChange={handleValueChange}
                        isRequired
                    />
                    <SearchInput 
                        id='destinationPlace'
                        label='To where? '
                        iconName='airplane'
                        onInputChange={handleValueChange}
                        isRequired
                    />
                    <HStack space={1} width={width*0.45}>
                        <DatePicker 
                            id='depart'
                            label='Depart Date '
                            onInputChange={handleValueChange}
                            isRequired
                        />
                        <DatePicker
                            id='return'
                            label='Return Date'
                            onInputChange={handleValueChange}
                        />
                    </HStack>
                    <HStack space={2} alignItems='center'>
                        <VStack space={2} width={width*0.45}>
                            <NumberPicker 
                                id='adults'
                                placeHolder='Adults'
                                items={8} 
                                onInputChange={handleValueChange}
                                isRequired
                            />
                            <NumberPicker 
                                id='children'
                                placeHolder='Children'
                                onInputChange={handleValueChange}
                                initialValid={true}
                                items={8} 
                            />
                        </VStack>
                        <VStack space={2} width={width*0.45} alignItems='center'>
                            <Button 
                                height={60}     
                                width={width*0.40} 
                                onPress={() => handleSearchPress()}
                                isDisabled={!formState.formIsValid}
                            >
                                Search
                            </Button>
                            <Button 
                                height={45}
                                width={width*0.30}
                                colorScheme='danger'
                                onPress={handleReset}
                            >
                                Reset
                            </Button>

                        </VStack>
                    </HStack>
                </VStack>
            </Center>
        </NativeBaseProvider>
    )
}

export default Home
