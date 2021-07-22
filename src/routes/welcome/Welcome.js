import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MarketBottomTabs from '../navigation/marketplace'
//
import Home from '../../scenes/home/Home'
import Marketplace from '../../scenes/marketplace'
import { View } from 'react-native'
import { Text } from 'react-native-svg'
//
const WelcomeStack = createStackNavigator()
const MarketStack = createStackNavigator()

const MarketArea = () => {
  return (
    <MarketStack.Navigator screenOptions={{ headerShown: false }}>
      <MarketStack.Screen name="Home" component={Home} />
      <MarketStack.Screen name="MarketArea" component={MarketBottomTabs} />
      {/* TODO 
            Business services click
            */}
    </MarketStack.Navigator>
  )
}
const BusinessArea = () => {
    function BusinessHome(){
        return(
            <View><Text>Business Home</Text></View>
        )
    }
  return (
    <MarketStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <MarketStack.Screen name="Home" component={Home} /> */}
      <MarketStack.Screen name="BusinessHome" component={BusinessHome} />
      {/* <MarketStack.Screen name="MarketArea" component={MarketBottomTabs} /> */}
    </MarketStack.Navigator>
  )
}

const MarketplaceTabs = createBottomTabNavigator()
const Welcome = () => {
  return (
    <NavigationContainer>
      <WelcomeStack.Navigator screenOptions={{ headerShown: false }}>
        <MarketStack.Screen name="Home" component={Home} />
        <MarketStack.Screen name="BusinessHome" component={BusinessArea} />
        <MarketStack.Screen name="MarketArea" component={MarketBottomTabs} />
      </WelcomeStack.Navigator>
    </NavigationContainer>
  )
}

export default Welcome
