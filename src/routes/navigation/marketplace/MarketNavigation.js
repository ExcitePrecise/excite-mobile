import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../../../scenes/home/Home'
import { View, Text, TouchableOpacity } from 'react-native'
import { COLORS } from './../../../theme/theme'
import MarketplaceStacks from './stack/Marketplace'
import AccountStack from './stack/Account'
// Font Awesome
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'

//
const MarketBottomInstance = createBottomTabNavigator()
const MarketBottomTabs = ({ navigation }) => {
  function PostScreen() {
    return (
      <View>
        <Text>Post</Text>
      </View>
    )
  }

  function EmptyScreen() {
    return <View></View>
  }
  return (
    <MarketBottomInstance.Navigator

      //hide tab names
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: 'white',
          // position: 'absolute',
          // bottom: 10,
          height: 60,
          // marginHorizontal: 20,
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
        component={MarketplaceStacks}
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
        component={AccountStack}
        options={() => ({
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => navigation.navigate('Account')}
            >
              <View style={{ justifyContent: 'center', height: '100%' }}>
                <FontAwesome5
                  name="user"
                  size={20}
                  color={COLORS.lightGray}
                ></FontAwesome5>
              </View>
            </TouchableOpacity>
          ),
          //    tabBarIcon
        })}
      />
      <MarketBottomInstance.Screen
        name="Home"
        component={Home}
        options={() => ({
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => navigation.navigate('Home')}
            >
              <View style={{ justifyContent: 'center', height: '100%' }}>
                <FontAwesome5
                  name="home"
                  size={20}
                  color={COLORS.lightGray}
                ></FontAwesome5>
              </View>
            </TouchableOpacity>
          ),
          //    tabBarIcon
        })}
      />
    </MarketBottomInstance.Navigator>
  )
}

//
export default MarketBottomTabs
