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

const AddCustomer = ({ token, isOpen }) => {
  const [addCustomerModal, setAddCustomerModal] = useState(false)
  const [customer, setCustomer] = useState({})
  const [inputs, setInputs] = useState({
    customerName: '',
    buyersEmail: null,
    phone: null,
    address: null,
    buyersContact: '',
  })

  const handleAddCustomerModal = () => {
    setAddCustomerModal(!addCustomerModal)
  }

  // Get customers list
  const handleSubmit = () => {
    console.log('input is ', inputs)
    // useAxios
    //   .post('/customer/new', inputs, {
    //     headers: { authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     console.log('post res is ', res)
    //     // if (res.status === 200) {
    //     //   setAddCustomerModal(false)
    //     // } else {
    //     //   return <p>Oops! Could not fetch data.</p>
    //     // }
    //   })
    //   .catch((error) => console.log(error))
  }

  const handleChange = () => {
    inputs[e.target.name] = e.target.value
    setInputs({ ...inputs })

    // console.log('input is ', inputs)
  }

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={handleAddCustomerModal}
    >
      <View style={styles.addCustomerContainer}>
        <View style={styles.title}>
          <Text
            style={{
              fontSize: 20,
              color: colors.exciteGreen,
            }}
          >
            New Customer
          </Text>
          <Text style={{ color: 'gray' }}>Fill in customer details</Text>
        </View>
        <TextInput
          style={styles.inputBox}
          mode="outlined"
          label="Name"
          placeholder="Customer name"
          right={<TextInput.Icon name="account" />}
          onChangeText={handleChange}
          value={inputs.customerName}
        />
        <TextInput
          style={styles.inputBox}
          mode="outlined"
          label="Email"
          placeholder="Customer email"
          right={<TextInput.Icon name="email" />}
          onChangeText={handleChange}
          value={inputs.buyersEmail}
        />
        <TextInput
          style={styles.inputBox}
          mode="outlined"
          label="Phone Number"
          placeholder="customer phone number"
          right={<TextInput.Icon name="phone" />}
          onChangeText={handleChange}
          value={inputs.phone}
          keyboardType={'numeric'}
        />
        <TextInput
          style={styles.inputBox}
          mode="outlined"
          label="Address"
          placeholder="Customer address"
          right={<TextInput.Icon name="map-marker-radius" />}
          onChangeText={handleChange}
          value={inputs.address}
        />
        <TextInput
          style={styles.inputBox}
          mode="outlined"
          label="Address"
          placeholder="Customer address"
          right={<TextInput.Icon name="map-marker-radius" />}
          onChangeText={handleChange}
          value={inputs.address}
        />
      </View>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(AddCustomer)

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  addCustomerContainer: {
    paddingBottom: 50,
    paddingHorizontal: 50,
    backgroundColor: 'white',
  },
  modalCustomer: {
    alignItems: 'center',
    color: 'gray',
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  inputBox: {
    marginVertical: 5,
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
