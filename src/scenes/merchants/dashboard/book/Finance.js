// kazeem.again@gmail.com

import React, { useState, useCallback } from 'react'
import {
  SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity, Image, RefreshControl, ScrollView, Pressable,
} from 'react-native'
import { List, Modal } from 'react-native-paper'
import { images } from 'theme'
import Summary from './Summary'

const Finance = ({navigation}) => {
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
      <Text>Hello from Finance </Text>
    </SafeAreaView>
  )
}

export default Finance

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
