import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { Button } from 'react-native-paper'
import { colors } from 'theme'
import { connect } from 'react-redux'
// import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { showMessage } from 'react-native-flash-message'
import useAxios from '../../../../utils/axios/init'

const Sales = ({ token, navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const [salesData, setSalesData] = useState([])

  const handlePress = () => setExpanded(!expanded)

  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  // Get sales list
  const getSales = () => {
    setLoading(true)
    useAxios
      .get('/sales/all', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.records
          setSalesData(
            data.sort(
              (a, b) =>
                new Date(b.createdAt.split('T')[0]) -
                new Date(a.createdAt.split('T')[0]),
            ),
          )
          setLoading(false)
        } else {
          return showMessage({
            message: 'Operation failed!',
            description: 'Something went wrong!.',
            type: 'danger',
            icon: 'auto',
          })
        }
      })
      .catch((err) => {
        console.log(err)
        return showMessage({
          message: 'Operation failed!',
          description: 'Something went wrong!.',
          type: 'danger',
          icon: 'auto',
        })
      })
  }

  const wait = (timeout) =>
    new Promise((resolve) => setTimeout(resolve, timeout))

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getSales()
    wait(2000).then(() => setRefreshing(false))
  }, [])

  useEffect(() => {
    getSales()
  }, [])

  const calculateGrandTotal = () => {
    const itemArray = [...salesData]
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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.productName}</Text>
      <View style={styles.itemDetail}>
        <View style={styles.row}>
          <Text style={styles.detailTitle}>Sale Price: </Text>
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
  )

  const SeparatorComponent = () => <View style={styles.separatorLine} />

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator color={colors.exciteGreen} size="large" />
      ) : (
        <View style={{ marginBottom: 150 }}>
          <View style={styles.summary}>
            <View style={styles.summaryDetailLeft}>
              <Text style={styles.titleLeft}>Sales </Text>
              <Text style={styles.detailLeft}> {salesData.length} </Text>
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

              <View style={{ borderLeftWidth: 1 }} />

              <View style={{ width: '50%' }}>
                <Button
                  icon="cart"
                  mode="text"
                  color="green"
                  style={{ borderColor: 'green' }}
                  onPress={() => navigation.navigate('Orders')}
                >
                  Pending Orders
                </Button>
              </View>
            </View>
          </View>

          <View style={{ marginHorizontal: 5 }}>
            <Text style={styles.title}> All Sales </Text>
          </View>

          <FlatList
            data={salesData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={SeparatorComponent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      )}
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(Sales)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 50,
    // paddingBottom: 5,
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
  detail: {
    fontSize: 22,
    color: 'white',
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
  header: {
    // marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 40,
    justifyContent: 'space-between',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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
