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
import CreateTransaction from './CreateTransaction'
import PostTransaction from './PostTransaction'

const Transaction = ({ token, navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [createTransactionModal, setCreateTransactionmodal] = useState(false)
  const [postTransactionModal, setPostTransactionmodal] = useState(false)
  const [transactionsData, setTransactionsData] = useState([])

  const handleCreateTransactionModal = () => {
    setCreateTransactionmodal(!createTransactionModal)
    getTransactions()
  }

  const handlePostTrannsactionModal = () => {
    setPostTransactionmodal(!postTransactionModal)
    getTransactions()
  }

  const wait = (timeout) =>
    new Promise((resolve) => setTimeout(resolve, timeout))

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  // Get transactions list
  const getTransactions = () => {
    setLoading(true)
    useAxios
      .get('/transaction', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.result
          setTransactionsData(
            data.sort((a, b) => {
              return (
                new Date(b.updatedAt.split('T')[0]) -
                new Date(a.updatedAt.split('T')[0])
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
    getTransactions()
  }, [])

  const calculateGrandTotal = () => {
    const itemArray = [...transactionsData]
    // console.log('itemArray ', itemArray);
    let total = 0
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < itemArray.length; i++) {
      total += itemArray[i].total
    }
    return total
  }

  const currencyFormat = (num) => {
    if (num === null || num === undefined) {
      num = 0
    }
    return `N${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.description}</Text>
      <View style={styles.itemDetail}>
        <View style={styles.row}>
          <Text style={styles.detailTitle}>Type: </Text>
          <Text style={{ textTransform: 'capitalize' }}>
            {item.accountType}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailTitle}> Total: </Text>
          <Text>{currencyFormat(item.total)}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={{ color: 'gray' }}>Last updated: </Text>
        <Text style={{ color: 'gray' }}>{item.updatedAt.split('T')[0]}</Text>
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
        <View style={styles.itemSection}>
          <View style={styles.summary}>
            <View style={styles.summaryDetailLeft}>
              <Text style={styles.titleLeft}>Transactions </Text>
              <Text style={styles.detailLeft}> {transactionsData.length} </Text>
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
                icon="plus-circle-outline"
                mode="outlined"
                color="black"
                style={{ borderColor: 'black' }}
                onPress={() => setCreateTransactionmodal(true)}
              >
                Create
              </Button>
              <Button
                icon="plus-circle"
                mode="outlined"
                color="black"
                style={{ borderColor: 'black' }}
                onPress={() => setPostTransactionmodal(true)}
              >
                Post
              </Button>
            </View>
            <Text style={styles.title}> All Transactions </Text>
          </View>

          <FlatList
            data={transactionsData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={SeparatorComponent}
          />
        </View>
      )}
      <CreateTransaction
        isOpen={createTransactionModal}
        handleCreateTransactionModal={handleCreateTransactionModal}
      />

      <PostTransaction
        isOpen={postTransactionModal}
        handlePostTrannsactionModal={handlePostTrannsactionModal}
      />
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(Transaction)

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
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  header: {
    // marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 40,
    justifyContent: 'space-between',
  },
  itemSection: {
    marginBottom: 150,
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
