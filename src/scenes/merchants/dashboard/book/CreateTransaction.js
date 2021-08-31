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
import { Picker } from '@react-native-picker/picker'
import { List, Modal, Paragraph, Button, TextInput } from 'react-native-paper'
import { colors, images } from 'theme'
import { connect } from 'react-redux'
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons'
import useAxios from '../../../../utils/axios/init'

const CreateTransaction = ({
  navigation,
  token,
  isOpen,
  handleCreateTransactionModal,
}) => {
  const [option, setOption] = useState('')
  const [selector, setSelector] = useState('income')
  const [inputs, setInputs] = useState({
    description: '',
    accountType: '',
  })

  // Post new transaction list
  const handleSubmit = () => {
    inputs.accountType = selector
    useAxios
      .post('/transaction/new', inputs, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 201) {
          handleCreateTransactionModal(false)
        } else {
          return alert('Something went wrong!')
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={() => handleCreateTransactionModal(false)}
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
              Create Transaction
            </Text>
          </View>

          <View style={styles.inputSection}>
            <TextInput
              style={styles.inputBox}
              mode="outlined"
              label="Name"
              placeholder="Transaction name"
              right={<TextInput.Icon name="pen" />}
              onChangeText={(input) =>
                setInputs({ ...inputs, description: input })
              }
              value={inputs.description}
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                marginVertical: 10,
              }}
            >
              <Picker
                selectedValue={selector}
                onValueChange={(itemValue, itemIndex) => setSelector(itemValue)}
              >
                <Picker.Item label="Income" value="income" />
                <Picker.Item label="Expense" value="expense" />
                <Picker.Item label="Cost of Sale" value="costOfSale" />
              </Picker>
            </View>

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
                onPress={() => handleCreateTransactionModal(false)}
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

export default connect(mapStateToProps)(CreateTransaction)

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
