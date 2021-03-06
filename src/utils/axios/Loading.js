import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { connect } from 'react-redux'
import { COLORS, SIZES } from '../../theme/theme'

const ActivityLoading = ({ loading }) => (
  <View
    style={{
      ...styles.root,
      zIndex: loading ? 100000000 : -10,
      backgroundColor: loading ? 'rgba(0,0,0,0.05)' : 'transparent',
      elevation:loading ? 1 : 0
    }}
  >
    <ActivityIndicator
      size="large"
      animating={loading}
      color={COLORS.exciteGreen}
      hidesWhenStopped={true}
    />
  </View>
)

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width,
    height: '100%',
    width: '100%',
    left: 0,
  },
})

const mapStateToProps = (state) => {
  return {
    loading: state.app.loading,
  }
}
export default connect(mapStateToProps)(ActivityLoading)
