import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  Platform,
  Linking,
} from 'react-native'
import { List, Modal, Paragraph, Button } from 'react-native-paper'
import { colors, images } from 'theme'
import { connect } from 'react-redux'
// import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import useAxios from '../../../../utils/axios/init'
import AddCustomer from './AddCustomer'

const Customer = ({ token, navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [customerModal, setCustomerModal] = useState(false)
  const [addCustomerModal, setAddCustomerModal] = useState(false)
  const [customerData, setCustomerData] = useState([])
  const [customer, setCustomer] = useState({})

  const handleAddCustomerModal = (state) => {
    setAddCustomerModal(state)
  }

  const handleCustomerModal = () => {
    setCustomerModal(!customerModal)
  }

  // Get customers list
  const getCustomer = () => {
    useAxios
      .get('/customer/', { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.result
          console.log('custtomer data is ', res.data.result)
          setCustomerData(data)
        } else {
          return <p>Oops! Could not fetch data.</p>
        }
      })
      .catch((error) => console.log(error))
  }

  const handleDelete = () => {
    console.log('customer id is ', customer.id)
    useAxios
      .delete(`/customer/${customer.id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log('customer record deleted!')
      })
      .catch((error) => console.log(error))
  }

  const handleCall = (phoneNumber) => {
    let phone = ''
    if (Platform.OS === 'android') {
      phone = `tel:${phoneNumber}`
    } else {
      phone = `telprompt:${phoneNumber}`
    }
    Linking.canOpenURL(phone)
      .then((supported) => {
        if (!supported) {
          alert('Number not supported!')
        } else {
          Linking.openURL(phone)
        }
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getCustomer()
  }, [])

  const wait = (timeout) =>
    new Promise((resolve) => setTimeout(resolve, timeout))

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getCustomer()
    wait(2000).then(() => setRefreshing(false))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.btnTop}>
          <Button
            icon="account-plus"
            mode="contained"
            onPress={() => handleAddCustomerModal(true)}
          >
            Add New
          </Button>
        </View>

        <View style={styles.itemList}>
          <Text style={styles.title}> All Customers </Text>
          <Paragraph style={{ marginLeft: 5, marginBottom: 20 }}>
            Press and Hold for more options.
          </Paragraph>

          {customerData.map((item, index) => (
            <List.Accordion
              key={index}
              style={styles.dropdown}
              title={item.customerName}
              left={(props) => <List.Icon {...props} icon="account" />}
              onLongPress={() => {
                const customer = {
                  name: item.customerName,
                  id: item._id,
                }
                setCustomerModal(true)
                setCustomer(customer)
              }}
            >
              <List.Item
                style={styles.item}
                title={item.phone}
                onPress={() => {
                  const number = item.phone
                  handleCall(number)
                }}
                left={(props) => <List.Icon {...props} icon="phone-log" />}
              />
              <List.Item
                style={styles.item}
                title={item.buyersEmail}
                onPress={() => console.log('Receivables button pressed!')}
                left={(props) => <List.Icon {...props} icon="email" />}
              />
              <List.Item
                style={styles.item}
                title={item.buyersContact}
                onPress={() => console.log('Payables button pressed!')}
                left={(props) => (
                  <List.Icon {...props} icon="information-variant" />
                )}
              />
              <List.Item
                style={styles.item}
                title={item.address}
                onPress={() => console.log('Liabilitiies button pressed!')}
                left={(props) => (
                  <List.Icon {...props} icon="map-marker-radius" />
                )}
              />
            </List.Accordion>
          ))}
        </View>
      </ScrollView>

      {/* add customer modal */}
      <AddCustomer
        isOpen={addCustomerModal}
        handleAddCustomerModal={handleAddCustomerModal}
      />

      {/* view customer modal */}
      <Modal
        animationType="slide"
        visible={customerModal}
        onRequestClose={handleCustomerModal}
      >
        <View style={styles.modalCustomer}>
          <Button
            style={styles.closeBtn}
            labelStyle={styles.closeBtnLabel}
            icon="close-circle"
            mode="text"
            color="gray"
            onPress={handleCustomerModal}
          />
          <Text style={styles.modalTxt}>{customer.name}</Text>
          <View style={styles.modalBtns}>
            <Button
              style={{ marginRight: 10 }}
              icon="account"
              mode="outlined"
              color={colors.exciteGreen}
              onPress={handleCustomerModal}
            >
              Update
            </Button>
            <Button
              icon="trash-can-outline"
              mode="outlined"
              color="red"
              onPress={handleDelete}
            >
              Delete
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(Customer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  btnTop: {
    margin: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
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
  itemList: {
    marginHorizontal: 10,
    marginVertical: 30,
    justifyContent: 'space-between',
  },
  item: {
    padding: 0,
    marginLeft: 25,
  },
  addCustomerContainer: {
    padding: 50,
    backgroundColor: 'white',
  },
  modalCustomer: {
    alignItems: 'center',
    color: 'gray',
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  modalTxt: { fontSize: 30, marginBottom: 10 },
  modalBtns: {
    flexDirection: 'row',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    marginBottom: 0,
    margin: 0,
  },
  closeBtnLabel: {
    fontSize: 30,
  },
  // hr: {
  //   borderBottomColor: '#EEEEEE',
  //   borderBottomWidth: 1,
  //   marginHorizontal: 40,
  //   marginVertical: 15,
  // },
})
