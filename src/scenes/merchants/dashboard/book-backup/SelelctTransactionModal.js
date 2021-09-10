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
  FlatList,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { List, Modal, Paragraph, Button, TextInput } from 'react-native-paper'
import { colors, images } from 'theme'
import { connect } from 'react-redux'
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons'
import useAxios from '../../../../utils/axios/init'

const SelectTransactionModal = ({
  navigation,
  token,
  isOpen,
  getSelectedTransaction,
  handleSelectTransaction,
}) => {
  const [loading, setLoading] = useState(false)
  const [selector, setSelector] = useState('income')
  const [transactionsData, setTransactionsData] = useState([])

  // Get transactions list
  const getTransactions = () => {
    setLoading(true)
    useAxios
      .get('/transaction', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.result
          console.log('transactions is ', data)
          setTransactionsData(
            data.sort((a, b) => {
              return (
                new Date(b.updatedAt.split('T')[0]) -
                new Date(a.updatedAt.split('T')[0])
              )
            }),
          )
          setLoading(false)
        } else {
          return <p>Oops! Could not fetch data.</p>
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getTransactions()
  }, [])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        getSelectedTransaction(item)
        handleSelectTransaction(false)
        console.log('get tranns item is ', item)
      }}
    >
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.description}</Text>
        <View style={styles.itemDetail}>
          <View style={styles.row}>
            <Text style={styles.detailTitle}>Type: </Text>
            <Text style={{ textTransform: 'capitalize' }}>
              {item.accountType}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={{ color: 'gray' }}>Date: </Text>
          <Text style={{ color: 'gray' }}>{item.createdAt.split('T')[0]}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const SeparatorComponent = () => {
    return <View style={styles.separatorLine} />
  }

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={() => handleSelectTransaction(false)}
    >
      <View style={styles.container}>
        <View style={styles.title}>
          <Entypo name="circle-with-plus" size={20} color="white" />
          <Text
            style={{
              fontSize: 25,
              color: 'white',
              paddingLeft: 5,
            }}
          >
            Select Transaction
          </Text>
        </View>

        <View style={styles.inputSection}>
          <Paragraph> Select a Transaction to process.</Paragraph>
        </View>

        <FlatList
          data={transactionsData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={SeparatorComponent}
        />
      </View>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(SelectTransactionModal)

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
  itemText: {
    fontSize: 18,
  },
  itemDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  detailTitle: {
    color: 'green',
  },
  container: {
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
  separatorLine: {
    height: 1,
    paddingTop: 2,
    backgroundColor: '#EEEEEE',
  },
})
