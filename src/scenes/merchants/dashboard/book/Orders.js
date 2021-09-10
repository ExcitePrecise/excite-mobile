import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { Paragraph, Button } from 'react-native-paper'
import { colors } from 'theme'
import { connect } from 'react-redux'
// import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import useAxios from '../../../../utils/axios/init'
import OrderOptions from './OrderOptions'
import AddInventoryOrder from './AddInventoryOrder'

const Orders = ({ token, navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [OrderOptionsModal, setOrderOptionsModal] = useState(false)
  const [inventoryModal, setInventoryModal] = useState(false)
  const [product, setProduct] = useState({})
  const [expanded, setExpanded] = useState(true)
  const [orderData, setOrderData] = useState([])

  const handlePress = () => setExpanded(!expanded)

  const handleOrderOptionsModal = () => {
    setOrderOptionsModal(!OrderOptionsModal)
  }

  const handleAddInventoryOrderModal = () => {
    setInventoryModal(!inventoryModal)
  }

  // Get orders list
  const getOrders = () => {
    setLoading(true)
    useAxios
      .get('/receivables/all', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.records
          // console.log('orders data is ', res.data.records)
          setOrderData(
            data.sort((a, b) => {
              return (
                new Date(b.createdAt.split('T')[0]) -
                new Date(a.createdAt.split('T')[0])
              )
            }),
          )
          setLoading(false)
        } else {
          setLoading(false)
          return <Text>Oops! Could not fetch data.</Text>
        }
      })
      .catch((err) => console.log(err))
  }

  const wait = (timeout) =>
    new Promise((resolve) => setTimeout(resolve, timeout))

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getOrders()
    wait(2000).then(() => setRefreshing(false))
  }, [])

  useEffect(() => {
    getOrders()
  }, [])

  const calculateGrandTotal = () => {
    const itemArray = [...orderData]
    // console.log('itemArray ', itemArray);
    let total = 0
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < itemArray.length; i++) {
      total += itemArray[i].total
    }
    return total
  }

  const currencyFormat = (num) =>
    `N${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

  const SeparatorComponent = () => {
    return <View style={styles.separatorLine} />
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => {
        setOrderOptionsModal(true)
        setProduct(item)
      }}
    >
      <View style={styles.item}>
        <View style={styles.row}>
          <Text style={styles.itemText}>{item.productName}</Text>
        </View>
        <View style={styles.itemDetail}>
          <View style={styles.row}>
            <Text style={styles.detailTitle}>Price: </Text>
            <Text>{currencyFormat(item.price)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detailTitle}> Quantity: </Text>
            <Text>{item.quantity}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detailTitle}> Total: </Text>
            <Text>{currencyFormat(item.total)}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={{ color: 'gray' }}>Created: </Text>
          <Text style={{ color: 'gray' }}>{item.createdAt.split('T')[0]}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator color={colors.exciteGreen} size="large" />
      ) : (
        <View style={{ marginBottom: 170 }}>
          <View style={styles.summary}>
            <View style={styles.summaryDetailLeft}>
              <Text style={styles.titleLeft}>Pending Orders </Text>
              <Text style={styles.detailLeft}> {orderData.length} </Text>
            </View>
            <View style={styles.summaryDetailRight}>
              <Text style={styles.titleRight}>Value </Text>
              <Text style={styles.detailRight}>
                {currencyFormat(calculateGrandTotal())}
              </Text>
            </View>
          </View>

          <View style={styles.itemList}>
            <View style={styles.linkSect}>
              <View style={{ width: '50%' }}>
                <Button
                  icon="storefront-outline"
                  mode="text"
                  color="green"
                  style={{ borderColor: 'green' }}
                  onPress={() => navigation.navigate('Inventory')}
                >
                  Inventory
                </Button>
              </View>

              <View style={{ borderLeftWidth: 1 }}></View>

              <View style={{ width: '50%' }}>
                <Button
                  icon="credit-card"
                  mode="text"
                  color="green"
                  style={{ borderColor: 'green' }}
                  onPress={() => navigation.navigate('Sales')}
                >
                  Sales
                </Button>
              </View>
            </View>
          </View>

          <View style={{ marginHorizontal: 5 }}>
            <Text style={styles.title}> Pending Orders </Text>
            <Paragraph style={{ marginLeft: 5, color: 'gray' }}>
              Press and hold an order for more options.
            </Paragraph>
          </View>

          <FlatList
            data={orderData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={SeparatorComponent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
          <OrderOptions
            isOpen={OrderOptionsModal}
            handleOrderOptionsModal={handleOrderOptionsModal}
            item={product}
            handleAddInventoryOrderModal={handleAddInventoryOrderModal}
          />

          <AddInventoryOrder
            isOpen={inventoryModal}
            handleAddInventoryOrderModal={handleAddInventoryOrderModal}
            product={product}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(Orders)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 40,
  },
  summary: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryDetailLeft: {
    backgroundColor: colors.exciteGreen,
    width: '50%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  summaryDetailRight: {
    backgroundColor: 'black',
    width: '50%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  titleLeft: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  titleRight: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  detailLeft: {
    fontSize: 22,
    color: 'black',
  },
  detailRight: {
    fontSize: 22,
    color: 'white',
  },
  title: {
    fontSize: 20,
  },
  separatorLine: {
    height: 1,
    paddingTop: 2,
    backgroundColor: '#EEEEEE',
  },
  itemList: {
    justifyContent: 'space-between',
    backgroundColor: '#F7FAE9',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  linkSect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 18,
  },
  itemDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  detailTitle: {
    color: 'green',
  },
  row: {
    flexDirection: 'row',
  },
})

// // ************************ Orders backup 2 *****************************
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
//   Platform,
// } from 'react-native'
// import { Paragraph, Button } from 'react-native-paper'
// import { colors } from 'theme'
// import { connect } from 'react-redux'
// // import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
// import useAxios from '../../../../utils/axios/init'
// import OrderOptions from './OrderOptions'
// import AddInventoryOrder from './AddInventoryOrder'

// // ************************** Push notification section **********************
// import Constants from 'expo-constants'
// import * as Notifications from 'expo-notifications'

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// })
// // ************************ End Push notification section **********************

// const Orders = ({ token, navigation }) => {
//   const [refreshing, setRefreshing] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [OrderOptionsModal, setOrderOptionsModal] = useState(false)
//   const [inventoryModal, setInventoryModal] = useState(false)
//   const [product, setProduct] = useState({})
//   const [expanded, setExpanded] = useState(true)
//   const [orderData, setOrderData] = useState([])

//   const handlePress = () => setExpanded(!expanded)

//   // const handleLongPress = () => {
//   //   console.log('pressed long!')
//   // }

//   const handleOrderOptionsModal = () => {
//     setOrderOptionsModal(!OrderOptionsModal)
//   }

//   const handleAddInventoryOrderModal = () => {
//     setInventoryModal(!inventoryModal)
//   }

//   // Get orders list
//   const getOrders = () => {
//     setLoading(true)
//     // setTimeout(() => {
//     //   setLoading(false)
//     //   return alert('Oops! Something went wrong.')
//     // }, 10000)
//     useAxios
//       .get('/receivables/all', {
//         headers: { authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         if (res.status == 200) {
//           const data = res.data.records
//           // console.log('orders data is ', res.data.records)
//           setOrderData(
//             data.sort((a, b) => {
//               return (
//                 new Date(b.createdAt.split('T')[0]) -
//                 new Date(a.createdAt.split('T')[0])
//               )
//             }),
//           )
//           setLoading(false)
//         } else {
//           setLoading(false)
//           return <Text>Oops! Could not fetch data.</Text>
//         }
//       })
//       .catch((err) => console.log(err))
//   }

//   const wait = (timeout) =>
//     new Promise((resolve) => setTimeout(resolve, timeout))

//   const onRefresh = useCallback(() => {
//     setRefreshing(true)
//     getOrders()
//     wait(2000).then(() => setRefreshing(false))
//   }, [])

//   useEffect(() => {
//     getOrders()
//   }, [])

//   const calculateGrandTotal = () => {
//     const itemArray = [...orderData]
//     // console.log('itemArray ', itemArray);
//     let total = 0
//     // eslint-disable-next-line no-plusplus
//     for (let i = 0; i < itemArray.length; i++) {
//       total += itemArray[i].total
//     }
//     return total
//   }

//   const currencyFormat = (num) =>
//     `N${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

//   const SeparatorComponent = () => {
//     return <View style={styles.separatorLine} />
//   }

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onLongPress={() => {
//         setOrderOptionsModal(true)
//         setProduct(item)
//       }}
//     >
//       <View style={styles.item}>
//         <View style={styles.row}>
//           <Text style={styles.itemText}>{item.productName}</Text>
//         </View>
//         <View style={styles.itemDetail}>
//           <View style={styles.row}>
//             <Text style={styles.detailTitle}>Price: </Text>
//             <Text>{currencyFormat(item.price)}</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.detailTitle}> Quantity: </Text>
//             <Text>{item.quantity}</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.detailTitle}> Total: </Text>
//             <Text>{currencyFormat(item.total)}</Text>
//           </View>
//         </View>
//         <View style={styles.row}>
//           <Text style={{ color: 'gray' }}>Created: </Text>
//           <Text style={{ color: 'gray' }}>{item.createdAt.split('T')[0]}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   )

//   //***************** Push notification section 2 ************************/
//   const [expoPushToken, setExpoPushToken] = useState('')
//   const [notification, setNotification] = useState(false)
//   const notificationListener = useRef()
//   const responseListener = useRef()

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

//     // This listener is fired whenever a notification is received while the app is foregrounded
//     notificationListener.current = Notifications.addNotificationReceivedListener(
//       (notification) => {
//         setNotification(notification)
//       },
//     )

//     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
//     responseListener.current = Notifications.addNotificationResponseReceivedListener(
//       (response) => {
//         console.log(response)
//       },
//     )

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener.current)
//       Notifications.removeNotificationSubscription(responseListener.current)
//     }
//   }, [])
//   //******************** End Push notification section 2 ************************ */

//   return (
//     <SafeAreaView style={styles.container}>
//       {loading ? (
//         <ActivityIndicator color={colors.exciteGreen} size="large" />
//       ) : (
//         <View style={{ marginBottom: 170 }}>
//           <View style={styles.summary}>
//             <View style={styles.summaryDetailLeft}>
//               <Text style={styles.titleLeft}>Pending Orders </Text>
//               <Text style={styles.detailLeft}> {orderData.length} </Text>
//             </View>
//             <View style={styles.summaryDetailRight}>
//               <Text style={styles.titleRight}>Value </Text>
//               <Text style={styles.detailRight}>
//                 {currencyFormat(calculateGrandTotal())}
//               </Text>
//             </View>
//           </View>

//           <View style={styles.itemList}>
//             <View style={styles.linkSect}>
//               <View style={{ width: '50%' }}>
//                 <Button
//                   icon="storefront-outline"
//                   mode="text"
//                   color="green"
//                   style={{ borderColor: 'green' }}
//                   onPress={() => navigation.navigate('Inventory')}
//                 >
//                   Inventory
//                 </Button>
//               </View>

//               <View style={{ borderLeftWidth: 1 }}></View>

//               <View style={{ width: '50%' }}>
//                 <Button
//                   icon="credit-card"
//                   mode="text"
//                   color="green"
//                   style={{ borderColor: 'green' }}
//                   onPress={() => navigation.navigate('Sales')}
//                 >
//                   Sales
//                 </Button>
//               </View>
//             </View>
//           </View>

//           <View style={{ marginHorizontal: 5 }}>
//             <Text style={styles.title}> Pending Orders </Text>
//             <Paragraph style={{ marginLeft: 5, color: 'gray' }}>
//               Press and hold an order for more options.
//             </Paragraph>
//           </View>

//           <FlatList
//             data={orderData}
//             renderItem={renderItem}
//             keyExtractor={(item) => item._id}
//             ItemSeparatorComponent={SeparatorComponent}
//             refreshControl={
//               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//             }
//           />
//           <OrderOptions
//             isOpen={OrderOptionsModal}
//             handleOrderOptionsModal={handleOrderOptionsModal}
//             item={product}
//             handleAddInventoryOrderModal={handleAddInventoryOrderModal}
//           />

//           <AddInventoryOrder
//             isOpen={inventoryModal}
//             handleAddInventoryOrderModal={handleAddInventoryOrderModal}
//             product={product}
//           />
//         </View>
//       )}
//     </SafeAreaView>
//   )
// }

// const mapStateToProps = (state) => ({
//   token: state?.app?.token,
// })

// export default connect(mapStateToProps)(Orders)

// // *********************** Push NOtification section****************************
// // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   }

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   })
// }

