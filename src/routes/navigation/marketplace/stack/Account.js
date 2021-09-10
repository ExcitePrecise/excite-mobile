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
import Inventory from '../../../../scenes/merchants/dashboard/book/Inventory'
import Orders from '../../../../scenes/merchants/dashboard/book/Orders'
import Sales from '../../../../scenes/merchants/dashboard/book/Sales'
import IncomeStatement from '../../../../scenes/merchants/dashboard/book/IncomeStatement'
import Revenue from '../../../../scenes/merchants/dashboard/book/Revenue'
import Cost from '../../../../scenes/merchants/dashboard/book/Cost'
import Expense from '../../../../scenes/merchants/dashboard/book/Expense'
import Transaction from '../../../../scenes/merchants/dashboard/book/Transaction'
import Customer from '../../../../scenes/merchants/dashboard/book/Customer'
import SalesPlan from '../../../../scenes/merchants/dashboard/book/SalesPlan'
import Subscription from '../../../../scenes/merchants/dashboard/subscriptions'
import Influencer from '../../../../scenes/merchants/dashboard/influencer'
import SocialCommerce from '../../../../scenes/merchants/dashboard/commerce'
import PaymentGate from '../../../../scenes/merchants/dashboard/payment'
import Store from '../../../../scenes/merchants/dashboard/store'
import Banner from '../../../../scenes/merchants/dashboard/banner'
import ManageListing from '../../../../scenes/merchants/dashboard/manage'
import MyAccount from '../../../../scenes/merchants/dashboard/profile'
import EmailVerification from '../../../../scenes/profile/EmailVerification'
import ChangePassword from '../../../../scenes/profile/ChangePassword'

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
        options={() => ({
          title: 'Bizbook',
        })}
      />
      <AccountStack.Screen
        name="Performance"
        component={Performance}
        options={() => ({ title: 'Sales Performance' })}
      />
      <AccountStack.Screen
        name="IncomeStatement"
        component={IncomeStatement}
        options={() => ({ title: 'Income Statement' })}
      />
      <AccountStack.Screen
        name="Revenue"
        component={Revenue}
        options={() => ({ title: 'Revenue' })}
      />
      <AccountStack.Screen
        name="Cost"
        component={Cost}
        options={() => ({ title: 'Cost of Sale' })}
      />
      <AccountStack.Screen
        name="Expense"
        component={Expense}
        options={() => ({ title: 'Expense' })}
      />
      <AccountStack.Screen
        name="Transaction"
        component={Transaction}
        options={() => ({ title: 'Transactions' })}
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
        name="Orders"
        component={Orders}
        options={() => ({ title: 'Orders' })}
      />

      <AccountStack.Screen
        name="Sales"
        component={Sales}
        options={() => ({ title: 'Sales' })}
      />

      <AccountStack.Screen
        name="SalesPlan"
        component={SalesPlan}
        options={() => ({ title: 'Sales Plan' })}
      />
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
      <ModalStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={({ navigation }) => ({
          title: 'Change Password',
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
