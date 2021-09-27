import React from 'react'
import { FormControl, Input, Stack, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'

const inputReducer = (state, action) => {
    switch(action.type) {
        default:
            return state
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
    }
}

const SearchInput = (props) => {
    const [inputState, inputDispatch] = React.useReducer(inputReducer, {
        value: '',
        isValid: props.initialValid || false,
        touched: false
    })

    const { onInputChange = () => {}, id } = props

    React.useEffect(() => {
        if(inputState.touched){
            onInputChange(id, inputState.value, inputState.isValid)
        }
    },[inputState, onInputChange, id])

    const handleChangeText = (text) => {
        let isValid = true
        if(text.trim().length < 3) isValid = false

        inputDispatch({
            type: INPUT_CHANGE,
            value: text,
            isValid
        })
    }

    const handleBlurInput = () => inputDispatch({ type: INPUT_BLUR})

    return (
        <FormControl isRequired={props.isRequired} isInvalid={!inputState.isValid && inputState.touched}>
            <Stack>
                <FormControl.Label>{props.label}</FormControl.Label>
                <Input 
                    InputLeftElement={
                        <Icon as={Ionicons} name={props.iconName} size='sm' ml={1} />
                    }
                    onChangeText={handleChangeText}
                    onBlur={handleBlurInput}
                    {...props}
                />
                <FormControl.ErrorMessage>It can't be empty</FormControl.ErrorMessage>
            </Stack>
        </FormControl>
    )
}

export default SearchInput
