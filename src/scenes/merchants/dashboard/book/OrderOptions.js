import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Modal, Paragraph, Button } from 'react-native-paper'
import { colors, images } from 'theme'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import AddInventoryOrder from './AddInventoryOrder'

const OrderOptions = ({
  navigation,
  token,
  isOpen,
  handleOrderOptionsModal,
  handleAddInventoryOrderModal,
  item,
}) => {
  const [product, setProduct] = useState({})
  const [orderModal, setOrderModal] = useState(false)

  // const handleAddInventoryOrderModal = () => {
  //   setOrderModal(!orderModal)
  // }

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={() => handleOrderOptionsModal(false)}
    >
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

        <View
          style={{
            flexDirection: 'column',
            marginTop: 20,
            paddingHorizontal: 20,
          }}
        >
          <Button
            icon="cart"
            mode="outlined"
            color="black"
            style={{ borderColor: 'black', marginBottom: 15 }}
            onPress={() => {
              // setOrderModal(true)
              handleOrderOptionsModal(false)
              handleAddInventoryOrderModal(true)
              setProduct(item)
            }}
          >
            Order fulfilled
          </Button>
          <Button
            icon="pencil"
            mode="outlined"
            color="black"
            style={{ borderColor: 'black', marginBottom: 15 }}
            onPress={() => {
              handleOrderOptionsModal(false)
            }}
          >
            Cancel Order
          </Button>
          <Button
            icon="close-circle"
            mode="outlined"
            color="black"
            style={{ borderColor: 'black', marginBottom: 15 }}
            onPress={() => handleOrderOptionsModal(false)}
          >
            Close
          </Button>
          <Button
            icon="trash-can-outline"
            mode="outlined"
            color="red"
            style={{ borderColor: 'red' }}
            onPress={() => handleOrderOptionsModal(false)}
          >
            Delete this Product
          </Button>
        </View>

        <View style={styles.rowBtn}></View>
      </View>
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
    backgroundColor: 'white',
  },
})
