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

const Sales = ({ token, navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
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

  // Get products list
  const getData = () => {
    useAxios
      .get('/sales/all', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.records
          // console.log('sales data is ', res.data.records)
          setSalesData(data)
        } else {
          return <p>Oops! Could not fetch data.</p>
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getData()
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
    </View>
  )

  const SeparatorComponent = () => {
    return <View style={styles.separatorLine} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.summary}>
          <View style={styles.summaryDetailLeft}>
            <Text style={styles.title}> All Sales </Text>
          </View>
          <View style={styles.summaryDetailRight}>
            <Text style={styles.detail}>
              {currencyFormat(calculateGrandTotal())}
            </Text>
          </View>
        </View>

        <FlatList
          data={salesData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={SeparatorComponent}
        />
      </View>
      {/* </ScrollView> */}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    // marginBottom: 20,
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
