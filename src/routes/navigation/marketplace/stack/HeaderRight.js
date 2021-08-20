import { FontDisplay } from 'expo-font'
import React from 'react'
import {
  StyleSheet, Image, Text, View, TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import {
  MaterialIcons,
  MaterialCommunityIcons,
} from 'react-native-vector-icons'
import { COLORS, FONTS } from '../../../../theme/theme'



const styles = StyleSheet.create({
  icon: {
    ...FONTS.h3,
    color: COLORS.white,
    marginRight: 5,
  },
})

const HeaderTitle = ({ icon }) => (
  <TouchableOpacity
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
    }}
  >
   {icon ? <MaterialIcons color={COLORS.white} size={20} name={icon} /> :null}
  </TouchableOpacity>
)

HeaderTitle.propTypes = {}
HeaderTitle.defaultProps = {}

const mapStateToProps = (state) => ({
  icon: state.app?.tabIcon,
})
export default connect(mapStateToProps)(HeaderTitle)
