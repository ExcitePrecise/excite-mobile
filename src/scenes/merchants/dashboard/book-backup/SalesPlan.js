import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import {
  List,
  Modal,
  Card,
  Paragraph,
  Title,
  Avatar,
  Button,
} from 'react-native-paper'
import { colors, images } from 'theme'
import { connect } from 'react-redux'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import useAxios from '../../../../utils/axios/init'

const SalesPlan = ({ token, navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const [salesData, setSalesData] = useState([])

  const handlePress = () => setExpanded(!expanded)

  const wait = (timeout) =>
    new Promise((resolve) => setTimeout(resolve, timeout))

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  // Get Book record for sales plan
  const getInventoryData = () => {
    setLoading(true)
    useAxios
      .get('/book-keeping/all', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.records
          console.log('inventory res status ', data)
          setSalesData(data)
          setLoading(false)
        } else {
          return <p>Oops! Could not fetch data.</p>
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getInventoryData()
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
          <Text style={styles.detailTitle}>Sold: </Text>
          <Text> {item.qtySold}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailTitle}> Sales Target: </Text>
          <Text> {item.salesTarget}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailTitle}> Variance: </Text>
          <Text>
            {item.qtySold - item.salesTarget > 0 ? (
              <View style={styles.row}>
                <Text style={styles.success}>
                  {' '}
                  {item.qtySold - item.salesTarget}
                </Text>
                <FontAwesome5
                  style={{ paddingHorizontal: 10 }}
                  name="arrow-up"
                  size={12}
                  color={colors.exciteGreen}
                />
              </View>
            ) : item.qtySold - item.salesTarget < 0 ? (
              <View style={styles.row}>
                <Text style={styles.danger}>
                  {item.qtySold - item.salesTarget}
                </Text>

                <FontAwesome5
                  style={{ paddingHorizontal: 10 }}
                  name="arrow-down"
                  size={12}
                  color="red"
                />
              </View>
            ) : (
              <Text> - </Text>
            )}
          </Text>
        </View>
      </View>
    </View>
  )

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
              <Text style={styles.titleLeft}>Items </Text>
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
                icon="cart"
                mode="outlined"
                color="black"
                style={{ borderColor: 'black' }}
                onPress={() => navigation.navigate('Orders')}
              >
                View Pending Orders
              </Button>
            </View>
            <Text style={styles.title}> All Sales Plan </Text>
          </View>

          <FlatList
            data={salesData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={SeparatorComponent}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(SalesPlan)

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
  },
  linkSect: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 15,
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
