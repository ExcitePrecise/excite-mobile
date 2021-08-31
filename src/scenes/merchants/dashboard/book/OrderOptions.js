import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Modal, Paragraph, Button, TextInput, Banner } from 'react-native-paper'
import { colors, images } from 'theme'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import AddInventoryOrder from './AddInventoryOrder'
import useAxios from '../../../../utils/axios/init'

const OrderOptions = ({
  navigation,
  token,
  isOpen,
  handleOrderOptionsModal,
  handleAddInventoryOrderModal,
  item,
}) => {
  const [data, setData] = useState(null)
  const [product, setProduct] = useState({})
  const [salesData, setSalesData] = useState([])
  const [orderModal, setOrderModal] = useState(false)
  const [inputs, setInputs] = useState({
    productName: '',
    price: '',
    cost: item.cost,
    total: null,
    quantity: '',
    buyersContact: '',
    description: item.description,
    salesTarget: item.salesTarget,
    paymentMode: '',
  })

  const [selector, setSelector] = useState('Select payment method')
  const [bannerVisible, setBannerVisible] = useState(false)

  // Get sales list
  const getSales = async () => {
    await useAxios.get('/sales/all').then((res) => {
      if (res.status == 200) {
        const data = res.data.records
        setSalesData(data)
      } else {
        return <p>Oops! Could not fetch data.</p>
      }
    })
  }

  const handlePrice = () => {
    setInputs({ price: String(item.price) })
  }

  const handleQuantity = () => {
    setInputs({ quantity: String(item.quantity) })
  }

  const revertOrder = () => {
    const quantityToRevert = item.quantity
    const modifiedData = { ...item, quantityToRevert }
    useAxios
      .put(`book-keeping/update/${modifiedData.salesRef}`, modifiedData, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        deleteReceivable()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const getInventoryCost = (incomingArray) => {
    const itemArray = [...incomingArray]
    let inventorySum = 0
    for (let i = 0; i < itemArray.length; i++) {
      itemArray[i].inventoryTotal = Number(itemArray[i].inventoryTotal)
      inventorySum += itemArray[i].inventoryTotal
    }
    return inventorySum
  }

  const inventoryCost = salesData.filter((invCost) => {
    if (invCost.inventoryTotal > 0) {
      return invCost.productName === item.productName
    }
  })

  const calculateCostTotal = getInventoryCost(inventoryCost) || 0

  const handleTransactionSubmit = () => {
    const transactionData = {
      description: item.productName,
      accountType: 'income',
      inventoryTotal: item.quantity * item.inventoryPrice,
      inventoryCost: calculateCostTotal,
      quantity: item.quantity,
    }

    if (transactionData.inventoryCost < 1) {
      transactionData.inventoryCost = transactionData.inventoryTotal
      transactionData.total = item.price * item.quantity
    }
    useAxios
      .post('/transaction/new', transactionData, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('handleTransactionSubmit done')
        handlePostTransactionSubmit()
        // toggleModal(false)
      })
      .catch((e) => {
        // Flash('error', 'Something went wrong', 'Error', 3000)
        console.error(e)
      })
  }

  const handlePostTransactionSubmit = () => {
    const postTransactionData = {
      selectedTitle: item.productName,
      amount: item.price * item.quantity,
      quantity: item.quantity,
      accountType: 'income',
      account: 'credit',
      postTransactionDescription: item.buyersContact,
      inventoryTotal: item.quantity * item.inventoryPrice,
      inventoryCost: calculateCostTotal,
      paymentMode: item.paymentMode,
    }
    if (postTransactionData.inventoryCost < 1) {
      postTransactionData.inventoryCost = postTransactionData.inventoryTotal
    }

    useAxios
      .post('/post-transaction/new', postTransactionData, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('handlePostTransactionSubmit done')
        updateStoreRecord()
      })
      .catch((e) => {
        // Flash('error', 'Something went wrong', 'Error', 3000)
        console.error(e)
      })
  }

  // handle order fulfillment or rejection
  const handleSubmit = () => {
    const modifiedData = { ...item }
    // modifiedData.price = inputs.price
    // modifiedData.quantity = inputs.quantity
    // modifiedData.cost = inputs.cost
    // modifiedData.total = modifiedData.quantity * modifiedData.price
    modifiedData.paymentMode = selector

    useAxios
      .post('/sales/new', modifiedData, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log('handleSubmit done')
        handleTransactionSubmit()
      })
      .catch((error) => {
        // Flash('error', 'Something went wrong', 'Error', 3000)
        console.error(error)
      })
  }

  const updateStoreRecord = () => {
    const modifiedData = { ...item }
    modifiedData.cost += item.cost
    modifiedData.qtySold += item.quantity
    modifiedData.totalPaid = modifiedData.qtySold * item.price
    modifiedData.sumTotalPaid += modifiedData.totalPaid

    const _id = modifiedData.salesRef
    // console.log('update mod data is ', modifiedData);
    useAxios.put(`book-keeping/${_id}`, modifiedData, {
      headers: { authorization: `Bearer ${token}` },
    })
    useAxios
      .put(`book-keeping/update/${_id}`, modifiedData, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log('updateStoreRecord done')
        deleteReceivable()
      })
      .catch((err) => {
        // Flash('error', 'Something went wrong', 'Error', 3000)
        console.error(err)
      })
  }

  const deleteReceivable = () => {
    const record = { ...item }
    useAxios
      .delete(`receivables/${record._id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        // Flash('success', 'Successful', '', 3000, window.location.reload())
        console.log('order removed')
        setBannerVisible(true)
      })
      .catch((err) => {
        // Flash('error', 'Something went wrong', 'Error', 3000)
        console.error(err)
      })
  }

  const calculateGrandTotal = () => {
    const itemArray = [...data]
    let total = 0
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

  useEffect(() => {
    handlePrice()
    handleQuantity()
    // setInputs({ price: item.price, quantity: item.quantity })
  }, [])

  // const handleAddInventoryOrderModal = () => {
  //   setOrderModal(!orderModal)
  // }

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={() => handleOrderOptionsModal(false)}
    >
      <ScrollView>
        {bannerVisible ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              onPress={() => {
                handleOrderOptionsModal(false)
                setBannerVisible(false)
              }}
            >
              <Banner
                visible={bannerVisible}
                actions={[
                  {
                    label: 'Records updated!',
                    onPress: () => {
                      handleOrderOptionsModal(false)
                      setBannerVisible(false)
                    },
                  },
                ]}
                icon="bell"
              >
                Request conpleted!.
              </Banner>
            </Text>
          </View>
        ) : (
          <View style={styles.optionsContainer}>
            <View style={styles.title}>
              <Entypo name="circle-with-plus" size={20} color="white" />
              <Text
                style={{
                  fontSize: 25,
                  color: 'white',
                  paddingLeft: 5,
                }}
              >
                Options
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Paragraph>Select an Order option.</Paragraph>
            </View>

            <View style={styles.details}>
              <Text style={styles.detailTitle}>{item.productName}</Text>
              <View style={styles.rowSpaced}>
                <View style={styles.row}>
                  <Text style={styles.detailText}>Price: </Text>
                  <Text>{currencyFormat(item.price)}</Text>
                </View>
                <View style={styles.spaceHor}>
                  <Text style={styles.detailText}>Quantity: </Text>
                  <Text>{item.quantity}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.detailText}>Total: </Text>
                  <Text>{currencyFormat(item.total)}</Text>
                </View>
              </View>
            </View>

            <Text
              style={{ color: 'gray', textAlign: 'center', marginBottom: 5 }}
            >
              Select payment mode below
            </Text>
            <View style={styles.inputSection}>
              <Picker
                selectedValue={selector}
                onValueChange={(itemValue, itemIndex) => setSelector(itemValue)}
              >
                <Picker.Item label="Cash" value="cash" />
                <Picker.Item label="Bank" value="bank" />
                <Picker.Item label="Credit" value="credit" />
              </Picker>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 40,
                paddingHorizontal: 20,
                justifyContent: 'space-between',
              }}
            >
              <Button
                icon="cart-plus"
                mode="outlined"
                color="green"
                style={{ borderColor: 'green', marginBottom: 15 }}
                onPress={() => {
                  // // setOrderModal(true)
                  // handleOrderOptionsModal(false)
                  // handleAddInventoryOrderModal(true)
                  // setProduct(item)
                  handleSubmit()
                }}
              >
                Fulfill Order
              </Button>
              <Button
                icon="minus-circle"
                mode="outlined"
                color="red"
                style={{ borderColor: 'red', marginBottom: 15 }}
                onPress={() => {
                  // handleOrderOptionsModal(false)
                  revertOrder()
                }}
              >
                Cancel Order
              </Button>
            </View>
            <View>
              <Button
                icon="close-circle"
                mode="outlined"
                color="black"
                style={{ borderColor: 'black', margin: 20 }}
                onPress={() => handleOrderOptionsModal(false)}
              >
                Close
              </Button>
            </View>
          </View>
        )}
      </ScrollView>
      <AddInventoryOrder
        isOpen={orderModal}
        handleAddInventoryOrderModal={handleAddInventoryOrderModal}
        product={product}
      />
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(OrderOptions)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rowSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  spaceHor: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  rowBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  title: {
    flexDirection: 'row',
    marginBottom: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.exciteGreen,
    width: '100%',
  },
  optionsContainer: {
    marginBottom: '50%',
    paddingBottom: 30,
    backgroundColor: 'white',
  },
  details: { margin: 20, alignItems: 'center' },
  detailTitle: { fontSize: 30 },
  detailText: {
    color: 'green',
  },
  inputSection: {
    // width: 150,

    marginHorizontal: 130,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  inputBox: {
    marginVertical: 2,
    backgroundColor: 'white',
  },
})

//  <TextInput
//               style={styles.inputBox}
//               mode="outlined"
//               label="Product name"
//               // placeholder="Product name"
//               right={<TextInput.Icon name="cart" />}
//               onChangeText={(input) =>
//                 setInputs({ ...inputs, productName: input })
//               }
//               value={item.productName}
//             />

//             <TextInput
//               style={styles.inputBox}
//               mode="outlined"
//               label="Quantity"
//               placeholder="Quantity ordered"
//               right={<TextInput.Icon name="counter" />}
//               onChangeText={(input) =>
//                 setInputs({ ...inputs, quantity: input })
//               }
//               value={inputs.quantity}
//               keyboardType="numeric"
//             />

//             <TextInput
//               style={styles.inputBox}
//               mode="outlined"
//               label="Sale Price"
//               placeholder="Sale Price"
//               right={<TextInput.Icon name="currency-ngn" />}
//               onChangeText={(input) => setInputs({ ...inputs, price: input })}
//               value={inputs.price}
//             />

//             <TextInput
//               style={styles.inputBox}
//               mode="outlined"
//               label="Description"
//               placeholder="Product description"
//               right={<TextInput.Icon name="pen" />}
//               onChangeText={(input) =>
//                 setInputs({ ...inputs, description: input })
//               }
//               value={inputs.description}
//             />

//             <TextInput
//               style={styles.inputBox}
//               mode="outlined"
//               label="Additional Details"
//               placeholder="Any other detail"
//               right={<TextInput.Icon name="pencil-box-outline" />}
//               onChangeText={(input) =>
//                 setInputs({ ...inputs, buyersContact: input })
//               }
//               value={inputs.buyersContact}
//             />
