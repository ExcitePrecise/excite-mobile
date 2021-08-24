import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  Dimensions,
  Icon,
  Pressable,
} from 'react-native'
import { Button } from 'react-native-paper'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit'
import { connect } from 'react-redux'
import { colors, images } from 'theme'
import useAxios from '../../../../utils/axios/init'

const Performance = ({ token, navigation }) => {
  //   const getTransactions = () => {
  //     useAxios('/transaction', { headers: { authorization: `Bearer ${token}` } })
  //       .then((res) => {
  //         setSummary(res.data.result)
  //       })
  //       .catch((error) => console.log(error))
  //   }

  const [summaryData, setSummaryData] = useState([])
  // const [tableData, setTableData] = useState([])
  const [salesTableData, setSalesTableData] = useState([])
  const [customersTableData, setCustomersTableData] = useState([])
  const [incomeTableData, setIncomeTableData] = useState([])
  const [receivablesTableData, setReceivablesTableData] = useState([])
  const [isLoaded, setIsLoded] = useState(true)
  // const [taxPay, setTaxPay] = useState();
  const [modal, setModal] = useState(false)
  const [MDBModal, setMDBModal] = useState(false)
  const [MDBCustomerModal, setMDBCustomerModal] = useState(false)
  const [MDBTransactionModal, setMDBTransactionModal] = useState(false)
  const [MDBPostTransactionModal, setMDBPostTransactionModal] = useState(false)
  const [MDBIncomeModal, setMDBIncomeModal] = useState(false)
  // const [invoiceModal, setInvoiceModal] = useState(false);
  const [saleChartData, setSaleChartData] = useState([])
  const [dataForChart, setDataForChart] = useState([])
  // const [chartMonthData, setChartMonthData] = useState([]);
  const [tableForChart, setTableForChart] = useState([])
  const [monthlyTableData, setMonthlyTableData] = useState(false)
  const [yearlyTableData, setYearlyTableData] = useState(false)
  const [yearlyDisplayData, setYearlyDisplayData] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const handleModal = (state) => {
    setModal(state)
  }

  const saleModal = () => {
    setMDBModal(!MDBModal)
  }

  const handleCustomerModal = () => {
    setMDBCustomerModal(!MDBCustomerModal)
  }

  const handleTransactionModal = () => {
    setMDBTransactionModal(!MDBTransactionModal)
  }

  const handlePostTransactionModal = () => {
    setMDBPostTransactionModal(!MDBPostTransactionModal)
  }

  const handleIncomeModal = () => {
    setMDBIncomeModal(!MDBIncomeModal)
  }

  // const toggleModal = () => {
  //   setMDBModal(!MDBModal);
  // };

  const getSummary = (summaryData) => {
    setSummaryData(summaryData)
  }

  // Get sales list
  const getReceivables = async () => {
    await useAxios
      .get('/receivables/all')
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.records
          setReceivablesTableData(data)
        } else {
          console.error(error)
        }
      })
      .catch((err) => console.log(err))
  }

  // Get sales list
  const getSales = () => {
    useAxios
      .get('/sales/all', { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.records
          setSalesTableData(data)
          setSaleChartData(data)
        } else {
          return <p>Oops! Could not fetch data.</p>
        }
      })
      .catch((err) => console.log(err))
  }

  const getCustomers = () => {
    useAxios
      .get('/customer/')
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.result
          setCustomersTableData(data)
        } else {
          console.error(error)
        }
      })
      .catch((err) => console.log(err))
  }

  const getIncome = () => {
    useAxios
      .get('/post-transaction/')
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.result
          setIncomeTableData(data)
        } else {
          console.error(error)
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getReceivables()
    getSales()
    getCustomers()
    getIncome()
    displayWeekly()
  }, [])

  let saleDate

  let week1
  let week2
  let week3
  let week4
  let week5

  const week1Array = []
  const week2Array = []
  const week3Array = []
  const week4Array = []
  const week5Array = []

  let jan = 0
  let feb = 0
  let mar = 0
  let apr = 0
  let may = 0
  let jun = 0
  let jul = 0
  let aug = 0
  let sept = 0
  let oct = 0
  let nov = 0
  let dec = 0

  let janArray = []
  let febArray = []
  let marArray = []
  let aprArray = []
  let mayArray = []
  let junArray = []
  let julArray = []
  let augArray = []
  let septArray = []
  let octArray = []
  let novArray = []
  let decArray = []

  const saleWeek1Array = []
  const saleWeek2Array = []
  const saleWeek3Array = []
  const saleWeek4Array = []
  const saleWeek5Array = []
  // const saleWeek6Array = [];

  let currentYear = 0
  let lastYear = 0
  let twoYearsAgo = 0
  let threeYearsAgo = 0
  let fourYearsAgo = 0

  const currentYearArray = []
  const lastYearArray = []
  const twoYearsAgoArray = []
  const threeYearsAgoArray = []
  const fourYearsAgoArray = []

  const getTotal = (total, num) => total + num

  // alternative for getTotal
  const calculateTotal = (someArray) => {
    const itemArray = [...someArray]
    let total = 0
    for (let i = 0; i < itemArray.length; i++) {
      total += itemArray[i].total
    }
    return total
  }

  // weekly  sales
  const salesChart = () => {
    const saleInfo = saleChartData.map((saleData) => {
      const updatedAt = saleData.updatedAt.split('T')
      saleDate = new Date(updatedAt[0])
      if (getWeekOfMonth(saleDate) === 1) {
        saleWeek1Array.push(saleData)
        week1Array.push(saleData.total)
        week1 = week1Array.reduce(getTotal)
        return week1
      }
      if (getWeekOfMonth(saleDate) === 2) {
        // week2 = getWeekOfMonth(saleDate);
        saleWeek2Array.push(saleData)
        week2Array.push(saleData.total)
        week2 = week2Array.reduce(getTotal)
        // console.log('data is in week 2', week2);
        return week2
      }
      if (getWeekOfMonth(saleDate) === 3) {
        // week3 = getWeekOfMonth(saleDate);
        saleWeek3Array.push(saleData)
        week3Array.push(saleData.total)
        week3 = week3Array.reduce(getTotal)
        // console.log('data is in week 3', week3);
        return week3
      }
      if (getWeekOfMonth(saleDate) === 4) {
        // week4 = getWeekOfMonth(saleDate);
        saleWeek4Array.push(saleData)
        week4Array.push(saleData.total)
        week4 = week4Array.reduce(getTotal)
        // console.log('data is in week 4', week4);
        return week4
      }
      if (getWeekOfMonth(saleDate) === 5) {
        // week5 = getWeekOfMonth(saleDate);
        saleWeek5Array.push(saleData)
        week5Array.push(saleData.total)
        week5 = week5Array.reduce(getTotal)
        // console.log('data is in week 5', week5);
        return week5
      }
      return week1, week2, week3, week4, week5
    })
    return week1, week2, week3, week4, week5
  }

  const getWeekOfMonth = (saleDate) => {
    // console.log('saleDate ', saleDate);
    const adjustedDate = saleDate.getDate() + saleDate.getDay()
    const prefixes = ['0', '1', '2', '3', '4', '5']
    return parseInt(prefixes[0 | (adjustedDate / 7)]) + 1
  }
  salesChart()

  const thisYear = new Date().getFullYear()

  //* ************ new dates alggorithm begins *************
  const janTotal = []
  const febTotal = []
  const marTotal = []
  const aprTotal = []
  const mayTotal = []
  const junTotal = []
  const julTotal = []
  const augTotal = []
  const septTotal = []
  const octTotal = []
  const novTotal = []
  const decTotal = []

  const month = [
    janArray,
    febArray,
    marArray,
    aprArray,
    mayArray,
    junArray,
    julArray,
    augArray,
    septArray,
    octArray,
    novArray,
    decArray,
  ]

  // const monthlyTotal = [janTotal, febTotal, marTotal, aprTotal, mayTotal, junTotal, julTotal, augTotal, septTotal, octTotal, novTotal, decTotal];

  const calcMonthlyTotal = []
  const weekOne = []
  const weekTwo = []
  const weekThree = []
  const weekFour = []
  const weekFive = []

  const week = [weekOne, weekTwo, weekThree, weekFour, weekFive]

  // const year = [currentYearArray, lastYearArray, twoYearsAgoArray, threeYearsAgoArray, fourYearsAgoArray];

  // const handleMonthData = (monthData) => {
  //   calcMonthlyTotal = monthData;
  //   console.log('may is ', may);
  //   console.log('calc is ', calcMonthlyTotal);
  //   return calcMonthlyTotal;
  // };

  const displayWeekly = () => {
    setDataForChart(data)
    setTableForChart(saleWeek1Array)
    setMonthlyTableData(false)
    setYearlyTableData(false)
  }

  const displayMonthly = () => {
    saleYear = yearlyDisplayData
    setDataForChart(dataMonth)
    setTableForChart(janArray)
    setMonthlyTableData(true)
    setYearlyTableData(false)
  }

  const displayYearly = () => {
    setDataForChart(dataYear)
    setTableForChart(currentYearArray)
    setMonthlyTableData(false)
    setYearlyTableData(true)
  }

  let saleYear
  let saleMonth

  const yearSalesChart = () => {
    // const total = 0;
    const saleInfo = saleChartData.map((saleData) => {
      saleYear = Number(saleData.updatedAt.split('-')[0])
      saleMonth = Number(saleData.updatedAt.split('-')[1])
      saleData.updatedAt = saleData.updatedAt.split('T')[0]

      if (saleYear === thisYear) {
        currentYearArray.push(saleData)
        currentYear += saleData.total

        if (
          saleMonth === month.indexOf(month[saleMonth]) &&
          yearlyDisplayData === thisYear
        ) {
          month[saleMonth - 1].push(saleData)
          for (let i = 0; i < month.length; i++) {
            calcMonthlyTotal[i] = calculateTotal(month[i])
            ;[
              jan,
              feb,
              mar,
              apr,
              may,
              jun,
              jul,
              aug,
              sept,
              oct,
              nov,
              dec,
            ] = calcMonthlyTotal
          }
          const updatedAt = saleData.updatedAt.split('T')
          saleDate = new Date(updatedAt[0])
          const weekNumber = getWeekOfMonth(saleDate)
          week[weekNumber - 1].push(saleData)
        }
        return
      }

      if (saleYear === thisYear - 1) {
        lastYear += saleData.total // total
        if (yearlyDisplayData === thisYear - 1) {
          lastYearArray.push(saleData)

          const newMonthData = [
            janTotal,
            febTotal,
            marTotal,
            aprTotal,
            mayTotal,
            junTotal,
            julTotal,
            augTotal,
            septTotal,
            octTotal,
            novTotal,
            decTotal,
          ]

          if (saleMonth === newMonthData.indexOf(newMonthData[saleMonth])) {
            newMonthData[saleMonth - 1].push(saleData)
            ;[
              janArray,
              febArray,
              marArray,
              aprArray,
              mayArray,
              junArray,
              julArray,
              augArray,
              septArray,
              octArray,
              novArray,
              decArray,
            ] = newMonthData

            for (let i = 0; i < month.length; i++) {
              calcMonthlyTotal[i] = calculateTotal(newMonthData[i])
              ;[
                jan,
                feb,
                mar,
                apr,
                may,
                jun,
                jul,
                aug,
                sept,
                oct,
                nov,
                dec,
              ] = calcMonthlyTotal
            }
            const updatedAt = saleData.updatedAt.split('T')
            saleDate = new Date(updatedAt[0])
            const weekNumber = getWeekOfMonth(saleDate)
            week[weekNumber - 1].push(saleData)
          }
        }
        return
      }
      if (saleYear == thisYear - 2) {
        twoYearsAgoArray.push(saleData)
        twoYearsAgo += saleData.total
        return twoYearsAgo
      }
      if (saleYear == thisYear - 3) {
        threeYearsAgoArray.push(saleData)
        threeYearsAgo += saleData.total
        return threeYearsAgo
      }
      if (saleYear == thisYear - 4) {
        fourYearsAgoArray.push(saleData.total)
        fourYearsAgo += saleData.total
        return fourYearsAgo
      }
    })
    return currentYear, lastYear, twoYearsAgo, threeYearsAgo, fourYearsAgo
  }
  yearSalesChart()

  const data = {
    datasets: [
      {
        data: [week1, week2, week3, week3, week4, week5],
        backgroundColor: [
          '#A7CC48',
          // '#FF6384',
          '#FF6384',
          'orange',
          '#36A2EB',
          'green',
          'brown',
        ],
        label: 'Sales', // for legend
      },
    ],
    labels: ['', 'week1', 'week2', 'week3', 'week4', 'week5'],
  }

  const dataMonth = {
    datasets: [
      {
        data: [0, jan, feb, mar, apr, may, jun, jul, aug, sept, oct, nov, dec],
        backgroundColor: [
          '#A7CC48',
          // '#FF6384',
          // '#4BC0C0',
          '#FF6384',
          'orange',
          '#36A2EB',
          'green',
          'brown',
          'blue',
          'khaki',
          'cyan',
          'black',
          'red',
          'dark gray',
        ],
        label: 'Sales', // for legend
      },
    ],
    labels: [
      '',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ],
  }

  const dataYear = {
    datasets: [
      {
        data: [fourYearsAgo, threeYearsAgo, twoYearsAgo, lastYear, currentYear],
      },
    ],
    labels: [thisYear - 4, thisYear - 3, thisYear - 2, thisYear - 1, thisYear],
  }

  const wait = (timeout) =>
    new Promise((resolve) => setTimeout(resolve, timeout))

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.chart}>
          <Text style={styles.header}>Sales</Text>
          <LineChart
            data={dataYear}
            width={Dimensions.get('window').width - 32}
            height={220}
            yAxisLabel="N"
            chartConfig={{
              backgroundColor: '#BCF75E',
              backgroundGradientFrom: '#000000',
              backgroundGradientTo: '#001700',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 255) => `rgba(167, 250, 72, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        <View style={styles.chartBtn}>
          <Button
            onPress={displayYearly}
            title="Years"
            color="black"
            mode="outlined"
            accessibilityLabel="Display chart by years"
          >
            {' '}
            Years
          </Button>
          <Button
            onPress={displayMonthly}
            title="Months"
            color="black"
            mode="outlined"
            accessibilityLabel="Display chart by months"
          >
            {' '}
            Months
          </Button>
        </View>
        <View style={styles.menu}>
          <Button
            icon="storefront-outline"
            mode="contained"
            color="white"
            accessibilityLabel="Items in Store"
            onPress={() => navigation.navigate('Inventory')}
          >
            {' '}
            Items in Store{' '}
          </Button>
        </View>
        <View style={styles.menu}>
          <Button
            icon="cart-arrow-down"
            mode="contained"
            dark={false}
            color="white"
            accessibilityLabel="Sales"
            onPress={() => navigation.navigate('Sales')}
          >
            Sales
          </Button>
        </View>
        <View style={styles.menu}>
          <Button
            icon="chart-bar"
            mode="contained"
            color="white"
            onPress={() => console.log('Pressed')}
          >
            Sales Plan
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  token: state?.app?.token,
})

export default connect(mapStateToProps)(Performance)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
    // margin: 5,
  },
  chart: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001100',
  },
  chartBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  menu: {
    marginVertical: 5,
  },
})

// // backup Mon, Aug 16 2021
// import React, { useState, useEffect, useCallback } from 'react'
// import {
//   SafeAreaView, StyleSheet, Text, View, RefreshControl, ScrollView, Dimensions, Icon, Pressable,
// } from 'react-native'
// import { Button } from 'react-native-paper'
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from 'react-native-chart-kit'
// import { connect } from 'react-redux'
// import { colors, images } from 'theme'
// import useAxios from '../../../../utils/axios/init'

// const Performance = ({ token, navigation }) => {
//   //   const getTransactions = () => {
//   //     useAxios('/transaction', { headers: { authorization: `Bearer ${token}` } })
//   //       .then((res) => {
//   //         setSummary(res.data.result)
//   //       })
//   //       .catch((error) => console.log(error))
//   //   }

//   const [summaryData, setSummaryData] = useState([])
//   const [tableData, setTableData] = useState([])
//   const [salesTableData, setSalesTableData] = useState([])
//   const [customersTableData, setCustomersTableData] = useState([])
//   const [incomeTableData, setIncomeTableData] = useState([])
//   const [receivablesTableData, setReceivablesTableData] = useState([])
//   const [isLoaded, setIsLoded] = useState(true)
//   // const [taxPay, setTaxPay] = useState();
//   const [modal, setModal] = useState(false)
//   const [MDBModal, setMDBModal] = useState(false)
//   const [MDBCustomerModal, setMDBCustomerModal] = useState(false)
//   const [MDBTransactionModal, setMDBTransactionModal] = useState(false)
//   const [MDBPostTransactionModal, setMDBPostTransactionModal] = useState(false)
//   const [MDBIncomeModal, setMDBIncomeModal] = useState(false)
//   // const [invoiceModal, setInvoiceModal] = useState(false);
//   const [saleChartData, setSaleChartData] = useState([])
//   const [dataForChart, setDataForChart] = useState([])
//   // const [chartMonthData, setChartMonthData] = useState([]);
//   const [tableForChart, setTableForChart] = useState([])
//   const [monthlyTableData, setMonthlyTableData] = useState(false)
//   const [yearlyTableData, setYearlyTableData] = useState(false)
//   const [yearlyDisplayData, setYearlyDisplayData] = useState(null)
//   const [refreshing, setRefreshing] = useState(false)

//   const handleModal = (state) => {
//     setModal(state)
//   }

//   const saleModal = () => {
//     setMDBModal(!MDBModal)
//   }

//   const handleCustomerModal = () => {
//     setMDBCustomerModal(!MDBCustomerModal)
//   }

//   const handleTransactionModal = () => {
//     setMDBTransactionModal(!MDBTransactionModal)
//   }

//   const handlePostTransactionModal = () => {
//     setMDBPostTransactionModal(!MDBPostTransactionModal)
//   }

//   const handleIncomeModal = () => {
//     setMDBIncomeModal(!MDBIncomeModal)
//   }

//   // const toggleModal = () => {
//   //   setMDBModal(!MDBModal);
//   // };

//   const getSummary = (summaryData) => {
//     setSummaryData(summaryData)
//   }

//   // Get products list
//   const getData = () => {
//     useAxios.get('/book-keeping/all').then((res) => {
//       if (res.status == 200) {
//         const data = res.data.records
//         setTableData(data)
//       } else {
//         return (
//           <p>Oops! Could not fetch data.</p>
//         )
//       }
//     })
//     .catch((err) => console.log(err))
//   }

//   // Get sales list
//   const getReceivables = async () => {
//     await useAxios.get('/receivables/all').then((res) => {
//       if (res.status == 200) {
//         const data = res.data.records
//         setReceivablesTableData(data)
//       } else {
//         console.error(error)
//       }
//     })
//     .catch((err) => console.log(err))
//   }

//   // Get sales list
//   const getSales = () => {
//     useAxios.get('/sales/all', { headers: { authorization: `Bearer ${token}` } }).then((res) => {
//       if (res.status == 200) {
//         const data = res.data.records
//         setSalesTableData(data)
//         setSaleChartData(data)
//       } else {
//         return (
//           <p>Oops! Could not fetch data.</p>
//         )
//       }
//     })
//     .catch((err) => console.log(err))
//   }

//   const getCustomers = () => {
//     useAxios.get('/customer/')
//       .then((response) => {
//         if (response.status === 200) {
//           const data = response.data.result
//           setCustomersTableData(data)
//         } else {
//           console.error(error)
//         }
//       })
//       .catch((err) => console.log(err))
//   }

//   const getIncome = () => {
//     useAxios.get('/post-transaction/')
//       .then((response) => {
//         if (response.status === 200) {
//           const data = response.data.result
//           setIncomeTableData(data)
//         } else {
//           console.error(error)
//         }
//       })
//       .catch((err) => console.log(err))
//   }

//   useEffect(() => {
//     getData(); getReceivables(); getSales(); getCustomers(); getIncome()
//     displayWeekly()
//   }, [])

//   let saleDate

//   let week1
//   let week2
//   let week3
//   let week4
//   let week5

//   const week1Array = []
//   const week2Array = []
//   const week3Array = []
//   const week4Array = []
//   const week5Array = []

//   let jan = 0
//   let feb = 0
//   let mar = 0
//   let apr = 0
//   let may = 0
//   let jun = 0
//   let jul = 0
//   let aug = 0
//   let sept = 0
//   let oct = 0
//   let nov = 0
//   let dec = 0

//   let janArray = []
//   let febArray = []
//   let marArray = []
//   let aprArray = []
//   let mayArray = []
//   let junArray = []
//   let julArray = []
//   let augArray = []
//   let septArray = []
//   let octArray = []
//   let novArray = []
//   let decArray = []

//   const saleWeek1Array = []
//   const saleWeek2Array = []
//   const saleWeek3Array = []
//   const saleWeek4Array = []
//   const saleWeek5Array = []
//   // const saleWeek6Array = [];

//   let currentYear = 0
//   let lastYear = 0
//   let twoYearsAgo = 0
//   let threeYearsAgo = 0
//   let fourYearsAgo = 0

//   const currentYearArray = []
//   const lastYearArray = []
//   const twoYearsAgoArray = []
//   const threeYearsAgoArray = []
//   const fourYearsAgoArray = []

//   const getTotal = (total, num) => total + num

//   // alternative for getTotal
//   const calculateTotal = (someArray) => {
//     const itemArray = [...someArray]
//     let total = 0
//     for (let i = 0; i < itemArray.length; i++) {
//       total += itemArray[i].total
//     }
//     return total
//   }

//   // weekly  sales
//   const salesChart = () => {
//     const saleInfo = saleChartData.map((saleData) => {
//       const updatedAt = saleData.updatedAt.split('T')
//       saleDate = new Date(updatedAt[0])
//       if (getWeekOfMonth(saleDate) === 1) {
//         saleWeek1Array.push(saleData)
//         week1Array.push(saleData.total)
//         week1 = week1Array.reduce(getTotal)
//         return week1
//       }
//       if (getWeekOfMonth(saleDate) === 2) {
//       // week2 = getWeekOfMonth(saleDate);
//         saleWeek2Array.push(saleData)
//         week2Array.push(saleData.total)
//         week2 = week2Array.reduce(getTotal)
//         // console.log('data is in week 2', week2);
//         return week2
//       }
//       if (getWeekOfMonth(saleDate) === 3) {
//       // week3 = getWeekOfMonth(saleDate);
//         saleWeek3Array.push(saleData)
//         week3Array.push(saleData.total)
//         week3 = week3Array.reduce(getTotal)
//         // console.log('data is in week 3', week3);
//         return week3
//       }
//       if (getWeekOfMonth(saleDate) === 4) {
//       // week4 = getWeekOfMonth(saleDate);
//         saleWeek4Array.push(saleData)
//         week4Array.push(saleData.total)
//         week4 = week4Array.reduce(getTotal)
//         // console.log('data is in week 4', week4);
//         return week4
//       }
//       if (getWeekOfMonth(saleDate) === 5) {
//       // week5 = getWeekOfMonth(saleDate);
//         saleWeek5Array.push(saleData)
//         week5Array.push(saleData.total)
//         week5 = week5Array.reduce(getTotal)
//         // console.log('data is in week 5', week5);
//         return week5
//       }
//       return week1, week2, week3, week4, week5
//     })
//     return week1, week2, week3, week4, week5
//   }

//   const getWeekOfMonth = (saleDate) => {
//   // console.log('saleDate ', saleDate);
//     const adjustedDate = saleDate.getDate() + saleDate.getDay()
//     const prefixes = ['0', '1', '2', '3', '4', '5']
//     return (parseInt(prefixes[0 | adjustedDate / 7]) + 1)
//   }
//   salesChart()

//   const thisYear = new Date().getFullYear()

//   //* ************ new dates alggorithm begins *************
//   const janTotal = []
//   const febTotal = []
//   const marTotal = []
//   const aprTotal = []
//   const mayTotal = []
//   const junTotal = []
//   const julTotal = []
//   const augTotal = []
//   const septTotal = []
//   const octTotal = []
//   const novTotal = []
//   const decTotal = []

//   const month = [janArray, febArray, marArray, aprArray, mayArray, junArray, julArray, augArray, septArray, octArray, novArray, decArray]

//   // const monthlyTotal = [janTotal, febTotal, marTotal, aprTotal, mayTotal, junTotal, julTotal, augTotal, septTotal, octTotal, novTotal, decTotal];

//   const calcMonthlyTotal = []
//   const weekOne = []
//   const weekTwo = []
//   const weekThree = []
//   const weekFour = []
//   const weekFive = []

//   const week = [weekOne, weekTwo, weekThree, weekFour, weekFive]

//   // const year = [currentYearArray, lastYearArray, twoYearsAgoArray, threeYearsAgoArray, fourYearsAgoArray];

//   // const handleMonthData = (monthData) => {
//   //   calcMonthlyTotal = monthData;
//   //   console.log('may is ', may);
//   //   console.log('calc is ', calcMonthlyTotal);
//   //   return calcMonthlyTotal;
//   // };

//   const displayWeekly = () => {
//     setDataForChart(data)
//     setTableForChart(saleWeek1Array)
//     setMonthlyTableData(false)
//     setYearlyTableData(false)
//   }

//   const displayMonthly = () => {
//     saleYear = yearlyDisplayData
//     setDataForChart(dataMonth)
//     setTableForChart(janArray)
//     setMonthlyTableData(true)
//     setYearlyTableData(false)
//   }

//   const displayYearly = () => {
//     setDataForChart(dataYear)
//     setTableForChart(currentYearArray)
//     setMonthlyTableData(false)
//     setYearlyTableData(true)
//   }

//   let saleYear
//   let saleMonth

//   const yearSalesChart = () => {
//     // const total = 0;
//     const saleInfo = saleChartData.map((saleData) => {
//       saleYear = Number(saleData.updatedAt.split('-')[0])
//       saleMonth = Number(saleData.updatedAt.split('-')[1])
//       saleData.updatedAt = saleData.updatedAt.split('T')[0]

//       if (saleYear === thisYear) {
//         currentYearArray.push(saleData)
//         currentYear += saleData.total

//         if ((saleMonth === month.indexOf(month[saleMonth])) && (yearlyDisplayData === thisYear)) {
//           month[saleMonth - 1].push(saleData)
//           for (let i = 0; i < month.length; i++) {
//             calcMonthlyTotal[i] = calculateTotal(month[i]);
//             [jan, feb, mar, apr, may, jun, jul, aug, sept, oct, nov, dec] = calcMonthlyTotal
//           }
//           const updatedAt = saleData.updatedAt.split('T')
//           saleDate = new Date(updatedAt[0])
//           const weekNumber = getWeekOfMonth(saleDate)
//           week[weekNumber - 1].push(saleData)
//         }
//         return
//       }

//       if (saleYear === (thisYear - 1)) {
//         lastYear += saleData.total // total
//         if (yearlyDisplayData === (thisYear - 1)) {
//           lastYearArray.push(saleData)

//           const newMonthData = [janTotal, febTotal, marTotal, aprTotal, mayTotal, junTotal, julTotal, augTotal, septTotal, octTotal, novTotal, decTotal]

//           if (saleMonth === newMonthData.indexOf(newMonthData[saleMonth])) {
//             newMonthData[saleMonth - 1].push(saleData);
//             [janArray, febArray, marArray, aprArray, mayArray, junArray, julArray, augArray, septArray, octArray, novArray, decArray] = newMonthData

//             for (let i = 0; i < month.length; i++) {
//               calcMonthlyTotal[i] = calculateTotal(newMonthData[i]);
//               [jan, feb, mar, apr, may, jun, jul, aug, sept, oct, nov, dec] = calcMonthlyTotal
//             }
//             const updatedAt = saleData.updatedAt.split('T')
//             saleDate = new Date(updatedAt[0])
//             const weekNumber = getWeekOfMonth(saleDate)
//             week[weekNumber - 1].push(saleData)
//           }
//         }
//         return
//       }
//       if (saleYear == (thisYear - 2)) {
//         twoYearsAgoArray.push(saleData)
//         twoYearsAgo += saleData.total
//         return twoYearsAgo
//       }
//       if (saleYear == (thisYear - 3)) {
//         threeYearsAgoArray.push(saleData)
//         threeYearsAgo += saleData.total
//         return threeYearsAgo
//       }
//       if (saleYear == (thisYear - 4)) {
//         fourYearsAgoArray.push(saleData.total)
//         fourYearsAgo += saleData.total
//         return fourYearsAgo
//       }
//     })
//     return currentYear, lastYear, twoYearsAgo, threeYearsAgo, fourYearsAgo
//   }
//   yearSalesChart()

//   const data = {
//     datasets: [
//       {
//         data: [
//           week1,
//           week2,
//           week3,
//           week3,
//           week4,
//           week5,
//         ],
//         backgroundColor: [
//           '#A7CC48',
//           // '#FF6384',
//           '#FF6384',
//           'orange',
//           '#36A2EB',
//           'green',
//           'brown',
//         ],
//         label: 'Sales', // for legend
//       }],
//     labels: [
//       '',
//       'week1',
//       'week2',
//       'week3',
//       'week4',
//       'week5',
//     ],
//   }

//   const dataMonth = {
//     datasets: [
//       {
//         data: [0, jan, feb, mar, apr, may, jun, jul, aug, sept, oct, nov, dec],
//         backgroundColor: [
//           '#A7CC48',
//           // '#FF6384',
//           // '#4BC0C0',
//           '#FF6384',
//           'orange',
//           '#36A2EB',
//           'green',
//           'brown',
//           'blue',
//           'khaki',
//           'cyan',
//           'black',
//           'red',
//           'dark gray',
//         ],
//         label: 'Sales', // for legend
//       }],
//     labels: [
//       '',
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sept',
//       'Oct',
//       'Nov',
//       'Dec',
//     ],
//   }

//   const dataYear = {
//     datasets: [
//       {
//         data: [
//           fourYearsAgo,
//           threeYearsAgo,
//           twoYearsAgo,
//           lastYear,
//           currentYear,
//         ],
//       }],
//     labels: [
//       thisYear - 4,
//       thisYear - 3,
//       thisYear - 2,
//       thisYear - 1,
//       thisYear,
//     ],
//   }

//   const onRefresh = useCallback(() => {
//     setRefreshing(true)
//     wait(2000).then(() => setRefreshing(false))
//   }, [])

//   return (
//     <SafeAreaView style={styles.root}>
//     <ScrollView refreshControl={
//       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//     }>
//       <View style={styles.chart}>
//         <Text style={styles.header}>Sales</Text>
//         <LineChart
//           data={dataYear}
//           width={Dimensions.get('window').width - 32}
//           height={220}
//           yAxisLabel="N"
//           chartConfig={{
//             backgroundColor: '#BCF75E',
//             backgroundGradientFrom: '#000000',
//             backgroundGradientTo: '#001700',
//             decimalPlaces: 0, // optional, defaults to 2dp
//             color: (opacity = 255) => `rgba(167, 250, 72, ${opacity})`,
//             style: {
//               borderRadius: 16,
//             },
//           }}
//           bezier
//           style={{
//             marginVertical: 8,
//             borderRadius: 16,
//           }}
//         />
//       </View>

//       <View style={styles.chartBtn}>
//         <Button
//           onPress={displayYearly}
//           title="Years"
//           color="black"
//           mode="outlined"
//           accessibilityLabel="Display chart by years"
//         > Years
//         </Button>
//         <Button
//           onPress={displayMonthly}
//           title="Months"
//           color="black"
//           mode="outlined"
//           accessibilityLabel="Display chart by months"
//         > Months
//         </Button>
//       </View>
//       <View style={styles.menu}>
//         <Button icon='storefront-outline' mode="contained" color='white' accessibilityLabel="Items in Store" onPress={() => navigation.navigate('Inventory')}> Items in Store </Button>
//       </View>
//       <View style={styles.menu}>
//         <Button icon='cart-arrow-down' mode="contained" dark={false} color='white' accessibilityLabel="Sales"> Sales </Button>
//       </View>
//       <View style={styles.menu}>
//         <Button icon="chart-bar" mode="contained" color='white' onPress={() => console.log('Pressed')}>
//           Sales Plan
//         </Button>
//       </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const mapStateToProps = (state) => ({
//   token: state?.app?.token,
// })

// export default connect(mapStateToProps)(Performance)

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     // margin: 5,
//   },
//   chart: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#001100',
//   },
//   chartBtn: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 30,
//   },
//   menu: {
//     marginVertical: 5,
//   },
// })
