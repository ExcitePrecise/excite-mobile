import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { colors } from 'theme'
// import axios from 'axios'
import useAxios from '../../../../utils/axios/init'

const Summary = ({ token }) => {
  const [summary, setSummary] = useState([])

  const getTransactions = () => {
    useAxios('/transaction', { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        setSummary(res.data.result)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getTransactions()
  }, [])

  const calculateGrandTotal = (arrayData) => {
    const itemArray = [...arrayData]
    let total = 0
    for (let i = 0; i < itemArray.length; i++) {
      itemArray[i].total = Number(itemArray[i].total)
      total += itemArray[i].total
    }
    return total
  }

  const calculateTotalCost = (arrayData) => {
    const itemArray = [...arrayData]
    let inventorySum = 0
    for (let i = 0; i < itemArray.length; i++) {
      if (itemArray[i].accountType === 'costOfSale') {
        itemArray[i].productSaleSum = itemArray[i].total
      }
      itemArray[i].productSaleSum = Number(itemArray[i].productSaleSum)
      inventorySum += itemArray[i].productSaleSum
    }
    return inventorySum
  }

  const incomeData = summary.filter(
    (incomes) => incomes.accountType === 'income',
  )

  const expenseData = summary.filter(
    (expenses) => expenses.accountType === 'expense',
  )

  const costData = summary.filter((costs) => {
    if (costs.accountType === 'costOfSale') {
      costs.productSaleSum === costs.total
    }
    return costs.accountType === 'costOfSale' || costs.productSaleSum
  })

  const currencyFormat = (num) => {
    return 'N' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const calculateGrossProfit =
    calculateGrandTotal(incomeData) - calculateTotalCost(costData) || 0

  const calculateNetProfit =
    calculateGrossProfit - calculateGrandTotal(expenseData) || 0

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.heading1}>
          <Text style={styles.heading}>Gross Profit</Text>
          <Text style={styles.title}>
            {calculateGrossProfit ? currencyFormat(calculateGrossProfit) : '0'}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.heading}>Cost of Sale</Text>
            <Text style={styles.title2}>
              {calculateTotalCost(costData)
                ? currencyFormat(calculateTotalCost(costData))
                : '0'}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.heading}>Net Profit</Text>
            <Text style={styles.title2}>
              {calculateNetProfit ? currencyFormat(calculateNetProfit) : '0'}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(Summary)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 50,
    padding: 15,
    backgroundColor: '#0D0827',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  summary: {
    color: '#ffffff',
    fontSize: 20,
  },
  heading1: {
    color: '#ffffff',
    fontSize: 15,
    paddingBottom: 20,
  },
  heading: {
    color: colors.exciteGreen,
    fontSize: 15,
  },
  title: {
    color: '#eeeeee',
    fontSize: 30,
  },
  title2: {
    color: '#eeeeee',
    fontSize: 20,
  },
})
