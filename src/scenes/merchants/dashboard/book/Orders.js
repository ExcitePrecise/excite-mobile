import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Paragraph, Modal, Banner, Button } from 'react-native-paper'
import { colors, images } from 'theme'
import { connect } from 'react-redux'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import useAxios from '../../../../utils/axios/init'
import OrderOptions from './OrderOptions'
import AddInventoryOrder from './AddInventoryOrder'

const Orders = ({ token, navigation }) => {
  // const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [OrderOptionsModal, setOrderOptionsModal] = useState(false)
  const [inventoryModal, setInventoryModal] = useState(false)
  const [product, setProduct] = useState({})
  const [expanded, setExpanded] = useState(true)
  const [orderData, setOrderData] = useState([])

  const handlePress = () => setExpanded(!expanded)

  // const handleLongPress = () => {
  //   console.log('pressed long!')
  // }

  // const wait = (timeout) =>
  //   new Promise((resolve) => setTimeout(resolve, timeout))
  //
  // const onRefresh = useCallback(() => {
  //   setRefreshing(true)
  //   wait(2000).then(() => setRefreshing(false))
  // }, [])

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
          return <p>Oops! Could not fetch data.</p>
        }
      })
      .catch((err) => console.log(err))
  }

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
          <Text style={{ color: 'gray' }}>Date: </Text>
          <Text style={{ color: 'gray' }}>{item.createdAt.split('T')[0]}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const currencyFormat = (num) =>
    `N${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

  const SeparatorComponent = () => {
    return <View style={styles.separatorLine} />
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator color={colors.exciteGreen} size="large" />
      ) : (
        <View>
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
              <Button
                icon="storefront-outline"
                mode="outlined"
                color="black"
                style={{ borderColor: 'black' }}
                onPress={() => navigation.navigate('Inventory')}
              >
                View Inventory
              </Button>
              <Button
                icon="credit-card"
                mode="outlined"
                color="black"
                style={{ borderColor: 'black' }}
                onPress={() => navigation.navigate('Sales')}
              >
                View Sales
              </Button>
            </View>
            <Text style={styles.title}> Pending Orders </Text>
            <Paragraph style={{ marginLeft: 5 }}>
              Press and hold for more options.
            </Paragraph>
          </View>

          <FlatList
            data={orderData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={SeparatorComponent}
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
  },
  linkSect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
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

// success: {
//   color: 'green',
//   paddingHorizontal: 5,
// },
// danger: {
//   color: 'red',
//   paddingHorizontal: 5,
// },
// hr: {
//   borderBottomColor: '#EEEEEE',
//   borderBottomWidth: 1,
//   marginHorizontal: 40,
//   marginVertical: 15,
// },

// {item.qtySold - item.salesTarget > 0 ? (
//   <View style={styles.row}>
//     <Text style={styles.success}>
//       {item.qtySold - item.salesTarget}
//     </Text>
//     <FontAwesome5
//       style={{ paddingHorizontal: 10 }}
//       name="arrow-up"
//       size={12}
//       color={colors.exciteGreen}
//     />
//   </View>
// ) : item.qtySold - item.salesTarget < 0 ? (
//   <View style={styles.row}>
//     {/* <Text style={styles.danger}>
//      {item.qtySold - item.salesTarget}
//    </Text> */}

//     <FontAwesome5
//       style={{ paddingHorizontal: 10 }}
//       name="arrow-down"
//       size={12}
//       color="red"
//     />
//   </View>
// ) : (
//   <Text> - </Text>
// )}
