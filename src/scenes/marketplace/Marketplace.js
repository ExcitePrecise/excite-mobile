import React from 'react'
import { useEffect } from 'react'
import {
  ScrollView,
  RefreshControl,
} from 'react-native'
import ExciteBanner from './landingchunks/ExciteBanner'
import PopularCategorySwitch from './landingchunks/PopularCategorySwitch'
import { landingProduct } from '../../slices/marketplace.slice'
import { useDispatch } from 'react-redux'
import { isLoading, setTabIcon, setTitle,popBanner } from './../../slices/app.slice'
import useAxios from './../../utils/axios/init'
import ActivityLoading from './../../utils/axios/Loading'
import BannerNotification from '../../components/BannerNotification'

//
export default function Marketplace({ navigation }) {
  // Refresh control
  const [refreshing, setRefreshing] = React.useState(false)

  //
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      dispatch(isLoading(true))
      // setRefreshing(true)
      const response = await useAxios.get(
        '/marketplace/landing/products/banners/offers/get',
      )
      const data = response.data
      // console.log(response)
      dispatch(isLoading(false))
      dispatch(landingProduct(data))
      setRefreshing(false)
    } catch (error) {
      dispatch(isLoading(false))
      setRefreshing(false)
      dispatch(popBanner({visible:true,msg:'Network Error',type:'error'}))
      console.log('err', error)
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getData()
  }, [])

  React.useEffect(() => {
    getData();
    //clean up
    return ()=>setRefreshing(false)
  }, [])

  React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        dispatch(setTitle({title:"Marketplace"}))
        dispatch(setTabIcon({icon:'shopping-bag'}))
      });
      return unsubscribe;
    }, [navigation]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    > 
    <BannerNotification />
      <ExciteBanner />
      {/* <TouchableOpacity > */}
      <ActivityLoading />
      {/* </TouchableOpacity> */}
      <PopularCategorySwitch navigation={navigation} />
    </ScrollView>
  )
}
