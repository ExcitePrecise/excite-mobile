import React from 'react'
import { Image, StyleSheet, Text, View,ScrollView } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
// 
const Displays = ({products,display}) => {
    console.log(display,products)

    const [data,setData]=useState([]);

    useEffect(()=>{
        setData(products)
    },[products,display])
    function Item({item}){
        console.log(item)
        const [state,setState]=useState({...item})
        return(
            <View>
                <Image 
                source={{
                    uri:item.images[0]?.Location}
                }
                />
                <Text>{item?.title}</Text>
            </View>
        )
    }
    return (
        <ScrollView>
            {data ? data.map((item,index)=><Item key={index} item={item}/>):<View><Text>Loading</Text></View>}
        </ScrollView>
        // <View>
        //     <Text>{data ? data[0]?.title: "loading"}</Text>
        // </View>
    )
}

const mapStateToProps =(state)=>{
return{
    products:state.marketplace.landing?.products?.filter(item=>item.category===state.marketplace.display),
    display:state.marketplace.display,
    allProducts:state.marketplace.landing?.products
}
}

export default connect(mapStateToProps)(Displays)

const styles = StyleSheet.create({})
