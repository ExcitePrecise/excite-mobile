import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './drawer'
import Welcome from '../welcome'

export default () => {

  return(
  <NavigationContainer>
    <DrawerNavigator />
  </NavigationContainer>
)}
