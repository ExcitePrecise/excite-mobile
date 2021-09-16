import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
  Pressable,
} from 'react-native'
import { List, Modal, Badge } from 'react-native-paper'
import { connect } from 'react-redux'
import useAxios from '../../../../utils/axios/init'
import { images } from 'theme'
import Summary from './Summary'
import { showMessage } from 'react-native-flash-message'

const Bookkeeping = ({ token, navigation, userSub }) => {
  const [loading, setLoading] = useState(false)
  const [orderLength, setOrderLength] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  // const [expanded, setExpanded] = useState(true)
  // const [orderCount, setOrderCount] = useState(null)

  // const handlePress = () => setExpanded(!expanded)

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
          setOrderLength(data.length)
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
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    getOrders()
  }, [])

  // const handleOrderCount = (countData) => {
  //   setOrderCount(countData)
  //   console.log('Pending Order count is ', orderCount)
  // }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Summary />
        <ScrollView>
          <TouchableOpacity>
            <List.Item
              onPress={() =>
                navigation.navigate('Performance', { orderLength })
              }
              style={styles.item}
              title="Sales Performannce"
              left={(props) => <List.Icon {...props} icon="chart-bar" />}
              right={() => {
                orderLength > 0 && (
                  <Badge style={{ marginRight: 120, marginBottom: 15 }}>
                    {orderLength}
                  </Badge>
                )
              }}
            />
          </TouchableOpacity>

          <List.Accordion
            style={styles.dropdown}
            title="Financial Reports"
            left={(props) => <List.Icon {...props} icon={images.finance} />}
          >
            <Pressable onPress={handleModal}>
              <List.Item
                title="Income Statement"
                onPress={() => {
                  if (userSub < 2) {
                    return showMessage({
                      message: 'Permission Denied!',
                      description: 'You need to upgrade first.',
                      type: 'danger',
                      icon: 'auto',
                    })
                  }
                  navigation.navigate('IncomeStatement')
                }}
              />
            </Pressable>
            {/* <Pressable onPress={handleModal}>
              <List.Item
                title="Receivables Ledger"
                onPress={() => console.log('Receivables button pressed!')}
              />
            </Pressable>
            <Pressable onPress={handleModal}>
              <List.Item
                title="Payables"
                onPress={() => console.log('Payables button pressed!')}
              />
            </Pressable>
            <Pressable onPress={handleModal}>
              <List.Item
                title="Liabilitiies"
                onPress={() => console.log('Liabilitiies button pressed!')}
              />
            </Pressable> */}
          </List.Accordion>

          <TouchableOpacity>
            <List.Item
              style={styles.item}
              title="Transactions"
              left={(props) => (
                <List.Icon {...props} icon="credit-card-check" />
              )}
              onPress={() => {
                if (userSub < 2) {
                  return showMessage({
                    message: 'Permission Denied!',
                    description: 'You need to upgrade first.',
                    type: 'danger',
                    icon: 'auto',
                  })
                }
                navigation.navigate('Transaction')
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <List.Item
              onPress={() => {
                if (userSub < 2) {
                  return showMessage({
                    message: 'Permission Denied!',
                    description: 'You need to upgrade first.',
                    type: 'danger',
                    icon: 'auto',
                  })
                }
                navigation.navigate('Customer')
              }}
              style={styles.item}
              title="Customers"
              left={(props) => <List.Icon {...props} icon="account" />}
            />
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
  userSub: state.app?.me?.subscriptionLevel,
})

export default connect(mapStateToProps)(Bookkeeping)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  dropdown: {
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 10,
    borderColor: '#aaaaaa',
    borderWidth: 1,
    padding: 0,
    backgroundColor: '#ffffff',
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 10,
    borderColor: '#aaaaaa',
    borderWidth: 1,
    padding: 7,
  },
  modalContainer: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  modalItem: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: '#aaaaaa',
    borderWidth: 1,
    padding: 16,
    backgroundColor: 'white',
    color: 'black',
  },
  categories_img: {
    paddingHorizontal: 5,
    marginRight: 20,
  },
  createNewWrapper: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  createNew: {
    width: 40,
    height: 40,
  },
})
