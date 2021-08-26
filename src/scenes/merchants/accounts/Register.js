import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native'
import { COLORS, SIZES } from '../../../theme/theme'
import { TextInput, Button } from 'react-native-paper'
import { useState } from 'react'
import { authSignUp } from '../../../apis/auth'
import { connect, useDispatch } from 'react-redux'
import { setTitle } from '../../../slices/app.slice'
import { setTabIcon } from '../../../slices/app.slice'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { NigerianStates, StateLgaArea } from '../../../components/states'
import { Picker } from '@react-native-picker/picker'
import BannerNotification from '../../../components/BannerNotification'
import { popBanner } from '../../../slices/app.slice'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react/cjs/react.production.min'
//
const Register = ({ navigation, popBanner }) => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setTitle({ title: 'Create an account' }))
      dispatch(setTabIcon({ icon: 'dashboard' }))
    })
    return unsubscribe
  }, [navigation])
  const [isSubmit, setIsSubmit] = useState(false)

  return (
    <SafeAreaView style={styles.root}>
      <BannerNotification />

      <ScrollView
        style={{ flex: 1, paddingTop: 40 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        showsVerticalScrollIndicator={false}
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
            storeName: '',
            storeAddress: '',
            storeLga: '',
            storeState: '',
            storePhone: '',
            password2: '',
            refCode: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email')
              .required('Email is required'),
            password: Yup.string().required('Enter valid password'),
            storeAddress: Yup.string()
              .required('Address is required')
              .min(5, 'Invalid address')
              .max(150, 'Address is too long'),
            storePhone: Yup.string()
              .required('Phone number is required')
              .min(10, 'Invalid phone number')
              .max(11, 'Invalid phone number'),
            storeState: Yup.string().required('State is required'),
            storeName: Yup.string().required('Store name is required'),
            storeLga: Yup.string().required('LGA is required'),
            // storeLga:Yup.string().required("LGA is required"),
          })}
          onSubmit={async (values,{setSubmitting, setErrors, setStatus, resetForm}) => {
            if (values.password !== values.password2) {
              return popBanner({
                visible: true,
                type: 'error',
                msg: 'Password do not match',
              })
            }
            try {
              setIsSubmit(true)
              const res = await authSignUp({
                ...values,
                fullname: values.storeName,
                email: values.email.toLowerCase().trim(),
              })
              // console.log(res)
              setIsSubmit(false)
              if (res.code === 201) {
                popBanner({
                  visible: true,
                  msg: 'Account created successfully',
                  type: 'success',
                })
                resetForm()
                return navigation.navigate('Login')
              }
              if (res.code === 405) {
                return popBanner({
                  visible: true,
                  msg: 'Invalid Referral/Agent code',
                  type: 'error',
                })
              }
              if (res.code === 401) {
                return popBanner({
                  visible: true,
                  msg: 'Account already exist',
                  type: 'error',
                })
              } else {
                return popBanner({
                  visible: true,
                  msg: 'Account already exist',
                  type: 'error',
                })
              }
            } catch (error) {
              setIsSubmit(false)
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
                {touched.storeName && errors.storeName ? (
                  <Text style={styles.error}>{errors.storeName}</Text>
                ) : null}
                <TextInput
                  value={values.storeName}
                  onChangeText={handleChange('storeName')}
                  onBlur={handleBlur('storeName')}
                  mode="outlined"
                  right={
                    <TextInput.Icon name="home" color={COLORS.exciteGreen} />
                  }
                  style={{
                    marginBottom: 20,
                    backgroundColor: 'transparent',
                    color: COLORS.white,
                  }}
                  placeholderTextColor={'#888'}
                  placeholder="Store Name"
                  theme={{ colors: { text: COLORS.white } }}
                />
                {touched.storeAddress && errors.storeAddress ? (
                  <Text style={styles.error}>{errors.storeAddress}</Text>
                ) : null}
                <TextInput
                  value={values.storeAddress}
                  onChangeText={handleChange('storeAddress')}
                  onBlur={handleBlur('storeAddress')}
                  mode="outlined"
                  right={
                    <TextInput.Icon name="home" color={COLORS.exciteGreen} />
                  }
                  style={{
                    marginBottom: 20,
                    backgroundColor: 'transparent',
                    color: COLORS.white,
                  }}
                  placeholderTextColor={'#888'}
                  placeholder="Store Address"
                  theme={{ colors: { text: COLORS.white } }}
                />
                <View style={{ marginBottom: 20 }}>
                {touched.storeState && errors.storeState ? (
                    <Text style={styles.error}>{errors.storeState}</Text>
                  ) : (
                    <Text style={{ color: '#888', marginBottom: 5 }}>
                      Select State
                    </Text>
                  )}
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 6,
                      height: 60,
                      justifyContent: 'center',
                      borderColor: '#191919',
                    }}
                  >
                    <Picker
                      selectedValue={values.storeState}
                      onValueChange={(itemValue, itemIndex) => {
                        // if (itemIndex === 0) return null
                        return setFieldValue('storeState', itemValue)
                      }}
                      mode="dropdown"
                      dropdownIconColor={COLORS.exciteGreen}
                    >
                      <Picker.Item
                        color={COLORS.lightGrayDark}
                        label="Select Purpose"
                        value={''}
                      />
                      {NigerianStates.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item}
                          value={item}
                          color={
                            values.storeState === item
                              ? COLORS.white
                              : COLORS.black
                          }
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                  {touched.storeLga && errors.storeLga ? (
                    <Text style={styles.error}>{errors.storeLga}</Text>
                  ) : (
                    <Text style={{ color: '#888', marginBottom: 5 }}>
                      Select LGA
                    </Text>
                  )}
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 6,

                      height: 60,
                      justifyContent: 'center',
                      borderColor: '#191919',
                    }}
                  >
                    <Picker
                      selectedValue={values.storeLga}
                      onValueChange={(itemValue, itemIndex) => {
                        if (itemIndex === 0) return null
                        return setFieldValue('storeLga', itemValue)
                      }}
                      mode="dropdown"
                      dropdownIconColor={COLORS.exciteGreen}
                      // style={{backgroundColor:'red'}}
                      itemStyle={{
                        backgroundColor: 'red',
                      }}
                    >
                      <Picker.Item
                        color={COLORS.lightGrayDark}
                        label="Select Purpose"
                        value={null}
                      />
                      {StateLgaArea(values.storeState)
                        ? StateLgaArea(values.storeState).map((item, index) => (
                            <Picker.Item
                              key={index}
                              label={item}
                              value={item}
                              color={
                                values.storeLga === item
                                  ? COLORS.white
                                  : COLORS.black
                              }
                            />
                          ))
                        : null}
                    </Picker>
                  </View>
                </View>
                {touched.storePhone && errors.storePhone ? (
                  <Text style={styles.error}>{errors.storePhone}</Text>
                ) : null}
                <TextInput
                  value={values.storePhone}
                  onChangeText={handleChange('storePhone')}
                  onBlur={handleBlur('storePhone')}
                  mode="outlined"
                  right={
                    <TextInput.Icon name="phone" color={COLORS.exciteGreen} />
                  }
                  style={{
                    marginBottom: 20,
                    backgroundColor: 'transparent',
                    color: COLORS.white,
                  }}
                  placeholderTextColor={'#888'}
                  placeholder="Phone Number"
                  theme={{ colors: { text: COLORS.white } }}
                  keyboardType="numeric"
                />
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
                  placeholderTextColor={'#888'}
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
                    <TextInput.Icon name="lock" color={COLORS.exciteGreen} />
                  }
                  style={{
                    marginBottom: 20,
                    backgroundColor: 'transparent',
                    color: COLORS.white,
                  }}
                  placeholderTextColor={'#888'}
                  placeholder="Password"
                  theme={{ colors: { text: COLORS.white } }}
                />
                <TextInput
                  // label="Email"
                  value={values.password2}
                  onChangeText={handleChange('password2')}
                  onBlur={handleBlur('password2')}
                  secureTextEntry
                  mode="outlined"
                  right={
                    <TextInput.Icon name="lock" color={COLORS.exciteGreen} />
                  }
                  style={{
                    marginBottom: 20,
                    backgroundColor: 'transparent',
                    color: COLORS.white,
                  }}
                  placeholderTextColor={'#888'}
                  placeholder="Confirm Password"
                  theme={{ colors: { text: COLORS.white } }}
                />
                <TextInput
                  // label="Email"
                  value={values.refCode}
                  onChangeText={handleChange('refCode')}
                  onBlur={handleBlur('refCode')}
                  mode="outlined"
                  right={
                    <TextInput.Icon
                      name="qrcode-scan"
                      color={COLORS.exciteGreen}
                    />
                  }
                  style={{
                    marginBottom: 20,
                    backgroundColor: 'transparent',
                    color: COLORS.white,
                  }}
                  placeholderTextColor={'#888'}
                  placeholder="Referral Code (Optional)"
                  theme={{ colors: { text: COLORS.white } }}
                />
                <TouchableOpacity disabled={isSubmit} onPress={() => handleSubmit()}>
                  <Button
                    style={{
                      marginBottom: 30,
                      marginTop:40,
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
                    Register
                  </Button>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
        <View style={styles.signup}>
          <Text style={{ color: COLORS.white }}>Have an account ?</Text>
          <Button onPress={() => navigation.navigate('Login')}>Login</Button>
        </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Register)

const styles = StyleSheet.create({
  root: {
    // paddingTop: 80,
    paddingHorizontal: SIZES.padding,
    // paddingBottom:40,
    // padding: SIZES.padding,
    backgroundColor: COLORS.exciteDark,
    flex: 1,
  },
  signup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 80,
  },
  error: {
    color: COLORS.red,
  },
})
