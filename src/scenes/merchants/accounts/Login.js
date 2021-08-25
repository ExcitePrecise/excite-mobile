import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native'
import { COLORS, FONTS, SIZES } from '../../../theme/theme'
import { TextInput, Button } from 'react-native-paper'
import { useState } from 'react'
import Auth from './../../../apis'
import { authenticate } from '../../../slices/app.slice'
import { connect, useDispatch } from 'react-redux'
import Loading from '../../../utils/axios/Loading'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { setTitle } from '../../../slices/app.slice'
import { setTabIcon } from '../../../slices/app.slice'
import { popBanner } from '../../../slices/app.slice'
//
import { rememberToken } from './../../../utils/axios/token'
import BannerNotification from '../../../components/BannerNotification'
//
const Login = ({ navigation, popBanner }) => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setTitle({ title: 'Account' }))
      dispatch(setTabIcon({ icon: 'dashboard' }))
    })
    return unsubscribe
  }, [navigation])
  const [isSubmit, setIsSubmit] = useState(false)

  //passwordtype
  // const [visible, setVisible] = React.useState(false)

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        contentContainerStyle={{ minHeight: '100%' }}
      >
        <BannerNotification />
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email')
              .required('Email is required'),
            password: Yup.string().required('Enter valid password'),
          })}
          onSubmit={async (values) => {
            setIsSubmit(true)
            try {
              const response = await Auth.authLogin(
                values.email,
                values.password,
              )
              // dispatch(isLoading(false))
              setIsSubmit(false)
              if (response) {
                await rememberToken(response.token)
                dispatch(
                  authenticate({
                    token: response.token,
                    loggedIn: true,
                    me: response.profile,
                  }),
                )
              } else {
                // handleNotification(true, 'Email/Password not correct')
                popBanner({
                  visible: true,
                  msg: 'Email/Password is not correct',
                  type: 'error',
                })
              }
            } catch (error) {
              setIsSubmit(false)
              // return Alert.alert('Network/Server error')
              popBanner({
                visible: true,
                msg: 'Email/Password is not correct',
                type: 'error',
              })
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
            touched,
          }) => (
            <View
              style={{
                // paddingVertical: 30,
                justifyContent: 'space-between',
                flex: 1,
              }}
            >
              <View style={{ flex: 1, justifyContent: 'center' }}>
                {touched.email && errors.email ? (
                  <Text style={styles.error}>{errors.email}</Text>
                ) : null}
                <TextInput
                  // label="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  mode="outlined"
                  right={
                    <TextInput.Icon name="email" color={COLORS.exciteGreen} />
                  }
                  style={{
                    marginBottom: 20,
                    backgroundColor: 'transparent',
                    color: COLORS.white,
                  }}
                  placeholderTextColor={'#444'}
                  placeholder="Email"
                  theme={{ colors: { text: COLORS.white } }}
                />
                {touched.password && errors.password ? (
                  <Text style={styles.error}>{errors.password}</Text>
                ) : null}
                <TextInput
                  // label="Email"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                  mode="outlined"
                  right={
                      <TextInput.Icon name="lock" color={COLORS.exciteGreen}/>
                  }
                  style={{
                    marginBottom: 20,
                    backgroundColor: 'transparent',
                    color: COLORS.white,
                  }}
                  placeholderTextColor={"#444"}
                  placeholder="Password"
                  theme={{ colors: { text: COLORS.white } }}
                />
                <TouchableOpacity onPress={() => handleSubmit()}>
                  <Button
                    style={{
                      marginBottom: 30,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      backgroundColor: COLORS.exciteGreen,
                      width: '100%',
                    }}
                    loading={isSubmit}
                    dark
                    color={COLORS.exciteDark}
                    mode="contained"
                  >
                    Login
                  </Button>
                </TouchableOpacity>
              </View>
              <View style={styles.signup}>
                <Text style={{ color: COLORS.white }}>
                  Don't have an account ?
                </Text>
                <Button onPress={() => navigation.navigate('Register')}>
                  Sign Up
                </Button>
              </View>
              <View style={{ paddingBottom: 30 }}>
                <Text style={{ color: COLORS.gray, marginBottom: 20 }}>
                  By clicking on LOGIN, you accept the Terms of Use, Privacy
                  Policy and confirm that you will abide by them.
                </Text>
              </View>
            </View>
          )}
        </Formik>

        <Loading />
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => {
  return {
    banner: state.app?.banner,
    token: state.app?.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    popBanner: (payload) => dispatch(popBanner(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
const styles = StyleSheet.create({
  root: {
    padding: SIZES.padding,
    backgroundColor: COLORS.exciteDark,
    flex: 1,
    justifyContent: 'center',
  },
  signup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    color: COLORS.red,
  },
})
