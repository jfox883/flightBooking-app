import React from 'react'
import { FormControl, Input, Stack, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const SearchInput = (props) => {
    return (
        <FormControl isRequired={props.isRequired}>
            <Stack>
                <FormControl.Label>{props.label}</FormControl.Label>
                <Input 
                    InputLeftElement={
                        <Icon as={Ionicons} name={props.iconName} size='sm' ml={1} />
                    }
                    {...props}
                />
                <FormControl.ErrorMessage>No puede estar vacío</FormControl.ErrorMessage>
            </Stack>
        </FormControl>
    )
}

export default SearchInput
