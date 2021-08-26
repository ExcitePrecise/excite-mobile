import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Button from 'components/Button'
import { colors, images } from 'theme'
import { text, padding } from '../../../assets/constant/index'
import { COLORS } from '../../theme/theme'
import { useNavigation } from '@react-navigation/core'
// import { color } from 'react-native-reanimated'

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  welcome: {
    padding: padding.padding * 2,
    height: 280,
    backgroundColor: COLORS.exciteDark,
  },
  wrapperT: {
    // backgroundColor: COLORS.exciteGreen,
    marginHorizontal: 15,
    // paddingVertical: 40,
    marginBottom:10,
    transform: [{ translateY: -100 }],
  },
  wrapper: {
    backgroundColor:'transparent',
    marginHorizontal: 15,
    // paddingVertical: 40,
    // marginBottom:10,
    transform: [{ translateY: -80 }],
    borderRadius:20

  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius:20
  },
  btn: {
    marginTop: 10,
  },
})

function WelcomeText() {
  return (
    <View style={styles.welcome}>
      <Text style={{ color: COLORS.exciteGreen, ...text.h1,marginTop:40 }}>Welcome !</Text>
      <Text style={{ color: COLORS.white, ...text.p, marginTop:20, fontSize:14 }}>
        Select your preferred service from the options below to proceed.
      </Text>
    </View>
  )
}
function Categories() {
  const navigation = useNavigation()
  return (
    <React.Fragment>
      <View style={styles.wrapperT}>
        <TouchableOpacity onPress={() => {
              navigation.navigate('MarketArea', { from: 'Home' })
            }}>
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
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity  onPress={() => {
              navigation.navigate('BusinessHome')
            }}>
        <ImageBackground
          source={images.business_bg}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={{ color: 'white', ...text.h1 }}>Business</Text>
          <Text style={{ color: 'white', textAlign: 'center', ...text.p }}>
            Manage, organise & structure your business
          </Text>
          <Button
            title="Proceed"
            color="white"
            backgroundColor={colors.exciteGreen}
            style={styles.btn}
            onPress={() => {
              navigation.navigate('BusinessHome')
            }}
          />
        </ImageBackground>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  )
}

const Home = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ justifyContent: 'center' }}
    >
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
