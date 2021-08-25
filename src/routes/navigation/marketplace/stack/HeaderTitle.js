import { FontDisplay } from 'expo-font'
import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { images } from 'theme'
import { COLORS, FONTS } from '../../../../theme/theme'

const styles = StyleSheet.create({
  title: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
})

const HeaderTitle = ({ title }) => (
  // <React.Fragment>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image source={images.logo_sm} style={styles.logo} resizeMode="contain" />
    <Text numberOfLines={1} ellipsizeMode="clip" style={styles.title}>
      {title || ''}
    </Text>
  </View>
  // </React.Fragment>
)

HeaderTitle.propTypes = {}
HeaderTitle.defaultProps = {}

const mapStateToProps = (state) => ({
  title: state.app?.title,
})
export default connect(mapStateToProps)(HeaderTitle)
