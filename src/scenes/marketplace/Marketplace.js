import React, { useState, useEffect, useRef } from 'react'

import { ScrollView, RefreshControl, Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import ExciteBanner from './landingchunks/ExciteBanner'
import PopularCategorySwitch from './landingchunks/PopularCategorySwitch'
import { landingProduct } from '../../slices/marketplace.slice'
import {
  isLoading,
  setTabIcon,
  setTitle,
  popBanner,
} from '../../slices/app.slice'
import useAxios from '../../utils/axios/init'
import ActivityLoading from '../../utils/axios/Loading'
import BannerNotification from '../../components/BannerNotification'

// ************************** Push notification section **********************
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})
// ************************ End Push notification section **********************

export default function Marketplace({ navigation }) {
  // Refresh control
  const [refreshing, setRefreshing] = useState(false)
  const [checkPushData, setCheckPushData] = useState([])
  const [pushData, setPushData] = useState([])

  //
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      dispatch(isLoading(true))
      // setRefreshing(true)
      const response = await useAxios.get(
        '/marketplace/landing/products/banners/offers/get',
      )
      const { data } = response
      // const productCount = data.product.length

      // console.log(response)
      dispatch(isLoading(false))
      dispatch(landingProduct(data))
      setRefreshing(false)
    } catch (error) {
      dispatch(isLoading(false))
      setRefreshing(false)
      dispatch(
        popBanner({ visible: true, msg: 'Network Error', type: 'error' }),
      )
      console.log('err', error)
    }
  }

  // post push status in db
  const postPush = () => {
    // send push notification first before creating new push collection
    const postData = {
      postSent: true,
    }
    useAxios
      .post('pushnotification/push/new', postData)
      .then((response) => {
        if (response.status === 201) {
          sendPushNotification(expoPushToken)
          console.log('Push sent. Var created.')
        } else {
          console.log('Something went wroong in POST')
        }
      })
      .catch((error) => console.error(error))
  }

  // update push status in db to false
  const updatePushValue = () => {
    const data = {
      pushSent: false,
    }
    const _id = checkPushData[0]._id
    useAxios
      .put(`pushnotification/push/${_id}`, data)
      .then((response) => {
        if (response.status === 202) {
          sendPushNotification(expoPushToken)
          console.log('Push data updated')
        } else {
          console.log('Something went wrong in UPDATE!')
        }
      })
      .catch((error) => console.error(error))
  }

  // Get pushSent status from db
  const getPushValue = () => {
    useAxios
      .get('pushnotification/push')
      .then((response) => {
        if (response.status === 200) {
          setCheckPushData(response.data.result)

          // if there is no pushsent data in db already, send post new (and send not..)
          if (checkPushData.length < 1) {
            postPush()
          }
          // if pushSent data already exists, compare last sent date and pushSent status
          // else (checkPushData.length > 0) {
          else {
            const todayString = JSON.stringify(new Date()).split('T')[0]
            const dbString = JSON.stringify(
              checkPushData[0].updatedAt.split('T')[0],
            )
            const today = todayString.split('"')[1]
            const dbDate = dbString.split('"')[1]
            if (today != dbDate) {
              updatePushValue()
            }
            // if (!checkPushData[0].pushSent) {
            //   // check if value of pushSent is false
            //   postPush()
            //   console.log('pushSent isv ', checkPushData[0].pushSent)
            //   return // if true do nothiing
            // }
          }
        } else {
          console.log('something went wrong in GET!')
        }
      })
      .catch((error) => console.log(error))
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getData()
  }, [])

  useEffect(() => {
    getData()
    getPushValue()
    // clean up
    return () => setRefreshing(false)
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setTitle({ title: 'Marketplace' }))
      dispatch(setTabIcon({ icon: 'shopping-bag' }))
    })
    return unsubscribe
  }, [navigation])

  //***************** Push notification section 2 ************************/
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification)
      },
    )

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response)
      },
    )

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])
  //******************** End Push notification section 2 ************************ */

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <BannerNotification />
      <ExciteBanner />
      {/* <TouchableOpacity > */}
      <ActivityLoading />
      {/* </TouchableOpacity> */}
      <PopularCategorySwitch navigation={navigation} />
    </ScrollView>
  )
}

// *********************** Push NOtification section 3 ****************************
// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Excite Market',
    body: 'New product available. Check it out!',
    data: { someData: 'goes here' },
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}

async function registerForPushNotificationsAsync() {
  let token
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}
// **************************** End Push notification section 3 *******************************
