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
} from 'react-native'
import { Modal, Snackbar, Button, TextInput } from 'react-native-paper'
import { colors, images } from 'theme'
import { connect } from 'react-redux'
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons'
import useAxios from '../../../../utils/axios/init'
import SelelctTransactionModal from './SelelctTransactionModal'

const PostTransaction = ({
  navigation,
  token,
  isOpen,
  handlePostTrannsactionModal,
  transaction,
}) => {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [selected, setSelectedd] = useState({})
  const [selectTransaction, setSelectTransaction] = useState(false)
  const [inputs, setInputs] = useState({
    selectedTitle: '',
    accountType: '',
    account: '',
    amount: '',
    postTransactionDescription: '',
  })

  const handleSnackbar = () => setVisible(false)

  const getSelectedTransaction = (data) => {
    setSelectedd(data)
  }

  const handleSelectTransaction = () => {
    setSelectTransaction(!selectTransaction)
  }

  // Handle PostTransaction submit
  const handleSubmit = () => {
    inputs.amount = Number(inputs.amount)
    inputs.selectedTitle = selected.description
    inputs.accountType = selected.accountType
    if (inputs.accountType === 'income') {
      inputs.account = 'credit'
    } else {
      inputs.account = 'debit'
    }

    // console.log('post trans input is ', inputs)
    useAxios
      .post('/post-transaction/new', inputs, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 201) {
          setVisible(true)
          setMessage('Transaction posted!')

          setTimeout(() => {
            handlePostTrannsactionModal()
          }, 2000)
        } else {
          setVisible(true)
          setMessage('Somethinng went wrong!')
        }
      })
      .catch((error) => {
        setVisible(true)
        setMessage('An error occurred!')
        console.log(error)
      })
  }

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={() => handlePostTrannsactionModal(false)}
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
              Post Transaction
            </Text>
          </View>

          <View style={styles.inputSection}>
            <Text
              style={{ color: 'gray', alignSelf: 'center', marginBottom: 20 }}
            >
              Select a transaction below to get started.
            </Text>

            <Button
              icon="plus-circle-outline"
              mode="outlined"
              color="black"
              style={{ borderColor: 'black' }}
              onPress={() => setSelectTransaction(true)}
            >
              Select Transaction
            </Button>

            <TextInput
              style={styles.inputBox}
              mode="outlined"
              label="Transaction Name"
              // placeholder="Product name"
              right={<TextInput.Icon name="cart" />}
              onChangeText={(input) =>
                setInputs({ ...inputs, selectedTitle: input })
              }
              value={selected.description}
            />

            <TextInput
              style={styles.inputBox}
              mode="outlined"
              label="Amount"
              placeholder="Order amount"
              right={<TextInput.Icon name="currency-ngn" />}
              onChangeText={(input) => setInputs({ ...inputs, amount: input })}
              value={inputs.amount}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.inputBox}
              mode="outlined"
              label="Description"
              placeholder="Description"
              right={<TextInput.Icon name="pen" />}
              onChangeText={(input) =>
                setInputs({ ...inputs, postTransactionDescription: input })
              }
              value={inputs.postTransactionDescription}
            />

            {/* <TextInput
              style={styles.inputBox}
              mode="outlined"
              label="Description"
              placeholder="Product description"
              right={<TextInput.Icon name="pen" />}
              onChangeText={(input) =>
                setInputs({ ...inputs, description: input })
              }
              value={inputs.description}
            /> */}

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
                onPress={() => handlePostTrannsactionModal(false)}
              >
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
      <SelelctTransactionModal
        isOpen={selectTransaction}
        getSelectedTransaction={getSelectedTransaction}
        handleSelectTransaction={handleSelectTransaction}
      />

      {visible ? (
        <Snackbar visible={visible} onDismiss={handleSnackbar}>
          {message}
        </Snackbar>
      ) : (
        <Text />
      )}
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(PostTransaction)

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
