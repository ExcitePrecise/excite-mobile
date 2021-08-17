import React from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import { useDispatch } from 'react-redux'
import Index from '../../../../../components/listing/product/Index'
import { setTabIcon, setTitle } from '../../../../../slices/app.slice'
import { COLORS, SIZES } from '../../../../../theme/theme'

const index = ({ navigation }) => {
  const disptach = useDispatch()
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      //   alert('hello')
      disptach(setTitle({title:"Product Listing"}))
      disptach(setTabIcon({icon:'playlist-add'}))
    })

    return unsubscribe
  }, [navigation])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.root}>
        <Index navigation={navigation}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  root: {
    padding: 10,
    flex: 1,
    backgroundColor: COLORS.white,
    marginVertical:20,
    borderRadius:3,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
})
