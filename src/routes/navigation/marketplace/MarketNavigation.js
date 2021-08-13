import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../../../scenes/home/Home'
import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { COLORS } from './../../../theme/theme'
import MarketplaceStacks from './stack/Marketplace'
import AccountStack from './stack/Account'
// Font Awesome
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'

//
const MarketBottomInstance = createBottomTabNavigator()
const MarketBottomTabs = ({ navigation }) => {
  function PostScreen({ navigation }) {
    // return navigation.navigate("Profile")
    return (
      <View>
        <Text>Post</Text>
      </View>
    )
  }

  function EmptyScreen() {
    return <View></View>
  }
  const makeWhatsapp = () => {
    let phoneNumber = `https://wa.me/+2347069452633`
    Linking.openURL(phoneNumber)
  }
  return (
    <MarketBottomInstance.Navigator
      initialRouteName="Market"
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
        component={EmptyScreen}
        // options={{
        //   tabBarIcon: ({ focused }) => {
        //     return (
        //       <View
        //         style={{
        //           flexDirection: 'row',
        //           backgroundColor: focused
        //             ? COLORS.exciteGreen
        //             : COLORS.lightGray,
        //           paddingHorizontal: 15,
        //           paddingVertical: 10,
        //           borderRadius: 6,
        //         }}
        //       >
        //         <MaterialIcons name="add" size={20}></MaterialIcons>
        //         <Text>SELL</Text>
        //       </View>
        //     )
        //   },
        // }}
        options={() => ({
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() =>
                navigation.navigate('Profile', { screen: 'ProductListing' })
              }
              style={{
                flexDirection: 'row',
                backgroundColor: props.focused
                  ? COLORS.exciteGreen
                  : COLORS.lightGray,
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 6,
              }}
            >
              <View style={{ justifyContent: 'center', height: '100%' }}>
                <MaterialIcons name="add" size={20}></MaterialIcons>
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <MarketBottomInstance.Screen
        name="Profile"
        component={AccountStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="dashboard"
                size={25}
                color={focused ? COLORS.exciteGreen : COLORS.lightGray}
              ></MaterialIcons>
            )
          },
        }}
      />
      <MarketBottomInstance.Screen
        name="Help"
        component={EmptyScreen}
        options={() => ({
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={() => makeWhatsapp()}>
              <View style={{ justifyContent: 'center', height: '100%' }}>
                <FontAwesome5
                  name="whatsapp"
                  size={20}
                  color={COLORS.lightGray}
                ></FontAwesome5>
              </View>
            </TouchableOpacity>
          ),
        })}
      />
    </MarketBottomInstance.Navigator>
  )
}

//
export default MarketBottomTabs
