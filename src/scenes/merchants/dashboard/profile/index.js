import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Account from '../../../../components/profile/Index'
import { COLORS } from '../../../../theme/theme'
const index = () => {
  return (
    <View style={styles.root}>
      <Account />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 40,
  },
})
