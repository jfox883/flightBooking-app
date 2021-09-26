import React from 'react'
import { NativeBaseProvider, Center, Button, Heading, Text, Icon, HStack} from "native-base"
import { Ionicons } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth"


import { 
    GOOGLE_ANDROID_CLIENT_ID, 
    GOOGLE_IOS_CLIENT_ID, 
    FIREBASE_ANDROID_CLIENT_ID,
    FIREBASE_IOS_CLIENT_ID } 
from "@env";
import { saveItem } from "../utils/SecureStorage";

export default function Auth({navigation}) {

    const handleLoginPress = async () => {
        try {
            const { type, user, accessToken } = await Google.logInAsync({
                iosClientId: GOOGLE_IOS_CLIENT_ID,
                androidClientId: GOOGLE_ANDROID_CLIENT_ID,
                iosStandaloneAppClientId: FIREBASE_IOS_CLIENT_ID,
                androidStandaloneAppClientId: FIREBASE_ANDROID_CLIENT_ID
            })
    
            if (type === 'success') {
                const userResult = await saveItem('userInfo', user)
                const tokenResult = await saveItem('accessToken', accessToken)

                if(userResult && tokenResult) navigation.navigate('Home')
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <NativeBaseProvider>
            <Center flex={1} flexDirection='column' bg='white' safeArea>
                <Heading size='xl' m={-2}>Welcome!</Heading>
                <Text>Login to continue</Text>
                <Button size='md' m={5} bg='indigo.500' paddingX={10} onPress={handleLoginPress}>
                    <HStack space={2}>
                        <Icon as={Ionicons} name='logo-google' size={6} color='lightText' />
                        <Text color='lightText'>Login</Text>
                    </HStack>
                </Button>
            </Center>
        </NativeBaseProvider>
    )
}
