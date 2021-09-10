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
  FlatList,
  ActivityIndicator,
} from 'react-native'
import {
  List,
  Modal,
  Card,
  Paragraph,
  Title,
  Avatar,
  Button,
} from 'react-native-paper'
import { colors, images } from 'theme'
import { connect } from 'react-redux'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import useAxios from '../../../../utils/axios/init'
import Summary from './Summary'

const IncomeStatement = ({ token, navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transactionsData, setTransactionsData] = useState([])

  const getTransactions = () => {
    useAxios('/transaction', { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        setSummary(res.data.result)
      })
      .catch((error) => console.log(error))
  }

  const wait = (timeout) =>
    new Promise((resolve) => setTimeout(resolve, timeout))

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getTransactions()
    wait(2000).then(() => setRefreshing(false))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator color={colors.exciteGreen} size="large" />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <Summary />

            <View style={styles.itemList}>
              <Paragraph style={{ marginBottom: 20 }}>
                Select an option below for more details.
              </Paragraph>
              <View style={styles.linkSect}>
                <Button
                  icon="cash-marker"
                  mode="outlined"
                  color="black"
                  style={{ borderColor: 'black', marginBottom: 15 }}
                  onPress={() => navigation.navigate('Revenue')}
                >
                  Revenue
                </Button>
                <Button
                  icon="cash"
                  mode="outlined"
                  color="black"
                  style={{ borderColor: 'black', marginBottom: 15 }}
                  onPress={() => navigation.navigate('Cost')}
                >
                  Cost of Sale
                </Button>
                <Button
                  icon="cash-100"
                  mode="outlined"
                  color="black"
                  style={{ borderColor: 'black' }}
                  onPress={() => navigation.navigate('Expense')}
                >
                  Expense
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(IncomeStatement)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 50,
    // paddingBottom: 5,
  },
  summary: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryDetailLeft: {
    backgroundColor: colors.exciteGreen,
    width: '50%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  summaryDetailRight: {
    backgroundColor: 'black',
    width: '50%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  titleLeft: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  titleRight: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  detailLeft: {
    fontSize: 22,
    color: 'black',
  },
  detailRight: {
    fontSize: 22,
    color: 'white',
  },
  title: {
    fontSize: 20,
  },
  detail: {
    fontSize: 22,
    color: 'white',
  },
  separatorLine: {
    height: 1,
    paddingTop: 2,
    backgroundColor: '#EEEEEE',
  },
  itemList: {
    justifyContent: 'space-between',
    // backgroundColor: '#F7FAE9',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  linkSect: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: 5,
  },
  header: {
    // marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 40,
    justifyContent: 'space-between',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  row: {
    flexDirection: 'row',
  },
})
