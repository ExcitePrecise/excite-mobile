// kazeem.again@gmail.com

import React, { useState, useCallback } from 'react'
import {
  SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity, Image, RefreshControl, ScrollView, Pressable,
} from 'react-native'
import { List, Modal } from 'react-native-paper'
import { images } from 'theme'
import Summary from './Summary'

const Bookkeeping = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [expanded, setExpanded] = useState(true)

  const handlePress = () => setExpanded(!expanded)

  const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout))

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
      >
        <Summary />
        <ScrollView>
          <TouchableOpacity>
            <List.Item
              onPress={() => navigation.navigate('Performance')}
              style={styles.item}
              title="Sales Performannce"
              left={(props) => <List.Icon {...props} icon="chart-bar" />}
            />
          </TouchableOpacity>

          <List.Accordion
            style={styles.dropdown}
            title="Financial Reports"
            left={(props) => <List.Icon {...props} icon={images.finance} />}
          >
            <Pressable onPress={handleModal}>
              <List.Item title="Income Statements" />
            </Pressable>
            <List.Item title="Receivables Ledger" />
            <List.Item title="Payables" />
            <List.Item title="Liabilitiies" />
          </List.Accordion>

          <TouchableOpacity>
            <List.Item
              style={styles.item}
              title="Transactions"
              left={(props) => <List.Icon {...props} icon="credit-card-check" />}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <List.Item
              style={styles.item}
              title="Customers"
              left={(props) => <List.Icon {...props} icon="account" />}
            />
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>

      <Pressable style={styles.createNewWrapper} onPress={handleModal}>
        <Image source={images.create} style={styles.createNew} />
      </Pressable>

      <Modal style={styles.modalContainer} animationType="slide" transparent visible={modalVisible} onRequestClose={handleModal}>

        <TouchableOpacity style={styles.modalItem} onPress={handleModal}>
          <Image source={images.transaction} style={styles.categories_img} />
          <Text> Add Transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalItem}>
          <Image source={images.customer} style={styles.categories_img} />
          <Text> Add Customer </Text>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}

export default Bookkeeping

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdown: {
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 10,
    borderColor: '#aaaaaa',
    borderWidth: 1,
    padding: 0,
    backgroundColor: '#efefef',
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 10,
    borderColor: '#aaaaaa',
    borderWidth: 1,
    padding: 7,
  },
  modalContainer: {
    margin: 50,
  },
  modalItem: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: '#aaaaaa',
    borderWidth: 1,
    padding: 16,
    backgroundColor: 'white',
    color: 'black',
  },
  // categories: {
  //   // flexDirection: 'row',
  //   marginHorizontal: 10,
  //   marginVertical: 2,
  //   borderRadius: 10,
  //   borderColor: '#aaaaaa',
  //   borderWidth: 1,
  //   padding: 16,
  //   backgroundColor: 'white',
  // },
  categories_img: {
    paddingHorizontal: 5,
    marginRight: 20,
  },
  createNewWrapper: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  createNew: {
    width: 40,
    height: 40,
  },
})
