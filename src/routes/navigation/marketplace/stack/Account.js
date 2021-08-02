import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../../../../scenes/merchants/accounts/Login'
import Register from '../../../../scenes/merchants/accounts/Register'
import { View,Text } from 'react-native'
import { connect } from 'react-redux'

// Auth SCreen

import Dashboard from '../../../../scenes/merchants/dashboard/Index'

// 
const AccountStack = createStackNavigator()


const AuthRequired = ()=>{
    return(
        <AccountStack.Navigator>
        <AccountStack.Screen name='Dashboard' component={Dashboard}/>
    </AccountStack.Navigator>
    )
}

const SignRoute=()=>{
    return(
        <AccountStack.Navigator>
        <AccountStack.Screen name='Login' component={Login}/>
        <AccountStack.Screen name='Register' component={Register}/>
    </AccountStack.Navigator>
    )
}

function Account({auth,loggedIn,...props}) {

    if(auth && loggedIn ){
        return <AuthRequired {...props}/>
    }
    return <SignRoute {...props}/>
}

const mapStateToProps =(state)=>{
    return{
        auth:state.app.token,
        loggedIn:state.app.loggedIn
    }
}

export default connect(mapStateToProps)(Account)
