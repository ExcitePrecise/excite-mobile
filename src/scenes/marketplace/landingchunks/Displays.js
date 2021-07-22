import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
//
const Displays = ({ products, display }) => {
  console.log(display, products)

  const [data, setData] = useState([])

  useEffect(() => {
    setData(products)
  }, [products, display])
  const renderItem = ({ item }) => (
    // <View style={styles.renderRoot}>
      <View style={styles.renderItem}>
        <Image
          source={{
            uri: item.images[0]?.Location,
          }}
        />
        <View style={styles.tag}>
          <Text>{item?.title}</Text>
          <Text>{Number(item.price).toLocaleString()}</Text>
        </View>
      </View>
    // </View>
  )
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
      />
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.marketplace.landing?.products?.filter(
      (item) => item.category === state.marketplace.display,
    ),
    display: state.marketplace.display,
    allProducts: state.marketplace.landing?.products,
  }
}

export default connect(mapStateToProps)(Displays)

const styles = StyleSheet.create({
  container: {
    //   flexDirection:'row',
    flex:1,
    padding:20
  },
  renderItem:{
    // flex:1,
    width:"50%",
    padding:20
  },
  tag:{
      flexDirection:'row',
      justifyContent:'space-between'
  }
})
