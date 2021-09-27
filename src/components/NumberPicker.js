import React from 'react'
import { FormControl, Select, Stack, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const PICKER_CHANGE = 'PICKER_CHANGE'
const PICKER_TOUCHED = 'PICKER_TOUCHED'

const pickerReducer = (state,action) => {
    switch (action.type) {
        case PICKER_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case PICKER_TOUCHED:
            return {
                ...state,
                touched: true
            }
        default:
            return state
    }
}   

const NumberPicker = (props) => {
    const numbersOfItems = props.items || 10
    const arrayNumbers = React.useMemo(() => getArray(numbersOfItems), [numbersOfItems] )
    const [pickedValue, setPickedValue] = React.useState(0)

    const [pickerState, pickerDispatch] = React.useReducer(pickerReducer, {
        value: '',
        isValid: props.initilValid || false,
        touched: false
    })

    const { onInputChange = () => {}, id } = props

    React.useEffect(() => {
        onInputChange(id, pickerState.value, pickerState.isValid)
    },[pickerState, onInputChange, id])

    const handlePickerChange = (value) => {
        let isValid = true

        pickerDispatch({
            type: PICKER_CHANGE,
            value,
            isValid
        })
    }

    return (
        <FormControl isRequired={props.isRequired}>
            <Stack>
                <Select
                    placeholder={props.placeHolder}
                    _selectedItem={{
                        endIcon: <Icon as={Ionicons} name='checkmark' size='sm' ml={1} />
                    }}
                    onValueChange={handlePickerChange}
                    {...props}
                >
                    {arrayNumbers.map((x, i) => (
                        <Select.Item label={x.toString()} value={x} key={i}/>
                    ))}
                </Select>
                <FormControl.ErrorMessage>Is required</FormControl.ErrorMessage>
            </Stack>
        </FormControl>
    )
}

const getArray = (numbersOfItems) => {
    let array = []
    for(let i = 1; i <= numbersOfItems; i++ ) {
        array.push(i)
    }
    return array
}

export default NumberPicker