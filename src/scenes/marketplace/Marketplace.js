import React from 'react'
import { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import ExciteBanner from './landingchunks/ExciteBanner'
import PopularCategorySwitch from './landingchunks/PopularCategorySwitch'
import { landingProduct } from '../../slices/marketplace.slice'
import { useDispatch } from 'react-redux'
import Displays from './landingchunks/Displays'
// 
export default function Marketplace({navigation}) {
    const dispatch = useDispatch()
    const getData = async ()=>{
        const response =await fetch('http://localhost:7000/marketplace/landing/products/banners/offers/get');
        const data = await response.json();
        console.log(data)
        dispatch(landingProduct(data))
    }
    useEffect(()=>{
        console.log('marketplace')
        getData()
    },[])

   

    return (
        <View>
            <ExciteBanner />
            <PopularCategorySwitch />
            <Displays />
                {/* <Button title="Drawer" onPress={()=>navigation.toggleDrawer()}></Button> */}
        </View>
    )
}
