import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Login from '../../../../scenes/merchants/accounts/Login'
import Register from '../../../../scenes/merchants/accounts/Register'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { COLORS } from '../../../../theme/theme'
import Dashboard from '../../../../scenes/merchants/dashboard/Index'
import { authLogOut } from './../../../../slices/app.slice'

import { useDispatch } from 'react-redux'
import MarketBottomTabs from '../MarketNavigation'

// navigations
const AccountStack = createStackNavigator()
const AuthBottomTabs = createBottomTabNavigator()


function EmptyScreen() {
    return <View></View>
  }

const Settings = ()=>{
    return(
        <View>
            <Text>Settings</Text>
        </View>
    )
}

const Subscription = ()=>{
    return(
        <View>
            <Text>Subscription</Text>
        </View>
    )
}

// 
const AuthRequired = () => {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name="Dashboard" component={Dashboard} />
    </AccountStack.Navigator>
  )
}
const AuthTabs = ({navigation}) => {
    const dispatch = useDispatch()
  return (
    <AuthBottomTabs.Navigator
    initialRouteName="Dashboard 2"
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
         <AuthBottomTabs.Screen
        name="Market 2"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity onPress={()=>navigation.navigate('Market')}>
                <MaterialIcons
                  name="shopping-cart"
                  size={25}
                  color={focused ? COLORS.exciteGreen : COLORS.lightGray}
                ></MaterialIcons>
              </TouchableOpacity>
            )
          },
        }}
      />
      <AuthBottomTabs.Screen
        name="Dashboard 2"
        component={AuthRequired}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                   <MaterialIcons
                  name="dashboard"
                  size={25}
                  color={focused ? COLORS.exciteGreen : COLORS.lightGray}
                >
                </MaterialIcons>
              </View>
            )
          },
        }}
      />
      <AuthBottomTabs.Screen
        name="Subscription"
        component={Subscription}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <MaterialIcons
                  name="payments"
                  size={25}
                  color={focused ? COLORS.exciteGreen : COLORS.lightGray}
                >
                </MaterialIcons>
              </View>
            )
          },
        }}
      />
      <AuthBottomTabs.Screen
        name="Home"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                <MaterialIcons
                  name="home"
                  size={25}
                  color={focused ? COLORS.exciteGreen : COLORS.lightGray}
                ></MaterialIcons>
              </TouchableOpacity>
            )
          },
        }}
      />
      <AuthBottomTabs.Screen
        name="Logout"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity onPress={()=>dispatch(authLogOut())}>
                <MaterialIcons
                  name="logout"
                  size={25}
                  color={focused ? COLORS.exciteGreen : COLORS.lightGray}
                >
                </MaterialIcons>
              </TouchableOpacity>
            )
          },
        }}
      />
    </AuthBottomTabs.Navigator>
  )
}

const SignRoute = () => {
  return (
    <AccountStack.Navigator screenOptions={{headerShown:false}}>
      <AccountStack.Screen name="Login" component={Login} />
      <AccountStack.Screen name="Register" component={Register} />
    </AccountStack.Navigator>
  )
}

// MAIN
function Account({ auth, loggedIn,navigation, ...props }) {
  if (auth && loggedIn) {
    return <AuthTabs {...props} navigation={navigation}/>
  }
  return <SignRoute {...props}/>
//   return <AuthTabs {...props} navigation={navigation}/>
}

const mapStateToProps = (state) => {
  return {
    auth: state.app.token,
    loggedIn: state.app.loggedIn,
  }
}

export default connect(mapStateToProps)(Account)