// async function registerForPushNotificationsAsync() {
//   let token
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync()
//     let finalStatus = existingStatus
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync()
//       finalStatus = status
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!')
//       return
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data
//     console.log(token)
//   } else {
//     alert('Must use physical device for Push Notifications')
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     })
//   }

//   return token
// }
// // **************************** End Push notification section

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     paddingBottom: 40,
//   },
//   summary: {
//     flexDirection: 'row',
//     marginTop: 5,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   summaryDetailLeft: {
//     backgroundColor: colors.exciteGreen,
//     width: '50%',
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   summaryDetailRight: {
//     backgroundColor: 'black',
//     width: '50%',
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   titleLeft: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: 'black',
//   },
//   titleRight: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: 'white',
//   },
//   detailLeft: {
//     fontSize: 22,
//     color: 'black',
//   },
//   detailRight: {
//     fontSize: 22,
//     color: 'white',
//   },
//   title: {
//     fontSize: 20,
//   },
//   separatorLine: {
//     height: 1,
//     paddingTop: 2,
//     backgroundColor: '#EEEEEE',
//   },
//   itemList: {
//     justifyContent: 'space-between',
//     backgroundColor: '#F7FAE9',
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//     marginBottom: 10,
//   },
//   linkSect: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   item: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   itemText: {
//     fontSize: 18,
//   },
//   itemDetail: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 5,
//   },
//   detailTitle: {
//     color: 'green',
//   },
//   row: {
//     flexDirection: 'row',
//   },
// })
// // *********************** END Orders backup 2 **************************

// // ************** backup code for Orders **********************
// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
//   Platform,
// } from 'react-native'
// import { Paragraph, Button } from 'react-native-paper'
// import { colors } from 'theme'
// import { connect } from 'react-redux'
// // import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
// import useAxios from '../../../../utils/axios/init'
// import OrderOptions from './OrderOptions'
// import AddInventoryOrder from './AddInventoryOrder'

// // ************************** Push notification section **********************
// import Constants from 'expo-constants'
// import * as Notifications from 'expo-notifications'

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// })
// // ************************ End Push notification section **********************

// const Orders = ({ token, navigation }) => {
//   const [refreshing, setRefreshing] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [OrderOptionsModal, setOrderOptionsModal] = useState(false)
//   const [inventoryModal, setInventoryModal] = useState(false)
//   const [product, setProduct] = useState({})
//   const [expanded, setExpanded] = useState(true)
//   const [orderData, setOrderData] = useState([])

//   const handlePress = () => setExpanded(!expanded)

//   // const handleLongPress = () => {
//   //   console.log('pressed long!')
//   // }

//   const handleOrderOptionsModal = () => {
//     setOrderOptionsModal(!OrderOptionsModal)
//   }

//   const handleAddInventoryOrderModal = () => {
//     setInventoryModal(!inventoryModal)
//   }

//   // Get orders list
//   const getOrders = () => {
//     setLoading(true)
//     useAxios
//       .get('/receivables/all', {
//         headers: { authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         if (res.status == 200) {
//           const data = res.data.records
//           // console.log('orders data is ', res.data.records)
//           setOrderData(
//             data.sort((a, b) => {
//               return (
//                 new Date(b.createdAt.split('T')[0]) -
//                 new Date(a.createdAt.split('T')[0])
//               )
//             }),
//           )
//           setLoading(false)
//         } else {
//           return <p>Oops! Could not fetch data.</p>
//         }
//       })
//       .catch((err) => console.log(err))
//   }

//   const wait = (timeout) =>
//     new Promise((resolve) => setTimeout(resolve, timeout))

//   const onRefresh = useCallback(() => {
//     setRefreshing(true)
//     getOrders()
//     wait(2000).then(() => setRefreshing(false))
//   }, [])

//   useEffect(() => {
//     getOrders()
//   }, [])

//   const calculateGrandTotal = () => {
//     const itemArray = [...orderData]
//     // console.log('itemArray ', itemArray);
//     let total = 0
//     // eslint-disable-next-line no-plusplus
//     for (let i = 0; i < itemArray.length; i++) {
//       total += itemArray[i].total
//     }
//     return total
//   }

//   const currencyFormat = (num) =>
//     `N${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

//   const SeparatorComponent = () => {
//     return <View style={styles.separatorLine} />
//   }

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onLongPress={() => {
//         setOrderOptionsModal(true)
//         setProduct(item)
//       }}
//     >
//       <View style={styles.item}>
//         <View style={styles.row}>
//           <Text style={styles.itemText}>{item.productName}</Text>
//         </View>
//         <View style={styles.itemDetail}>
//           <View style={styles.row}>
//             <Text style={styles.detailTitle}>Price: </Text>
//             <Text>{currencyFormat(item.price)}</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.detailTitle}> Quantity: </Text>
//             <Text>{item.quantity}</Text>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.detailTitle}> Total: </Text>
//             <Text>{currencyFormat(item.total)}</Text>
//           </View>
//         </View>
//         <View style={styles.row}>
//           <Text style={{ color: 'gray' }}>Created: </Text>
//           <Text style={{ color: 'gray' }}>{item.createdAt.split('T')[0]}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   )

//   //***************** Push notification section ************************/
//   const [expoPushToken, setExpoPushToken] = useState('')
//   const [notification, setNotification] = useState(false)
//   const notificationListener = useRef()
//   const responseListener = useRef()

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

//     // This listener is fired whenever a notification is received while the app is foregrounded
//     notificationListener.current = Notifications.addNotificationReceivedListener(
//       (notification) => {
//         setNotification(notification)
//       },
//     )

//     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
//     responseListener.current = Notifications.addNotificationResponseReceivedListener(
//       (response) => {
//         console.log(response)
//       },
//     )

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener.current)
//       Notifications.removeNotificationSubscription(responseListener.current)
//     }
//   }, [])
//   //******************** End Push notification ************************ */

//   return (
//     <SafeAreaView style={styles.container}>
//       {loading ? (
//         <ActivityIndicator color={colors.exciteGreen} size="large" />
//       ) : (
//         <View style={{ marginBottom: 170 }}>
//           <View style={styles.summary}>
//             <View style={styles.summaryDetailLeft}>
//               <Text style={styles.titleLeft}>Pending Orders </Text>
//               <Text style={styles.detailLeft}> {orderData.length} </Text>
//             </View>
//             <View style={styles.summaryDetailRight}>
//               <Text style={styles.titleRight}>Value </Text>
//               <Text style={styles.detailRight}>
//                 {currencyFormat(calculateGrandTotal())}
//               </Text>
//             </View>
//           </View>

//           <View style={styles.itemList}>
//             <View style={styles.linkSect}>
//               <View style={{ width: '50%' }}>
//                 <Button
//                   icon="storefront-outline"
//                   mode="text"
//                   color="black"
//                   style={{ borderColor: 'black' }}
//                   onPress={() => navigation.navigate('Inventory')}
//                 >
//                   Inventory
//                 </Button>
//               </View>

//               <View style={{ borderLeftWidth: 1 }}></View>

//               <View style={{ width: '50%' }}>
//                 <Button
//                   icon="credit-card"
//                   mode="text"
//                   color="black"
//                   style={{ borderColor: 'black' }}
//                   onPress={() => navigation.navigate('Sales')}
//                 >
//                   Sales
//                 </Button>
//               </View>
//             </View>
//           </View>

//           {/* ************************* Push notification section ******************** */}
//           <View
//             style={
//               {
//                 // flex: 1,
//                 // alignItems: 'center',
//                 // justifyContent: 'space-around',
//               }
//             }
//           >
//             {/* <Text>Your expo push token: {expoPushToken}</Text> */}
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//               <Text>
//                 Title: {notification && notification.request.content.title}
//               </Text>
//               <Text>
//                 Body: {notification && notification.request.content.body}
//               </Text>
//               <Text>
//                 Data:
//                 {notification &&
//                   JSON.stringify(notification.request.content.data)}
//               </Text>
//             </View>
//             <Button
//               color="blue"
//               onPress={async () => {
//                 await sendPushNotification(expoPushToken)
//               }}
//             >
//               Test Excite Push notification
//             </Button>
//           </View>
//           {/* *********************** End Push notification section ************* */}

//           <View style={{ marginHorizontal: 5 }}>
//             <Text style={styles.title}> Pending Orders </Text>
//             <Paragraph style={{ marginLeft: 5, color: 'gray' }}>
//               Press and hold an order for more options.
//             </Paragraph>
//           </View>

//           <FlatList
//             data={orderData}
//             renderItem={renderItem}
//             keyExtractor={(item) => item._id}
//             ItemSeparatorComponent={SeparatorComponent}
//             refreshControl={
//               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//             }
//           />
//           <OrderOptions
//             isOpen={OrderOptionsModal}
//             handleOrderOptionsModal={handleOrderOptionsModal}
//             item={product}
//             handleAddInventoryOrderModal={handleAddInventoryOrderModal}
//           />

//           <AddInventoryOrder
//             isOpen={inventoryModal}
//             handleAddInventoryOrderModal={handleAddInventoryOrderModal}
//             product={product}
//           />
//         </View>
//       )}
//     </SafeAreaView>
//   )
// }

// const mapStateToProps = (state) => ({
//   token: state?.app?.token,
// })

// export default connect(mapStateToProps)(Orders)

// // *********************** Push NOtification section****************************
// // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   }

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   })
// }

