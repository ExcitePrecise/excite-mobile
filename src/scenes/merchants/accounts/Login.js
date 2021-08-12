import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert
} from 'react-native'
import { COLORS, FONTS, SIZES } from '../../../theme/theme'
import { TextInput, Button } from 'react-native-paper'
import { useState } from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Auth from './../../../apis'
import { authenticate } from '../../../slices/app.slice'
import { useDispatch } from 'react-redux'
import Loading from '../../../utils/axios/Loading'
import { isLoading } from '../../../slices/app.slice'
import SnacksNotification from '../../../components/SnacksNotification'

//
import { rememberToken } from './../../../utils/axios/token'

//
const Login = ({ navigation }) => {
  const [inputs, setInput] = useState({ email: '', password: '' })
  const dispatch = useDispatch()
  const [isSubmit, setIsSubmit] = useState(false)

  //notification
  const [visible, setVisible] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const handleNotification = (state, msg) => {
    setVisible(state)
    setMessage(msg)
    if (!state) {
      setMessage(msg)
    }
  }

  //
  const handleSubmit = async () => {
    // dispatch(isLoading(true))
    setIsSubmit(true)
    try {
      const response = await Auth.authLogin(inputs.email, inputs.password)
    // dispatch(isLoading(false))
    setIsSubmit(false)
    if (response) {
      await rememberToken(response.token)
      dispatch(authenticate({ token: response.token, loggedIn: true,me:response.profile }))
    } else {
      handleNotification(true, 'Email/Password not correct')
      return Alert.alert('Invalid email/password')
    }
    } catch (error) {
    setIsSubmit(false)
    return Alert.alert('Network/Server error')
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.root}
      >
        <Text
          style={{ ...FONTS.h1, marginBottom: 46 }}
          onPress={Keyboard.dismiss}
        >
          Login
        </Text>
        <TextInput
          label="Email"
          value={inputs.email}
          onChangeText={(text) => setInput({ ...inputs, email: text })}
          mode="outlined"
          style={{ marginBottom: 20 }}
        />
        <TextInput
          label="Password"
          value={inputs.password}
          onChangeText={(text) => setInput({ ...inputs, password: text })}
          secureTextEntry
          mode="outlined"
          style={{ marginBottom: 50 }}
        />
        <TouchableOpacity disabled={isSubmit} onPress={() => handleSubmit()} style={{ marginBottom: 30,flexDirection:'row', justifyContent:'center', backgroundColor:COLORS.exciteDark }}>
        {isSubmit && (
                  <ActivityIndicator
                    size="large"
                    animating={isSubmit}
                    color={COLORS.exciteGreen}
                    hidesWhenStopped={true}
                  />
                )}
          <Button
            dark
            color={COLORS.exciteDark}
            mode="contained"
          >
            Login
          </Button>
        </TouchableOpacity>
        <View style={styles.signup}>
          <Text>Don't have an account ?</Text>
          <Button onPress={() => navigation.navigate('Register')}>
            Sign Up
          </Button>
        </View>
        <Loading />
    
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  root: {
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: 'center',
  },
  heading: {},
  signup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
