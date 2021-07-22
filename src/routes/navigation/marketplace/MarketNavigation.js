import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Marketplace from '../../../scenes/marketplace'
import Home from '../../../scenes/home/Home'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import DrawerMenu from '../../welcome/DrawerMenu'
import { View, Text, TouchableOpacity } from 'react-native'
import { COLORS } from './../../../theme/theme'

// Font Awesome

import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
const Marketstack = createStackNavigator()

//
const MarketDrawer = createDrawerNavigator()
const DrawerMenuContainer = (props) => {
  const { state, ...rest } = props
  const newState = { ...state }
  newState.routes = newState.routes.filter((item) => item.name !== 'Home')
  return (
    <DrawerContentScrollView {...props}>
      <DrawerMenu {...props} />
      <DrawerItemList state={newState} {...rest} />
    </DrawerContentScrollView>
  )
}
const MarketplaceDrawer = () => {

  function Menu(){
    return(
      <View><Text>Menu 2</Text></View>
    )
  }
  return (
    // <NavigationContainer>
    <MarketDrawer.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName="Marketplace"
      drawerContent={DrawerMenuContainer}
    >
      <MarketDrawer.Screen name="Marketplace" component={Marketplace} />
      <MarketDrawer.Screen name="Menu" component={Menu} />
    </MarketDrawer.Navigator>
    // </NavigationContainer>
  )
}
//
const MarketBottomInstance = createBottomTabNavigator()
const MarketBottomTabs = ({navigation}) => {
  function ProfileScreen() {
    return (
      <View>
        <Text>Profile</Text>
      </View>
    )
  }
  function PostScreen() {
    return (
      <View>
        <Text>Post</Text>
      </View>
    )
  }

  function EmptyScreen(){
      return(
          <View></View>
      )
  }
  return (
    <MarketBottomInstance.Navigator
      //hide tab names
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 10,
          height: 60,
          marginHorizontal: 20,
          borderRadius: 6,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 5,
            height: 5,
          },
        },
      }}
    >
      <MarketBottomInstance.Screen
        name="Market"
        component={MarketplaceDrawer}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
              // style={{position:"absolute", top:'50%'}}
              >
                <FontAwesome5
                  name="shopping-cart"
                  size={20}
                  color={focused ? COLORS.exciteGreen : COLORS.lightGray}
                ></FontAwesome5>
              </View>
            )
          },
        }}
      />
      <MarketBottomInstance.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: focused
                    ? COLORS.exciteGreen
                    : COLORS.lightGray,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 6,
                }}
              >
                <MaterialIcons name="add" size={20}></MaterialIcons>
                <Text>SELL</Text>
              </View>
            )
          },
        }}
      />
      <MarketBottomInstance.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
              // style={{position:"absolute", top:'50%'}}
              >
                <FontAwesome5
                  name="user-alt"
                  size={20}
                  color={focused ? COLORS.exciteGreen : COLORS.lightGray}
                ></FontAwesome5>
              </View>
            )
          },
        }}
      />
          <MarketBottomInstance.Screen name="Home"  component={Home}
         options={()=> ({
           tabBarButton:props => <TouchableOpacity {...props}   onPress={()=>navigation.navigate('Home')}>
               <View 
              style={{justifyContent:'center' , height:'100%'}}
               >
               <FontAwesome5
                  name="home"
                  size={20}
                  color={COLORS.lightGray}
                ></FontAwesome5>
               </View>
           </TouchableOpacity>,
        //    tabBarIcon
    })}
    />
    </MarketBottomInstance.Navigator>
  )
}

//
export default MarketBottomTabs