// async function registerForPushNotificationsAsync() {
//   let token
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync()
//     let finalStatus = existingStatus
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync()
//       finalStatus = status
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!')
//       return
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data
//     console.log(token)
//   } else {
//     alert('Must use physical device for Push Notifications')
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     })
//   }

//   return token
// }
// // **************************** End Push notification section

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     paddingBottom: 40,
//   },
//   summary: {
//     flexDirection: 'row',
//     marginTop: 5,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   summaryDetailLeft: {
//     backgroundColor: colors.exciteGreen,
//     width: '50%',
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   summaryDetailRight: {
//     backgroundColor: 'black',
//     width: '50%',
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   titleLeft: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: 'black',
//   },
//   titleRight: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: 'white',
//   },
//   detailLeft: {
//     fontSize: 22,
//     color: 'black',
//   },
//   detailRight: {
//     fontSize: 22,
//     color: 'white',
//   },
//   title: {
//     fontSize: 20,
//   },
//   separatorLine: {
//     height: 1,
//     paddingTop: 2,
//     backgroundColor: '#EEEEEE',
//   },
//   itemList: {
//     justifyContent: 'space-between',
//     backgroundColor: '#F7FAE9',
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//     marginBottom: 10,
//   },
//   linkSect: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   item: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   itemText: {
//     fontSize: 18,
//   },
//   itemDetail: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 5,
//   },
//   detailTitle: {
//     color: 'green',
//   },
//   row: {
//     flexDirection: 'row',
//   },
// })
