import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import  { Paystack }  from 'react-native-paystack-webview';

function Pay({navigation}) {
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // Alert.alert('Refreshed');
          // getData()
        })
        return unsubscribe
      }, [navigation])
  return (
    <View style={{ flex: 1 }}>
      <Paystack  
        paystackKey="pk_test_7e846027dc74db0ebcb7df2366974ae072b34b1d"
        amount={'25000.00'}
        billingEmail="kazeem.ojotu@exciteafrica.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
          // handle response here
          console.log(e)
        }}
        onSuccess={(res) => {
          // handle response here
          console.log(res)
        }}
        autoStart={true}
      />
    </View>
  );
}

export default Pay

const styles = StyleSheet.create({})
