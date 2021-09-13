import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"

import Loading from '../screens/Loading'
import Auth from '../screens/Auth'
import Home from '../screens/Home'
import Results from '../screens/Results'
import Profile from '../screens/Profile'

const Stack = createStackNavigator()

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{headerShown: false}}
                initialRouteName={'Loading'}
            >
                <Stack.Screen name='Loading' component={Loading}/>
                <Stack.Screen name='Auth' component={Auth}/>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='Results' component={Results}/>
                <Stack.Screen name='Profile' component={Profile}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator