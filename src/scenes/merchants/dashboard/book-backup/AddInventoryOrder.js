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
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons'
import useAxios from '../../../../utils/axios/init'

const AddInventoryOrder = ({
  navigation,
  token,
  isOpen,
  handleAddInventoryOrderModal,
  product,
}) => {
  const [option, setOption] = useState('')
  const [inputs, setInputs] = useState({
    productName: '',
    quantity: String(product.quantity),
    price: String(product.price),
    description: product.description,
    buyersEmail: product.buyersEmail,
    buyersContact: product.buyersContact,
  })

  React.useEffect(() => {
    if (product) {
      setInputs({ ...product })
    }
  }, [])

  // Post to Orders list
  const handleSubmit = () => {
    if (inputs.quantity === null || inputs.quantity === '') {
      inputs.quantity = 1
    }

    const modifiedData = { ...product }
    modifiedData.price = inputs.price
    modifiedData.inventoryPrice = product.price
    modifiedData.quantity = Number(inputs.quantity)
    modifiedData.buyersEmail = inputs.buyersEmail
    modifiedData.buyersContact = inputs.buyersContact
    modifiedData.cost = inputs.cost
    modifiedData.total = modifiedData.quantity * modifiedData.price
    console.log('inventory submitted moddata is ', modifiedData)

    useAxios
      .post('/receivables/new', modifiedData, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('post res is ', res.status)
        if (res.status === 200) {
          subtractQuantity()
        } else {
          return alert('Something went wrong!')
        }
      })
      .catch((error) => console.log(error))
  }

  // Subtract order quantity from book-keeping
  const subtractQuantity = () => {
    if (inputs.quantity === null || inputs.quantity === '') {
      inputs.quantity = 1
    }
    if (product.qtySold === null) {
      product.qtySold = 0
    }
    product.qtySold -= Number(inputs.qtySold)
    product.quantity -= Number(inputs.quantity)
    product.total = product.quantity * product.price
    product.cost += inputs.cost
    console.log('subtractQty function is ', product)
    useAxios
      .put(`book-keeping/${product._id}`, product, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        // console.log('reached subtractquantity()')
        handleAddInventoryOrderModal(false)
        // alert('Inside subtractqty. post successful!')
        navigation.navigate('Orders')
        // Flash('success', 'Successful', '', 3000, window.location.reload())
      })
      .catch((err) => {
        // Flash('error', 'Something went wrong', 'Error', 3000)
        console.error(err)
      })
  }

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={() => handleAddInventoryOrderModal(false)}
    >
      <ScrollView>
        <View style={styles.addInventoryContainer}>
          <View style={styles.title}>
            <Entypo name="circle-with-plus" size={20} color="white" />
            <Text
              style={{
                fontSize: 25,
                color: 'white',
                paddingLeft: 5,
              }}
            >
              New Order
            </Text>
          </View>

          <View style={styles.inputSection}>
            <Text
              style={{ color: 'gray', alignSelf: 'center', marginBottom: 20 }}
            >
              An Order Invoice for this product will be sent to buyer when you
              press 'Submit'
            </Text>
            <TextInput
              style={styles.inputBox}
              mode="outlined"
              label="Product name"
              // placeholder="Product name"
              right={<TextInput.Icon name="cart" />}
              onChangeText={(input) =>
                setInputs({ ...inputs, productName: input })
              }
              value={product.productName}
            />

            <TextInput
              style={styles.inputBox}
              mode="outlined"
              label="Quantity"
              placeholder="Quantity ordered"
              right={<TextInput.Icon name="counter" />}
              onChangeText={(input) =>
                setInputs({ ...inputs, quantity: input })
              }
              value={inputs.quantity}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.inputBox}
              mode="outlined"
              label="Sale Price"
              placeholder="Sale Price"
              right={<TextInput.Icon name="currency-ngn" />}
              onChangeText={(input) => setInputs({ ...inputs, price: input })}
              value={inputs.price}
            />

            <TextInput
              style={styles.inputBox}
              mode="outlined"
              label="Description"
              placeholder="Product description"
              right={<TextInput.Icon name="pen" />}
              onChangeText={(input) =>
                setInputs({ ...inputs, description: input })
              }
              value={inputs.description}
            />

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
              keyboardType="email-address"
              email-price
            />

            <TextInput
              style={styles.inputBox}
              mode="outlined"
              label="Additional Details"
              placeholder="Any other detail"
              right={<TextInput.Icon name="pencil-box-outline" />}
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
                onPress={() => handleAddInventoryOrderModal(false)}
              >
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(AddInventoryOrder)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rowBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  title: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.exciteGreen,
    width: '100%',
  },
  addInventoryContainer: {
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
