import React from 'react'
import { FormControl, Input, Stack, Icon, IconButton, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = (props) => {
    const [date, setDate] = React.useState(new Date())
    const [inputDate, setInputDate] = React.useState('')
    const [showPicker, setShowPicker] = React.useState(false)

    const getStringDate = (date) => {
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if(month < 10) return `${day}/0${month}/${year}`
        return `${day}/${month}/${year}`
    }

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShowPicker(!showPicker)
        setInputDate(getStringDate(currentDate))
        setDate(currentDate)
    }

    return (
        <FormControl isRequired={props.isRequired}>
            <Stack>
                <FormControl.Label>{props.label}</FormControl.Label>
                <Button variant='unstyled' onPress={() =>setShowPicker(!showPicker)}>
                    <Input 
                        InputLeftElement={
                            <IconButton 
                                variant='unstyled'
                                icon={<Icon as={Ionicons} name={props.iconName} size='sm' ml={1} />}
                                
                            />
                        }
                        width='75%'
                        value={inputDate}
                        isDisabled
                        {...props}
                    />
                </Button>
                {showPicker && (
                    <DateTimePicker 
                        value={date}
                        mode='date'
                        display='default'
                        onChange={handleDateChange}
                    />
                )}
                <FormControl.ErrorMessage>No puede estar vacío</FormControl.ErrorMessage>
            </Stack>
        </FormControl>
    )
}

export default DatePicker