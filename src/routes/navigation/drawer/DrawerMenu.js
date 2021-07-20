import React from 'react'
import PropTypes from 'prop-types'
import { View, SafeAreaView, Text } from 'react-native'
import Button from 'components/Button'

import { DrawerActions } from '@react-navigation/native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from 'theme'
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const styles = {
  root: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  items: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 10,
    alignItems: 'start',
    justifyContent: 'center',
    fontColor: 'black',
  },
}

const DrawerMenu = (props) => (
  <SafeAreaView style={styles.root}>
    <View style={styles.head}>
      <FontIcon.Button
        name="times"
        size={20}
        color={colors.gray}
        backgroundColor="white"
        onPress={() => {
          props.navigation.dispatch(DrawerActions.closeDrawer())
        }}
      />
    </View>
    <View style={styles.main}>
      <Text> Menu</Text>
    </View>
    <View style={styles.items}>
      <Button
        color="black"
        backgroundColor="transparent"
        title="Market"
        onPress={() => {
          props.navigation.navigate('Market')
        }}
      />
      <Button
        color="black"
        backgroundColor="transparent"
        title="Business"
        onPress={() => {
          props.navigation.navigate('Business')
        }}
      />
    </View>
  </SafeAreaView>
)

DrawerMenu.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }),
}

DrawerMenu.defaultProps = {
  navigation: {
    dispatch: () => null,
  },
}

export default DrawerMenu
