import React from 'react'
import { useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { useState } from 'react'
import categories from '../../utils/productCategoriesHandler'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { COLORS, FONTS, SIZES } from '../../theme/theme'
import { fonts } from '../../theme'
import ExciteBanner from './landingchunks/ExciteBanner'
import { setTabIcon, setTitle } from '../../slices/app.slice'

// 
const Category = ({ route, products, navigation }) => {
  const dispatch=useDispatch()
  const [subs, setSubs] = useState([])
  const [data, setData] = useState([])
  const { category } = route.params
  useEffect(() => {
    const items = products?.filter((item) => item.category === category)
    const cats = categories[category];
    if(cats){
      setSubs(cats)
      setData(items)
      return
    }
   
  }, [products])
  const handleStatistcs = (subsCat) => {
    return data?.filter((item) => item.subCategory === subsCat)?.length
  }
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setTitle({title:"Select category"}))
      dispatch(setTabIcon({icon:'shopping-bag'}))
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <ScrollView style={styles.root}>
      <View style={{marginBottom:20}}>
      <ExciteBanner />
      </View>
      {subs.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() =>
            navigation.navigate('Products', { category, subs: item })
          }
        >
          <View style={styles.icon}>
            <Ionicons name="car-sport" size={40} color={COLORS.lightGray} />
          </View>
          <View style={styles.wrapperText}>
            <View style={styles.text}>
              <Text style={{ marginBottom: 10,...FONTS.h3 }}>{item}</Text>
              <Text style={{...FONTS.body4,color:COLORS.gray }}>{handleStatistcs(item)} Ads</Text>
            </View>
            <FontAwesome
              name="angle-right"
              size={30}
              style={styles.icon2}
              color={COLORS.exciteGreen}
            />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.marketplace?.landing.products,
  }
}
export default connect(mapStateToProps)(Category)

const styles = StyleSheet.create({
  root: {
    // paddingBottom:SIZES.padding
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    borderRadius:3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
  icon: {
    marginRight: 20,
  },
  wrapperText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
})
