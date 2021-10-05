import React from 'react'
import { FormControl, Input, Stack, Icon } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import FixedList from './FixedList'
import { getLocations } from "../redux/actions/itineraries";

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
    const dispatch = useDispatch()
    const places = useSelector(state => state.itineraries.places)
    const [showFixedList, setShowFixedList] = React.useState(false)
    const [text, setText] = React.useState('')

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

    const handleChangeText = (value) => setText(value)

    const handleChangeInput = (place) => {
      let isValid = true

      inputDispatch({
          type: INPUT_CHANGE,
          value: place,
          isValid
      })
    }

    const handleBlurInput = () => inputDispatch({ type: INPUT_BLUR})

    const handleKeyPress = ({ nativeEvent }) => {
      console.log(text)
        if(text.length > 3) {
            dispatch(getLocations({query: text}))
            setShowFixedList(true)
        }
    }

    const handlePlaceSelected = (place) => {
      handleChangeInput(place)
      setText(place.PlaceName)
      setShowFixedList(false)
    }

    return (
        <FormControl isRequired={props.isRequired} isInvalid={!inputState.isValid && inputState.touched}>
            <Stack>
              <FormControl.Label>{props.label}</FormControl.Label>
              <Input
                InputLeftElement={
                  <Icon as={Ionicons} name={props.iconName} size='sm' ml={1} />
                }
                value={text}
                onKeyPress={handleKeyPress}
                onChangeText={handleChangeText}
                onBlur={handleBlurInput}
                {...props}
                />
              <FormControl.ErrorMessage>It can't be empty</FormControl.ErrorMessage>
            </Stack>
            {showFixedList && <FixedList places={places} onItemPress={handlePlaceSelected} />}
        </FormControl>
    )
}

export default SearchInput
