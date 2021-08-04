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
  ScrollView,
} from 'react-native'
import { COLORS, FONTS, SIZES } from '../../../theme/theme'
import { TextInput, Button } from 'react-native-paper'
import { useState } from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { authSignUp } from '../../../apis/auth'
import SnacksNotification from '../../../components/SnacksNotification'
import { useDispatch } from 'react-redux'
import Loading from '../../../utils/axios/Loading'
import { isLoading } from '../../../slices/app.slice'

//
const Register = ({ navigation }) => {
  const dispatch = useDispatch()

  //notification
  const [visible, setVisible] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const handleNotification = (state) => {
    setVisible(state)
    if (!state) {
      setMessage('')
    }
  }

  const [inputs, setInput] = useState({
    email: '',
    password: '',
    storeName: '',
    storePhone: '',
    storeAddress: '',
  })

  const handleChange = (text, name) => {
    setInput({ ...inputs, [name]: text })
  }

  const handleSubmit = async () => {
    dispatch(isLoading(true))
    const res = await authSignUp({
      ...inputs,
      fullname: inputs.storeName,
      email: inputs.email.toLowerCase().trim(),
    })
    // console.log(res)
    dispatch(isLoading(false))

    if (res.code === 201) {
      setMessage('Account created')
      handleNotification(true)
    }
  }
  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView onPress={Keyboard.dismiss}>
          <Text style={{ ...FONTS.h1, marginBottom: 46 }}>Register</Text>
          <TextInput
            label="Trading Name"
            value={inputs.storeName}
            onChangeText={(text) => handleChange(text, 'storeName')}
            mode="outlined"
            style={{ marginBottom: 20 }}
          />
          <TextInput
            label="Address"
            value={inputs.storeAddress}
            onChangeText={(text) => handleChange(text, 'storeAddress')}
            mode="outlined"
            style={{ marginBottom: 20 }}
          />
          <TextInput
            label="Phone Number"
            value={inputs.storePhone}
            onChangeText={(text) => handleChange(text, 'storePhone')}
            mode="outlined"
            style={{ marginBottom: 20 }}
          />
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
          <TouchableOpacity style={{ marginBottom: 30 }}>
            <Button
              icon="camera"
              dark
              color={COLORS.exciteDark}
              mode="contained"
              onPress={() => handleSubmit()}
            >
              Register
            </Button>
          </TouchableOpacity>
          <View style={styles.signup}>
            <Text>Have an account ?</Text>
            <Button onPress={() => navigation.navigate('Login')}>Login</Button>
          </View>
          <SnacksNotification
            visible={visible}
            navigation={navigation}
            message={message}
            handleNotification={handleNotification}
          />
        </ScrollView>
        <Loading />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    flex: 1,
  },
  heading: {},
  signup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
