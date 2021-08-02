import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { SIZES } from '../../theme/theme'


const Item=({item,navigation,route})=>{
    return(
    <TouchableOpacity onPress={()=>navigation.navigate("Details",{productID:item._id})}>
        <View>
            <ImageBackground source={{uri:item?.images[0]?.Location}} resizeMode='cover' style={{height:200}}/>
        </View>
        <View>
            <Text>{item.title}</Text>
        </View>
    </TouchableOpacity>
    )}

const Products = ({ route, products,navigation }) => {
  const { category, subs } = route.params
  const [data, setData] = useState([])
  useEffect(() => {
    const items = products?.filter(
      (item) => item.category === category && item.subCategory === subs,
    )
    console.log(category, subs)
    setData(items)
  }, [products])

//   const renderItem=({item,navigation})=>{
//   return(
//   <TouchableOpacity>
//       <View>
//           <ImageBackground source={{uri:item?.images[0]?.Location}} resizeMode='cover' style={{width:SIZES.width,height:200}}/>
//       </View>
//       <View>
//           <Text>{item.title}</Text>
//       </View>
//   </TouchableOpacity>
//   )}
  return (
    <View>
      <FlatList 
      data={data}
      renderItem={({item})=><Item item={item} navigation={navigation}/>}
      keyExtractor={(item,index)=>item._id}
      
      />
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.marketplace?.landing.products,
  }
}

export default connect(mapStateToProps)(Products)

const styles = StyleSheet.create({})
