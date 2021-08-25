import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MarketBottomTabs from '../navigation/marketplace'
//
import Home from '../../scenes/home/Home'
import Account from '../navigation/marketplace/stack/Account'
import { View } from 'react-native'
import { Text } from 'react-native'
import { Button } from 'react-native-paper'
//
const WelcomeStack = createStackNavigator()
const MarketStack = createStackNavigator()
//


function BusinessHome({navigation}) {
  return (
    <View style={{ justifyContent:'center',alignItems:'center', flex:1 }}>
      <Text style={{fontStyle:'italic'}}>coming soon...</Text>
      <Button onPress={()=>navigation.goBack()} style={{marginTop:20}}>Home</Button>
    </View>
  )
}
const BusinessArea = () => {
  return (
    <MarketStack.Navigator screenOptions={{ headerShown: false }}>
      <MarketStack.Screen name="BusinessHome" component={BusinessHome} />
      {/* <MarketStack.Screen name="MarketArea" component={MarketBottomTabs} /> */}
    </MarketStack.Navigator>
  )
}

const Welcome = () => {
  return (
    <NavigationContainer>
      <WelcomeStack.Navigator screenOptions={{ headerShown: false }}>
        <MarketStack.Screen name="Home" component={Home} />
        <MarketStack.Screen name="Account" component={Account} />
        <MarketStack.Screen name="BusinessHome" component={BusinessArea} />
        <MarketStack.Screen name="MarketArea" component={MarketBottomTabs} />
      </WelcomeStack.Navigator>
    </NavigationContainer>
  )
}

export default Welcome
