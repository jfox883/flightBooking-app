import * as SecureStore from "expo-secure-store"

export const saveItem = async (key, value) => {
    try {
        let jsonValue = JSON.stringify(value)
        await SecureStore.setItemAsync(key, jsonValue)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

export const getItem = async (key) => {
    try {
        let result = await SecureStore.getItemAsync(key)
        return result
    } catch (e) {
        console.log(e)
    }
}

export const removeItem = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}
