import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabs, HomeStack } from './src/navigation/ScreenNavigation'
import { Provider } from 'react-redux'
import { store } from './store'

const CryptoStack = () => {
    <NavigationContainer>
        <HomeStack />
    </NavigationContainer>
}

const App = () => {
    return (
        <>
            <Provider store={store}>
                <NavigationContainer>
                    <HomeStack/>
                </NavigationContainer>
            </Provider>

        </>


    )
}



export default App