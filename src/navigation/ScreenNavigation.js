import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
//screens
import { widthToDp, heightToDp } from "../helpers/Responsive";
import * as Icon from '../helpers/Icons'
import Product from '../screens/Product';
import Cart from '../screens/Cart';
import OrderHistory from '../screens/OrderHistory';

const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='bottom' component={BottomTabs} options={{ headerShown: false }} />
            {/* <Stack.Screen name='cryptograph' component={CryptoGraph} options={{ headerShown: false }} />
            <Stack.Screen name='search' component={Search} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
    )
}

const BottomTabs = () => {
    return (
        <Tab.Navigator
        // barStyle={{ backgroundColor: '#694fad' }}
        >
            <Tab.Screen name="Product" component={Product} options={{
                headerShown: false, tabBarLabelStyle: {
                    fontSize: widthToDp(3),
                },
                tabBarIcon: ({ tintColor, focused }) => (
                    <Image source={Icon.product_icon} style={styles.tabIcon} tintColor={focused ? "#0065B1" : "gray"} />
                ),

            }}
            />
            <Tab.Screen name="Cart" component={Cart} options={{
                headerShown: false, tabBarLabelStyle: {
                    fontSize: widthToDp(3)
                },
                tabBarIcon: ({ tintColor, focused }) => (
                    <Image source={Icon.shopping_icon} style={styles.tabIcon} tintColor={focused ? "#0065B1" : "gray"} />
                )
            }} />
            <Tab.Screen name="Order History" component={OrderHistory} options={{
                headerShown: false, tabBarLabelStyle: {
                    fontSize: widthToDp(3)
                },
                tabBarIcon: ({ tintColor, focused }) => (
                    <Image source={Icon.order_icon} style={styles.tabIcon} tintColor={focused ? "#0065B1" : "gray"} />
                )
            }} />
            {/* <Tab.Screen name="Portfolio" component={Portfolio} options={{
                headerShown: false, tabBarLabelStyle: {
                    fontSize: widthToDp(3)
                },
                tabBarIcon: ({ tintColor, focused }) => (
                    <Image source={Icon.portfolio_icon} style={styles.tabIcon} tintColor={focused ? "#0065B1" : "gray"} />
                )
            }} /> */}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabIcon: {
        height: heightToDp(2.5),
        width: widthToDp(5)
    }
})

export { HomeStack, BottomTabs }