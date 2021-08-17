import React from 'react'
import { StyleSheet, View } from 'react-native'
import Subscriptions from "./../../../../components/subscription/Index"
import { useDispatch } from 'react-redux';
import { setTabIcon, setTitle } from '../../../../slices/app.slice';

function SubscriptionPage({navigation}) {
  const dispatch = useDispatch()
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // Alert.alert('Refreshed');
          // getData()
          dispatch(setTitle({title:"Subscriptions"}))
          dispatch(setTabIcon({icon:"money"}))
        })
        return unsubscribe
      }, [navigation])
  return (
    <View style={{ flex: 1 }}>
    <Subscriptions navigation={navigation} />
    </View>
  );
}

export default SubscriptionPage
