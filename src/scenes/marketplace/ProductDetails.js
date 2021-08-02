import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

const ProductDetails =({route,products}) =>{
    const {productID}=route.params
    const [item,setItem] = useState({});

    useEffect(()=>{
        const product=products?.filter(item=>item._id===productID)
        setItem(product[0])
    },[products])
    return (
        <View>
        <View>
            {/* <ImageBackground source={{uri:item?.images[0]?.Location}} resizeMode='contain' style={{height:300}}/> */}
        </View>
            {/* <ImageBackground source={{uri:item?.images[0]?.Location}} style={{maxHeight:300}} resizeMode='cover'/> */}
            <Text>Details {item?.title}</Text>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
      products: state.marketplace?.landing.products,
    }
  }

  export default connect(mapStateToProps)(ProductDetails)

const styles = StyleSheet.create({})
