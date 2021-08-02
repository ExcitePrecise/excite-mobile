import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { authenticate } from 'slices/app.slice'
import Main from './navigation'
import Welcome from './welcome'


// 
const Routes = () => {
  return <Welcome />
}

export default Routes
