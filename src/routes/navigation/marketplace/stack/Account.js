import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../../../../scenes/merchants/accounts/Login'
import Register from '../../../../scenes/merchants/accounts/Register'
import { connect } from 'react-redux'
import Dashboard from '../../../../scenes/merchants/dashboard/Index'
import ListingProduct from '../../../../scenes/merchants/dashboard/listing/products'
import ListingService from '../../../../scenes/merchants/dashboard/listing/services'
import BookKeeping from '../../../../scenes/merchants/dashboard/book'
import Performance from '../../../../scenes/merchants/dashboard/book/Performance'
import Finance from '../../../../scenes/merchants/dashboard/book/Finance'
import Inventory from '../../../../scenes/merchants/dashboard/book/Inventory'
import Receivables from '../../../../scenes/merchants/dashboard/book/Receivables'
import Sales from '../../../../scenes/merchants/dashboard/book/Sales'
import Customer from '../../../../scenes/merchants/dashboard/book/Customer'
import Subscription from '../../../../scenes/merchants/dashboard/subscriptions'
import Influencer from '../../../../scenes/merchants/dashboard/influencer'
import SocialCommerce from '../../../../scenes/merchants/dashboard/commerce'
import PaymentGate from '../../../../scenes/merchants/dashboard/payment'
import Store from '../../../../scenes/merchants/dashboard/store'
import Banner from '../../../../scenes/merchants/dashboard/banner'
import ManageListing from '../../../../scenes/merchants/dashboard/manage'
import MyAccount from '../../../../scenes/merchants/dashboard/profile'
// Modal screens
import ManageListingModal from '../../../../scenes/merchants/dashboard/modals/managelisting'

//
import { COLORS } from '../../../../theme/theme'
import HeaderTitle from './HeaderTitle'
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'
import { View, Text, Button } from 'react-native'
// navigations
const RootStack = createStackNavigator()
const AccountStack = createStackNavigator()
const ModalStack = createStackNavigator()

//
const AuthRequiredMain = () => {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.exciteDark, elevation: 0 },
        headerTintColor: COLORS.white,
      }}
      initialRouteName="Dashboard"
    >
      <AccountStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ navigation }) => ({
          title: 'Home',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        })}
      />
      <AccountStack.Screen
        name="ProductListing"
        component={ListingProduct}
        options={({ navigation }) => ({
          title: 'Product Listing',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        })}
      />
     
      <AccountStack.Screen
        name="Influencer"
        component={Influencer}
        options={({ navigation }) => ({
          title: 'Influencer',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        })}
      />
      <AccountStack.Screen
        name="SocialCommerce"
        component={SocialCommerce}
        options={({ navigation }) => ({
          title: 'Social Commerce',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        })}
      />
      <AccountStack.Screen
        name="Subscription"
        component={Subscription}
        options={({ navigation }) => ({
          title: 'Subscription',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        })}
      />
      <AccountStack.Screen
        name="PaymentGate"
        component={PaymentGate}
        options={({ navigation }) => ({
          title: 'PaymentGate',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        })}
      />
      <AccountStack.Screen
        name="Store"
        component={Store}
        options={({ navigation }) => ({
          title: 'Store',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        })}
      />
      <AccountStack.Screen
        name="PostBanner"
        component={Banner}
        options={({ navigation }) => ({
          title: 'PostBanner',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        })}
      />
      <AccountStack.Screen
        name="ManageListing"
        component={ManageListing}
        options={({ navigation }) => ({
          title: 'ManageListing',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        })}
      />
      <AccountStack.Screen
        name="MyAccount"
        component={MyAccount}
        options={({ navigation }) => ({
          title: 'MyAccount',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        })}
      />
      <AccountStack.Screen
        name="ServiceListing"
        component={ListingService}
        options={({ navigation }) => ({
          title: 'Service Listing',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        })}
      />
      <AccountStack.Screen
        name="BookKeeping"
        component={BookKeeping}
        options={({ navigation }) => ({
          title: 'Book Keeping',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        })}
      />
        <AccountStack.Screen
        name="Performance"
        component={Performance}
        options={() => ({ title: 'Sales Performance' })}
      />
      <AccountStack.Screen
        name="Finance"
        component={Finance}
        options={() => ({ title: 'Finanncial Report' })}
      />

      <AccountStack.Screen
        name="Inventory"
        component={Inventory}
        options={() => ({ title: 'Inventory' })}
      />
      <AccountStack.Screen
        name="Customer"
        component={Customer}
        options={() => ({ title: 'Customers' })}
      />
      <AccountStack.Screen
        name="Receivables"
        component={Receivables}
        options={() => ({ title: 'Receivables' })}
      />

      <AccountStack.Screen
        name="Sales"
        component={Sales}
        options={() => ({ title: 'Sales' })}
      />

      {/* <AccountStack.Screen
        name="Customer"
        component={Customer}
        options={() => ({ title: 'Customers' })}
      /> */}
    </AccountStack.Navigator>
  )
}
// Fullscreen Modals
const FullModalScreens = () => {
  return (
    <ModalStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.exciteDark, elevation: 0 },
        headerTintColor: COLORS.white,
      }}
    >
      <ModalStack.Screen
        name="ProductListingEdit"
        component={ManageListingModal}
        options={({ navigation }) => ({
          title: 'Manage Listing',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <HeaderRight />,
        })}
      />
    </ModalStack.Navigator>
  )
}

const SignRoute = () => (
  <AccountStack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: { backgroundColor: COLORS.exciteDark, elevation: 0 },
      headerTintColor: COLORS.white,
    }}
  >
    <AccountStack.Screen
      name="Login"
      component={Login}
      options={({ navigation }) => ({
        title: 'Login',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
        headerRight: () => <HeaderRight />,
      })}
    />
    <AccountStack.Screen
      name="Register"
      component={Register}
      options={({ navigation }) => ({
        title: 'Register',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
        headerRight: () => <HeaderRight />,
      })}
    />
  </AccountStack.Navigator>
)

function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name="Main"
        component={AuthRequiredMain}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Modals" component={FullModalScreens} />
    </RootStack.Navigator>
  )
}

// MAIN
function Account({ auth, loggedIn, navigation, ...props }) {
  if (auth && loggedIn) {
    // return <AuthRequiredMain {...props} navigation={navigation} />
    return <RootStackScreen {...props} navigation={navigation} />
  }
  return <SignRoute {...props} />
}

const mapStateToProps = (state) => ({
  auth: state.app.token,
  loggedIn: state.app.loggedIn,
})

export default connect(mapStateToProps)(Account)
