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

const Inventory = ({ token, navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const [tableData, setTableData] = useState([])

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
      .get('/book-keeping/all', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.records
          console.log('books data is ', res.data.records)
          setTableData(data)
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
    const itemArray = [...tableData]
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Card>
          {/* <Card.Title title="Products Count" subtitle={tableData.length} /> */}
          <Card.Content>
            {/* <Title>Card title</Title>*/}

            <View style={styles.summary}>
              <View>
                <Text style={styles.title}>Products Count </Text>
                <Text style={styles.detail1}> {tableData.length} </Text>
              </View>
              <View>
                <Text style={styles.title}>Value </Text>
                <Text style={styles.detail1}>
                  {' '}
                  {currencyFormat(calculateGrandTotal())}{' '}
                </Text>
              </View>
            </View>
          </Card.Content>
          {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions> */}
        </Card>

        {/* <View style={styles.hr} /> */}

        <View style={styles.itemList}>
          <Text style={styles.title}> Products List </Text>
          <Paragraph style={{ marginLeft: 5 }}>
            Tap on a product to order.
          </Paragraph>

          {tableData.map((item, index) => (
            <TouchableOpacity
              style={styles.item}
              key={index}
              onPress={() => console.log('pressed ', item.productName)}
            >
              <View style={styles.row}>
                <Text style={styles.itemText}>{item.productName}</Text>
                {item.qtySold - item.salesTarget > 0 ? (
                  <View style={styles.row}>
                    <Text style={styles.success}>
                      {' '}
                      {item.qtySold - item.salesTarget}
                    </Text>
                    <FontAwesome5
                      style={{ paddingHorizontal: 10 }}
                      name="arrow-up"
                      size={20}
                      color={colors.exciteGreen}
                    />
                  </View>
                ) : item.qtySold - item.salesTarget < 0 ? (
                  <View style={styles.row}>
                    {/* <Text style={styles.danger}>
                      {item.qtySold - item.salesTarget}
                    </Text> */}

                    <FontAwesome5
                      style={{ paddingHorizontal: 10 }}
                      name="arrow-down"
                      size={20}
                      color="red"
                    />
                  </View>
                ) : (
                  <Text> - </Text>
                )}
              </View>

              <View style={styles.itemDetail}>
                <View style={styles.row}>
                  <Text style={styles.detailTitle}> Price: </Text>
                  <Text> {currencyFormat(item.price)} </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.detailTitle}> Quantity: </Text>
                  <Text>{item.quantity}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.detailTitle}> Sold: </Text>
                  <Text> {item.qtySold} </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
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
    // margin: 5,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  detail1: {
    fontSize: 22,
  },
  hr: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    marginHorizontal: 40,
    marginVertical: 15,
  },
  itemList: {
    marginHorizontal: 10,
    marginVertical: 30,
    justifyContent: 'space-between',
  },
  item: {
    marginHorizontal: 5,
    marginVertical: 2,
    borderBottomColor: '#aaaaaa',
    borderBottomWidth: 1,
    padding: 20,
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
  success: {
    color: 'green',
    paddingHorizontal: 5,
  },
  danger: {
    color: 'red',
    paddingHorizontal: 5,
  },
})
