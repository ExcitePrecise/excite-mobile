import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import { Paragraph, Button } from 'react-native-paper'
import { colors } from 'theme'
import { connect } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import useAxios from '../../../../utils/axios/init'
import InventoryOptions from './InventoryOptions'
import AddInventoryOrder from './AddInventoryOrder'

const Inventory = ({ token, navigation, userSub }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [inventoryOptionsModal, setInventoryOptionsModal] = useState(false)
  const [inventoryModal, setInventoryModal] = useState(false)
  const [product, setProduct] = useState({})
  const [expanded, setExpanded] = useState(true)
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleInventoryOptionsModal = () => {
    setInventoryOptionsModal(!inventoryOptionsModal)
  }

  const handleAddInventoryOrderModal = () => {
    setInventoryModal(!inventoryModal)
  }

  // Get products in store list
  const getInventory = () => {
    setLoading(true)
    useAxios
      .get('/book-keeping/all', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.records
          console.log('books data is ', res.data.records)
          setTableData(data)
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
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getInventory()
  }, [])

  const calculateGrandTotal = () => {
    const itemArray = [...tableData]
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
        setInventoryOptionsModal(true)
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
      </View>
    </TouchableOpacity>
  )

  const currencyFormat = (num) => {
    if (num === null || num === undefined) {
      num = 0
    }
    return `N${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }

  const SeparatorComponent = () => <View style={styles.separatorLine} />

  const wait = (timeout) =>
    new Promise((resolve) => setTimeout(resolve, timeout))

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getInventory()
    wait(2000).then(() => setRefreshing(false))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator color={colors.exciteGreen} size="large" />
      ) : (
        <View style={{ marginBottom: 170 }}>
          <View style={styles.summary}>
            <View style={styles.summaryDetailLeft}>
              <Text style={styles.titleLeft}>Products </Text>
              <Text style={styles.detailLeft}> {tableData.length} </Text>
            </View>
            <View style={styles.summaryDetailRight}>
              <Text style={styles.titleRight}>Value </Text>
              <Text style={styles.detailRight}>
                {currencyFormat(calculateGrandTotal())}
              </Text>
            </View>
          </View>
          <>
            <View style={styles.itemList}>
              <View style={styles.linkSect}>
                <View style={{ width: '50%' }}>
                  <Button
                    icon="cart"
                    mode="text"
                    color="green"
                    style={{ borderColor: 'green' }}
                    onPress={() => {
                      if (userSub < 2) {
                        return showMessage({
                          message: 'Permission Denied!',
                          description: 'You need to upgrade first.',
                          type: 'danger',
                          icon: 'auto',
                        })
                      }
                      navigation.navigate('Orders')
                    }}
                  >
                    Pending Orders
                  </Button>
                </View>

                <View style={{ borderLeftWidth: 1 }} />

                <View style={{ width: '50%' }}>
                  <Button
                    icon="credit-card"
                    mode="text"
                    color="green"
                    style={{ borderColor: 'green' }}
                    onPress={() => {
                      if (userSub < 2) {
                        return showMessage({
                          message: 'Permission Denied!',
                          description: 'You need to upgrade first.',
                          type: 'danger',
                          icon: 'auto',
                        })
                      }
                      navigation.navigate('Sales')
                    }}
                  >
                    Sales
                  </Button>
                </View>
              </View>
            </View>
          </>
          <View style={{ marginHorizontal: 5 }}>
            <Text style={styles.title}> Products in Store </Text>
            <Paragraph style={{ marginLeft: 5, color: 'gray' }}>
              Press and hold a product for more options.
            </Paragraph>
          </View>

          <FlatList
            data={tableData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={SeparatorComponent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
          <InventoryOptions
            isOpen={inventoryOptionsModal}
            handleInventoryOptionsModal={handleInventoryOptionsModal}
            item={product}
            handleAddInventoryOrderModal={handleAddInventoryOrderModal}
          />
          <AddInventoryOrder
            isOpen={inventoryModal}
            handleAddInventoryOrderModal={handleAddInventoryOrderModal}
            navigation={navigation}
            product={product}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
  userSub: state.app?.me?.subscriptionLevel,
})

export default connect(mapStateToProps)(Inventory)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
