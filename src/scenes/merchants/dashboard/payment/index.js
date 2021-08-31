import React from 'react'
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Paystack } from 'react-native-paystack-webview'
import { connect, useDispatch } from 'react-redux'
import { authPayClose } from './../../../../slices/payment.slice'
import useAxios from '../../../../utils/axios/init'
import api from './../../../../apis'
import { saveMe } from '../../../../slices/app.slice'
import { COLORS } from '../../../../theme/theme'

function NoPendingPayment({ navigation }) {
  React.useEffect(() => {
    navigation.navigate('Subscription')
  }, [])
  return (
    <View style={{flex:1,backgroundColor:COLORS.exciteDark}}>
     
    </View>
  )
}

function Pay({ navigation, route, checked, payment,tokenize }) {
  // console.log(checked)
  const { email, amount } = route?.params
  // console.log(email, tokenize)
  const dispatch = useDispatch()
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Alert.alert('Refreshed');
    })
    return unsubscribe
  }, [navigation])

  if (!checked || !email || !payment ) return <NoPendingPayment navigation={navigation} />
  return (
    <View style={{ flex: 1 }}>
      <Paystack
        paystackKey="pk_live_c053ad4ddddf11c95515540f2c032974bdcd04c1"
        amount={`${amount / 100}.00`}
        billingEmail={email}
        activityIndicatorColor="green"
        onCancel={(e) => {
          // handle response here

          console.log(e)
          dispatch(authPayClose())

          navigation.navigate('Subscription')
        }}
        onSuccess={async (res) => {
          // handle response here
          try {
            const response = await useAxios.post(
              '/paystack/confirm/subscription',{ref: res, token: payment.token },
              { 
                headers: {
                  authorization: `Bearer ${tokenize}`,
                }
              }
            )
            dispatch(authPayClose())
            if (response.data.code === 201) {
              // console.log('success');
              const updatedProfile = await api.getProfileInfo(tokenize);
              if(updatedProfile){
                dispatch(saveMe({me:updatedProfile}));
              }
              Alert.alert("Payment successful");
              navigation.navigate('Subscription')
            } else {
             return Alert.alert("Sorry, an error occured");
            }
          } catch (error) {
            Alert.alert(`Sorry an error occured ${error?.message}`);
            dispatch(authPayClose())
            // console.log(error.message)
          }
        }}
        autoStart={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

const mapStateToProps = (state) => {
  return {
    checked: state?.payment?.checked,
    payment: state?.payment?.payNow,
    tokenize:state.app?.token

  }
}
export default connect(mapStateToProps)(Pay)

