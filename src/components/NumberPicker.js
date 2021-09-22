import React, { useMemo } from 'react'
import { FormControl, Select, Stack, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const NumberPicker = (props) => {
    const numbersOfItems = props.items || 10
    const arrayNumbers = React.useMemo(() => getArray(numbersOfItems), [numbersOfItems] )

    return (
        <FormControl isRequired={props.isRequired}>
            <Stack>
                <FormControl.Label>{props.label}</FormControl.Label>
                <Select
                    placeholder={props.placeHolder}
                    _selectedItem={{
                        endIcon: <Icon as={Ionicons} name='checkmark' size='sm' ml={1} />
                    }}
                    {...props}
                >
                    {arrayNumbers.map((x, i) => (
                        <Select.Item label={x.toString()} value={x} key={i}/>
                    ))}
                </Select>
                <FormControl.ErrorMessage>No puede estar vacío</FormControl.ErrorMessage>
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