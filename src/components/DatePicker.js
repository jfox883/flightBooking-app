import React from 'react'
import { FormControl, Input, Stack, Icon, Text, Button, HStack, Box, Spacer } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from 'moment';

const PICKER_CHANGE = 'PICKER_CHANGE'
const PICKER_TOUCHED = 'PICKER_TOUCHED'

const pickerReducer = (state, action) => {
    switch(action.type){
        default:
            return state
        case PICKER_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
            }
        case PICKER_TOUCHED:
            return {
                ...state,
                touched: true
            }
    }
}

const DatePicker = (props) => {
    const [date, setDate] = React.useState(new Date())
    const [showPicker, setShowPicker] = React.useState(false)

    const [pickerState, pickerDispatch] = React.useReducer(pickerReducer, {
        value: '',
        isValid: props.initialValid || false,
        touched: false
    })

    const { onInputChange = () => {}, id } = props

    React.useEffect(() => {
        if(pickerState.touched) {
            onInputChange(id, pickerState.value, pickerState.isValid)
        }
    },[pickerState, onInputChange, id])

    const getStringDate = (date) => {
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if(month < 10) return `${day}/0${month}/${year}`
        return `${day}/${month}/${year}`
    }

    const handleDateChange = (event, selectedDate) => {
        setShowPicker(!showPicker)
        if(event.type === 'set') {
            let isValid = true
            let today = new Date().setHours(0,0,0,0)
            const currentDate = selectedDate || date
            const pickedDateString = moment(currentDate).format('YYYY-MM-DD')
            if(currentDate < today) isValid = false
            setDate(currentDate)

            pickerDispatch({
                type: PICKER_CHANGE,
                value: pickedDateString,
                isValid 
            })
        }
        pickerDispatch({ type: PICKER_TOUCHED })
    }

    return (
        <FormControl isRequired={props.isRequired} isInvalid={!pickerState.isValid && pickerState.touched && props.isRequired}>
            <Stack>
                <FormControl.Label>{props.label}</FormControl.Label>
                <Button 
                    variant='outline' 
                    colorScheme='gray' 
                    justifyContent='flex-start'
                    onPress={() => setShowPicker(!showPicker)} 
                    leftIcon={<Icon as={Ionicons} name='calendar' color='black' size='sm' ml={1}/>}
                >
                    <Input value={pickerState.value} {...props} isReadOnly variant='unstyled' height={9}/>
                </Button>
                {showPicker && (
                    <DateTimePicker 
                        value={date}
                        mode='date'
                        display='default'
                        onChange={handleDateChange}
                        {...props}
                    />
                )}
                <FormControl.ErrorMessage>The date is invalid</FormControl.ErrorMessage>
            </Stack>
        </FormControl>
    )
}

export default DatePicker