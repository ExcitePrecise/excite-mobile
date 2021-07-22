import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  ScrollView,
} from 'react-native'
import Button from 'components/Button'
import { colors, images } from 'theme'
import { text, padding } from '../../../assets/constant/index'
// import { color } from 'react-native-reanimated'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  welcome: {
    padding: padding.padding * 2,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  btn: {
    marginTop: 10,
  },
})

const Home = ({ navigation }) => {
  function WelcomeText() {
    return (
      <View style={styles.welcome}>
        <Text style={{ color: colors.exciteDrak, ...text.h1 }}>Welcome !</Text>
        <Text style={{ color: colors.lightGrayDark, ...text.p }}>
          Select your preferred service from the options below.
        </Text>
      </View>
    )
  }

  function Categories() {
    return (
      <View style={{ padding: padding.padding * 2 }}>
        <ImageBackground
          source={images.market_bg}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={{ color: 'white', ...text.h1 }}>Marketplace</Text>
          <Text style={{ color: 'white', ...text.p }}>
            Find everything in one place
          </Text>
          <Button
            title="Proceed"
            color="white"
            backgroundColor={colors.exciteGreen}
            style={styles.btn}
            onPress={() => {
              navigation.navigate('MarketArea', { from: 'Home' })
            }}
          />
        </ImageBackground>
        <ImageBackground
          source={images.business_bg}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={{ color: 'white', ...text.h1 }}>Business</Text>
          <Text style={{ color: 'white', ...text.p }}>
            Manage, organise & structure your business
          </Text>
          <Button
            title="Proceed"
            color="white"
            backgroundColor={colors.exciteGreen}
            style={styles.btn}
            onPress={() => {
              // navigation.navigate('Details', { from: 'Home' })
              navigation.navigate('BusinessHome', { from: 'Home' })

              // navigation.navigate('Details', { from: 'Home' })
            }}
          />
        </ImageBackground>
      </View>
    )
  }
  return (
    <ScrollView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <WelcomeText />
      <Categories />
    </ScrollView>
  )
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}

export default Home
