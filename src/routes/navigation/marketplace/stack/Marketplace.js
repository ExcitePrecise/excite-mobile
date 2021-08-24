import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MarketplaceHome from '../../../../scenes/marketplace'
import SelectCategory from '../../../../scenes/marketplace/SelectCategory'
import Products from '../../../../scenes/marketplace/Products'
import ProductDetails from '../../../../scenes/marketplace/ProductDetails'
import { COLORS } from '../../../../theme/theme'
import HeaderTitle from './HeaderTitle'
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'
import Search from '../../../../scenes/marketplace/Search'
// 
const MarketStack = createStackNavigator()

export default function Marketplace() {
    return (
        <MarketStack.Navigator screenOptions={{headerStyle:{backgroundColor:COLORS.exciteDark,elevation:0},headerTintColor:COLORS.white}}>
            <MarketStack.Screen name='Home' component={MarketplaceHome} 
            options={({ navigation }) => ({
                title: 'Home',
                headerLeft: () => <HeaderLeft navigation={navigation} />,
                headerTitle: () => <HeaderTitle />,
                headerRight: () => <HeaderRight />,
              })}
            />
            <MarketStack.Screen name='Category' component={SelectCategory}
             options={({ navigation }) => ({
                title: 'Category',
                headerLeft: () => <HeaderLeft navigation={navigation} />,
                headerTitle: () => <HeaderTitle />,
                headerRight: () => <HeaderRight />,
              })}
            />
            <MarketStack.Screen name='Products' component={Products}
             options={({ navigation }) => ({
                title: 'Products',
                headerLeft: () => <HeaderLeft navigation={navigation} />,
                headerTitle: () => <HeaderTitle />,
                headerRight: () => <HeaderRight />,
              })}
            />
            <MarketStack.Screen name='Details' component={ProductDetails}
             options={({ navigation }) => ({
                title: 'Details',
                headerLeft: () => <HeaderLeft navigation={navigation} />,
                headerTitle: () => <HeaderTitle />,
                headerRight: () => <HeaderRight />,
              })}
            />
            <MarketStack.Screen name='Search' component={Search}
             options={({ navigation }) => ({
                title: 'Search',
                headerLeft: () => <HeaderLeft navigation={navigation} />,
                headerTitle: () => <HeaderTitle />,
                headerRight: () => <HeaderRight />,
              })}
            />
        </MarketStack.Navigator>
    )
}
