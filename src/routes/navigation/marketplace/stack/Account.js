import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Login from '../../../../scenes/merchants/accounts/Login'
import Register from '../../../../scenes/merchants/accounts/Register'
import Dashboard from '../../../../scenes/merchants/dashboard/Index'
import ListingProduct from '../../../../scenes/merchants/dashboard/listing/products'
import ListingService from '../../../../scenes/merchants/dashboard/listing/services'
import BookKeeping from '../../../../scenes/merchants/dashboard/book'
import Performance from '../../../../scenes/merchants/dashboard/book/Performance'
import Subscription from '../../../../scenes/merchants/dashboard/subscriptions'
import Influencer from '../../../../scenes/merchants/dashboard/influencer'

// navigations
const AccountStack = createStackNavigator()

const AuthRequired = () => (
  <AccountStack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Dashboard">
    <AccountStack.Screen name="Dashboard" component={Dashboard} />
    <AccountStack.Screen name="ProductListing" component={ListingProduct} />
    <AccountStack.Screen name="ServiceListing" component={ListingService} />
    <AccountStack.Screen name="Influencer" component={Influencer} />
    <AccountStack.Screen name="Subscription" component={Subscription} />

    <AccountStack.Screen
      name="BookKeeping"
      component={BookKeeping}
      options={() => ({ title: 'Book Keeping' })}
    />
    <AccountStack.Screen
      name="Performance"
      component={Performance}
      options={() => ({ title: 'Sales Performance' })}
    />
  </AccountStack.Navigator>
)

const SignRoute = () => (
  <AccountStack.Navigator screenOptions={{ headerShown: false }}>
    <AccountStack.Screen name="Login" component={Login} />
    <AccountStack.Screen name="Register" component={Register} />
  </AccountStack.Navigator>
)

// MAIN
function Account({
  auth, loggedIn, navigation, ...props
}) {
  if (auth && loggedIn) {
    return <AuthRequired {...props} navigation={navigation} />
  }
  return <SignRoute {...props} />
}

const mapStateToProps = (state) => ({
  auth: state.app.token,
  loggedIn: state.app.loggedIn,
})

export default connect(mapStateToProps)(Account)
