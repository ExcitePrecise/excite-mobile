import React from 'react'
import { useEffect } from 'react'
import { View, Text, Button , ScrollView, TouchableOpacity} from 'react-native'
import ExciteBanner from './landingchunks/ExciteBanner'
import PopularCategorySwitch from './landingchunks/PopularCategorySwitch'
import { landingProduct } from '../../slices/marketplace.slice'
import { useDispatch } from 'react-redux'
import {isLoading} from './../../slices/app.slice'
import axios from 'axios'
import useAxios from './../../utils/axios/init'
import ActivityLoading from './../../utils/axios/Loading'
// 
export default function Marketplace({navigation}) {
    const dispatch = useDispatch()
    const getData = async ()=>{
        try {
            dispatch(isLoading(true))
            const response =await useAxios.get('/marketplace/landing/products/banners/offers/get');
            const data = response.data;
            // console.log(response)
            dispatch(isLoading(false))

            dispatch(landingProduct(data))
        } catch (error) {
            dispatch(isLoading(false))

            console.log('err',error)
        }
      
    }
    useEffect(()=>{
        // console.log('marketplace')
        getData()
    },[])

   

    return (
        <ScrollView style={{flex:1}}>
            <ExciteBanner />
            {/* <TouchableOpacity > */}
            <ActivityLoading />
            {/* </TouchableOpacity> */}
            <PopularCategorySwitch navigation={navigation}/>
        </ScrollView>
    )
}
