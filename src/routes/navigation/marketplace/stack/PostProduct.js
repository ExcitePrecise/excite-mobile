import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../../../../scenes/merchants/accounts/Login'
import Register from '../../../../scenes/merchants/accounts/Register'
import { connect } from 'react-redux'
import ListingProduct from '../../../../scenes/merchants/dashboard/listing/products'
import ListingService from '../../../../scenes/merchants/dashboard/listing/services'


// navigations
const PostStack = createStackNavigator()




// 
const AuthRequired = () => {
  return (
    <PostStack.Navigator screenOptions={{ headerShown: true }} initialRouteName="ProductListing">
      <PostStack.Screen name="ProductListing" component={ListingProduct} />
      <PostStack.Screen name="ServiceListing" component={ListingService} />
    </PostStack.Navigator>
  )
}

const SignRoute = () => {
  return (
    <PostStack.Navigator screenOptions={{headerShown:false}}>
      <PostStack.Screen name="Login" component={Login} />
      <PostStack.Screen name="Register" component={Register} />
    </PostStack.Navigator>
  )
}

// MAIN
function Account({ auth, loggedIn,navigation, ...props }) {
  if (auth && loggedIn) {
    return <AuthRequired {...props} navigation={navigation}/>
  }
  return <SignRoute {...props}/>
  // return <AuthRequired {...props} navigation={navigation}/>

}

const mapStateToProps = (state) => {
  return {
    auth: state.app.token,
    loggedIn: state.app.loggedIn,
  }
}

export default connect(mapStateToProps)(Account)
