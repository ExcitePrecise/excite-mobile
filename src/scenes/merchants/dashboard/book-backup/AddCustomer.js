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
  Platform,
  Linking,
} from 'react-native'
import { List, Modal, Paragraph, Button, TextInput } from 'react-native-paper'
import { colors, images } from 'theme'
import { connect } from 'react-redux'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import useAxios from '../../../../utils/axios/init'

const AddCustomer = ({ token, isOpen, handleAddCustomerModal }) => {
  const [addCustomerModal, setAddCustomerModal] = useState(false)
  const [customer, setCustomer] = useState({})
  const [inputs, setInputs] = useState({
    customerName: '',
    buyersEmail: null,
    phone: null,
    address: null,
    buyersContact: '',
  })

  // Get customers list
  const handleSubmit = () => {
    // console.log('input is ', inputs)
    useAxios
      .post('/customer/new', inputs, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('post res is ', res.status)
        if (res.status === 201) {
          handleAddCustomerModal(false)
          alert('post successful!')
        } else {
          return alert('Something went wrong!')
        }
      })
      .catch((error) => console.log(error))
  }

  const handleChange = () => {
    inputs[e.target.name] = e.target.value
    setInputs({ ...inputs })

    // console.log('input is ', inputs)
  }

  // useEffect(() => {
  //   setAddCustomerModal(isOpen)
  // }, [isOpen])

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={() => handleAddCustomerModal(false)}
    >
      <View style={styles.addCustomerContainer}>
        <View style={styles.title}>
          <Text
            style={{
              fontSize: 25,
              color: 'white',
            }}
          >
            New Customer
          </Text>
        </View>

        <View style={styles.inputSection}>
          <Text
            style={{ color: 'gray', alignSelf: 'center', marginBottom: 20 }}
          >
            Fill in customer details
          </Text>
          <TextInput
            style={styles.inputBox}
            mode="outlined"
            label="Name"
            placeholder="Customer name"
            right={<TextInput.Icon name="account" />}
            onChangeText={(input) =>
              setInputs({ ...inputs, customerName: input })
            }
            value={inputs.customerName}
          />

          {/* console.log('customer name is ', input) */}
          <TextInput
            style={styles.inputBox}
            mode="outlined"
            label="Email"
            placeholder="Customer email"
            right={<TextInput.Icon name="email" />}
            onChangeText={(input) =>
              setInputs({ ...inputs, buyersEmail: input })
            }
            value={inputs.buyersEmail}
            keyboardType="email"
            email-address
          />
          <TextInput
            style={styles.inputBox}
            mode="outlined"
            label="Phone Number"
            placeholder="customer phone number"
            right={<TextInput.Icon name="phone" />}
            onChangeText={(input) => setInputs({ ...inputs, phone: input })}
            value={inputs.phone}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputBox}
            mode="outlined"
            label="Address"
            placeholder="Customer address"
            right={<TextInput.Icon name="map-marker-radius" />}
            onChangeText={(input) => setInputs({ ...inputs, address: input })}
            value={inputs.address}
          />
          <TextInput
            style={styles.inputBox}
            mode="outlined"
            label="Other Details"
            placeholder="Any other detail"
            right={<TextInput.Icon name="pen" />}
            onChangeText={(input) =>
              setInputs({ ...inputs, buyersContact: input })
            }
            value={inputs.buyersCContact}
          />
          <View style={styles.rowBtn}>
            <Button
              icon="check-circle"
              mode="outlined"
              style={{ borderColor: colors.exciteGreen }}
              onPress={handleSubmit}
            >
              Submit
            </Button>
            <Button
              icon="close-circle"
              mode="outlined"
              color="red"
              style={{ borderColor: 'red' }}
              onPress={() => handleAddCustomerModal(false)}
            >
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(AddCustomer)

const styles = StyleSheet.create({
  rowBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  title: {
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    backgroundColor: colors.exciteGreen,
    width: '100%',
  },
  addCustomerContainer: {
    paddingBottom: 50,
    backgroundColor: 'white',
  },
  modalCustomer: {
    alignItems: 'center',
    color: 'gray',
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  inputSection: {
    paddingHorizontal: 50,
  },
  inputBox: {
    marginVertical: 2,
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
})
