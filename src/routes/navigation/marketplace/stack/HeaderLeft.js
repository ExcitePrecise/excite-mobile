import React from 'react'
// import PropTypes from 'prop-types'
import { StyleSheet, Image } from 'react-native'
// import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { images } from 'theme'

const styles = StyleSheet.create({
  logo: {
    width: 32,
    height: 32,
    marginLeft: 20,
  },
})

const HeaderLeft = ({ navigation }) => (
  <Image source={images.logo_sm} style={styles.logo}  resizeMode='contain'/>
)


export default HeaderLeft
