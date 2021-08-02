import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MarketplaceHome from '../../../../scenes/marketplace'
import SelectCategory from '../../../../scenes/marketplace/SelectCategory'
import { View } from 'react-native'
import Products from '../../../../scenes/marketplace/Products'
import ProductDetails from '../../../../scenes/marketplace/ProductDetails'

const MarketStack = createStackNavigator()

export default function Marketplace() {
    return (
        <MarketStack.Navigator screenOptions={{headerStyle:{backgroundColor:'transparent'}}}>
            <MarketStack.Screen name='Home' component={MarketplaceHome}/>
            <MarketStack.Screen name='Category' component={SelectCategory}/>
            <MarketStack.Screen name='Products' component={Products}/>
            <MarketStack.Screen name='Details' component={ProductDetails}/>
        </MarketStack.Navigator>
    )
}