import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
//

import { colors } from 'theme'
import { TextInput, Button } from 'react-native-paper'
import { COLORS } from '../../theme/theme'
import { connect, useDispatch } from 'react-redux'
import useAxios from '../../utils/axios/init'
import { popBanner } from '../../slices/app.slice'
import BannerNotification from '../../components/BannerNotification'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bg,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  error:{
    color:COLORS.red
  }
})

const Profile = ({ navigation, token, banner }) => {
 
  
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          marginVertical: 30,
          paddingBottom: 40,
        }}
      >
        <BannerNotification />
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          validationSchema={Yup.object({
            oldPassword: Yup.string()
              .max(150,'Maximum number of character reached')
              .required('Current password is required'),
            newPassword: Yup.string().min(8,'Minimum of 8 characters is required').max(150,'Maximum number of character reached').required('New password is required'),
            confirmNewPassword: Yup.string().min(8,'Minimum of 8 characters is required').max(150,'Maximum number of character reached').required('Confirm password'),
          })}
          onSubmit={async (values) => {
            try {
              const response = await useAxios.post(
                '/change-password/update',
                { ...values },
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                  },
                },
              )
              const {code,message} = response.data
             
              // console.log(response.data)
              if (code===200) {
                return banner({visible:true,msg:message, type:'success'})
              } 
              if (code===404) {
                return banner({visible:true,msg:message, type:'error'})
              } 
              if (code===401) {
                return banner({visible:true,msg:message, type:'error'})
              } 
            } catch (error) {
            console.log(error)
              banner({
                visible: true,
                msg: 'Network error occured',
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
            isSubmitting,
            setSubmitting,
            resetForm
          }) => (
            <View style={{ marginHorizontal: 20 }}>
              <View style={{ marginBottom: 10 }}>
              {touched.oldPassword && errors.oldPassword ? (
                  <Text style={styles.error}>{errors.oldPassword}</Text>
                ) : null}
                <TextInput
                  mode="outlined"
                  style={{ color: COLORS.exciteDark }}
                  placeholder="Current Password"
                  label="Current Password"
                  value={values.oldPassword}
                  onChangeText={handleChange('oldPassword')}
                  onBlur={handleBlur('oldPassword')}

                />
              </View>
              <View style={{ marginBottom: 10 }}>
              {touched.newPassword && errors.newPassword ? (
                  <Text style={styles.error}>{errors.newPassword}</Text>
                ) : null}
                <TextInput
                  mode="outlined"
                  placeholder="New Password"
                  label="New Password"
                  value={values.newPassword}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}

                />
              </View>
              <View style={{ marginBottom: 10 }}>
              {touched.confirmNewPassword && errors.confirmNewPassword ? (
                  <Text style={styles.error}>{errors.confirmNewPassword}</Text>
                ) : null}
                <TextInput
                  mode="outlined"
                  placeholder="Confirm New Password"
                  label="New Password"
                  value={values.confirmNewPassword}
                  onChangeText={handleChange('confirmNewPassword')}
                  onBlur={handleBlur('confirmNewPassword')}
                />
              </View>
              <Button
                loading={isSubmitting}
                mode="contained"
                style={{ marginTop: 30, height: 50, justifyContent: 'center' }}
                onPress={handleSubmit}
              >
                Change
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.app?.token,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    banner: (payload) => dispatch(popBanner(payload)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
