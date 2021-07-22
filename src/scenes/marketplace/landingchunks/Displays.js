import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { SIZES } from '../../../theme/theme'
// import { FlatList } from 'react-native-gesture-handler'
//
const Displays = ({ products, display }) => {
  console.log(display, products)

  const [data, setData] = useState([])

  useEffect(() => {
    setData(products)
  }, [products, display])
  const RenderItem = ({ item }) => {
    // console.log(item)
    return (
      <View style={styles.renderItem}>
        <Image
          //   source={item.images[0].Location}
          source={{ uri: item.images[0].Location }}
          style={{ width: (SIZES.width - 40) /2, height: (SIZES.width - 40)/2}}
          resizeMode="contain"
        />
        <View style={styles.tag}>
          <Text>{item?.title}</Text>
          <Text>{Number(item.price).toLocaleString()}</Text>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.renderRoot} horizontal={true}>

        {data?.map((item,index)=><RenderItem key={index} item={item}/>)}
       </ScrollView>

      {/* <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
      /> */}
      
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
    padding: 20,
    // height:500
  },
  renderRoot:{
    //   flexDirection:'row',
    //   flexWrap:'wrap'
  },
  renderItem: {
    // flex:1,
    // width: '50%',
    padding: 20,
  },
  tag: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
})
