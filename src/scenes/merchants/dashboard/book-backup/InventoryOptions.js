import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Modal, Paragraph, Button } from 'react-native-paper'
import { colors, images } from 'theme'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import AddInventoryOrder from './AddInventoryOrder'

const InventoryOptions = ({
  navigation,
  token,
  isOpen,
  handleInventoryOptionsModal,
  handleAddInventoryOrderModal,
  item,
}) => {
  const [product, setProduct] = useState({})
  const [inventoryModal, setInventoryModal] = useState(false)

  // const handleAddInventoryOrderModal = () => {
  //   setInventoryModal(!inventoryModal)
  // }

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={() => handleInventoryOptionsModal(false)}
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
          <Paragraph>Select an option.</Paragraph>
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
              // setInventoryModal(true)
              handleInventoryOptionsModal(false)
              handleAddInventoryOrderModal(true)
              setProduct(item)
            }}
          >
            Place an Order
          </Button>
          <Button
            icon="close-circle"
            mode="outlined"
            color="red"
            style={{ borderColor: 'red', marginBottom: 15 }}
            onPress={() => handleInventoryOptionsModal(false)}
          >
            Cancel
          </Button>
        </View>

        <View style={styles.rowBtn}></View>
      </View>
      <AddInventoryOrder
        isOpen={inventoryModal}
        handleAddInventoryOrderModal={handleAddInventoryOrderModal}
        product={product}
      />
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(InventoryOptions)

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

{
  /* <Button
icon="pencil"
mode="outlined"
color="black"
style={{ borderColor: 'black', marginBottom: 15 }}
onPress={() => {
  handleInventoryOptionsModal(false)
}}
>
Edit this Product
</Button>


<Button
icon="trash-can-outline"
mode="outlined"
color="red"
style={{ borderColor: 'red' }}
onPress={() => handleInventoryOptionsModal(false)}
>
Delete this Product
</Button> */
}
