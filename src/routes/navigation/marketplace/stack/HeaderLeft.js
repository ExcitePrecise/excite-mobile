import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { COLORS } from '../../../../theme/theme'

const styles = StyleSheet.create({
  btn: {
    width: 32,
    height: 32,
    marginLeft: 20,
    justifyContent:'center'
  },
})

const HeaderLeft = ({ navigation }) => (
  <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.btn}>
    <FontIcon name='angle-left' size={20} color={COLORS.white}/>
  </TouchableOpacity>
)

export default HeaderLeft
