import * as React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

import { COLORS, FONTS } from '../../../../theme/theme'
import { AntDesign } from 'react-native-vector-icons'
import { Button } from 'react-native-paper'
import { authPay } from '../../../../slices/payment.slice'
import { connect, useDispatch } from 'react-redux'
import InitialzePayment from '../../../../apis/generatePay'

const SilverMonthly = ({ route, token, subscriptionLevel, cycle }) => {
  //
  const [isSubmit, setIsSubmit] = React.useState(false)
  const dispatch = useDispatch()
  const { navigation } = route
  const handlePay = async () => {
    setIsSubmit(true)
    const paymentDue = await InitialzePayment('qVaGuasMOm', token)
    setIsSubmit(false)

    if (paymentDue) {
      dispatch(authPay({ checked: true, payNow: { token: paymentDue.token } }))
      navigation.navigate('PaymentGate', paymentDue.decodedToken)
    }
    //   console.log(paymentDue);
  }

  const isCurrentPlan = () => {
    if (subscriptionLevel === 2 && cycle === 'Monthly') return true
    return false
  }
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.lightGray }}>
      <View style={styles.package}>
        <View style={styles.price}>
          <Text style={{ ...FONTS.h2 }}>NGN 5,000</Text>
        </View>
        <View style={styles.offer}>
          <View style={{ marginRight: 15 }}>
            <AntDesign
              size={20}
              name="checkcircle"
              color={COLORS.exciteGreen}
            />
          </View>
          <Text>Unlimited Product Listing</Text>
        </View>
        <View style={styles.offer}>
          <View style={{ marginRight: 15 }}>
            <AntDesign size={20} name="checkcircle" color={COLORS.exciteGreen} />
          </View>
          <Text>Book Keeping</Text>
        </View>
        <View style={styles.offer}>
          <View style={{ marginRight: 15 }}>
            <AntDesign size={20} name="closecircle" color={COLORS.red} />
          </View>
          <Text>Social Commerce</Text>
        </View>
        <View style={styles.offer}>
          <View style={{ marginRight: 15 }}>
            <AntDesign size={20} name="checkcircle" color={COLORS.exciteGreen} />
          </View>
          <Text>Banner Ads</Text>
        </View>
        <View>
          <TouchableOpacity
            disabled={isSubmit || isCurrentPlan()}
            onPress={() => handlePay()}
            style={{
              backgroundColor: isCurrentPlan()
                ? COLORS.exciteDark
                : COLORS.exciteGreen,
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {isSubmit && (
              <ActivityIndicator
                size="large"
                animating={isSubmit}
                color={COLORS.white}
                hidesWhenStopped={true}
              />
            )}
            <Button color={isCurrentPlan() ? COLORS.exciteGreen : COLORS.white}>
              {isCurrentPlan() ? 'Current Plan' : 'Subscribe'}
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  package: {
    padding: 20,
    // marginHorizontal:10,
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopColor: COLORS.exciteGreen,
    borderTopWidth: 3,
  },
  price: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    padding: 20,
    borderRadius: 20,
    width: '50%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  offer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
})

const mapStateToProps = (state) => {
  return {
    token: state.app?.token,
    subscriptionLevel: state.app?.me?.subscriptionLevel,
    subscriptionEnd: state.app?.me?.subscriptionEnd,
    cycle: state.app?.me?.cycle,
    user: state.app?.me?.fullname,
  }
}
export default connect(mapStateToProps)(SilverMonthly)
