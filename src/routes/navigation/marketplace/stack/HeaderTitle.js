import { FontDisplay } from 'expo-font'
import React from 'react'
import { StyleSheet, Image, Text } from 'react-native'
import { connect } from 'react-redux'

import { COLORS, FONTS } from '../../../../theme/theme'

const styles = StyleSheet.create({
  title: {
    ...FONTS.h3,
    color: COLORS.white,
    
  },
})

const HeaderTitle = ({ title }) => (
  <Text numberOfLines={1} ellipsizeMode='clip' style={styles.title}>{title || ''}</Text>
)

HeaderTitle.propTypes = {}
HeaderTitle.defaultProps = {}

const mapStateToProps = (state) => ({
  title: state.app?.title,
})
export default connect(mapStateToProps)(HeaderTitle)
