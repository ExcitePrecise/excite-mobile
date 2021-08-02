import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { useState } from 'react'
import categories from '../../utils/productCategoriesHandler'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../theme/theme'
import { fonts } from '../../theme'

const Category = ({ route, products,navigation }) => {
  const [subs, setSubs] = useState([])
  const [data, setData] = useState([])
const {category} = route.params
  useEffect(() => {
    const items = products?.filter(
      (item) => item.category === category,
    )
    const cats = categories[category]
    // console.log(categories[route.params.category])
    // console.log(items?.length)
    setSubs(cats)
    setData(items)
  }, [products])
  const handleStatistcs = (subsCat) => {
    return data?.filter((item) => item.subCategory === subsCat)?.length
  }
  return (
    <ScrollView>
      <Text>Category {route.params.category}</Text>
      {subs.map((item, index) => (
        <TouchableOpacity key={index} style={styles.item} onPress={()=>navigation.navigate("Products",{category,subs:item})}>
          <View style={styles.icon}>
            <Ionicons name="car-sport" size={40} color={COLORS.lightGray}/>
          </View>
          <View style={styles.wrapperText}>
            <View style={styles.text}>
              <Text style={{marginBottom:10}}>{item}</Text>
              <Text>{handleStatistcs(item)}</Text>
            </View>
            <FontAwesome name="angle-right" size={30} style={styles.icon2} color={COLORS.exciteGreen}/>
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
  item: {
    flexDirection: 'row',
    padding: SIZES.padding,
    backgroundColor:COLORS.white,
    marginBottom:10
  },
  icon:{
    marginRight:20
  },
  wrapperText:{
      flex:1,
    flexDirection: 'row',
justifyContent:'space-between'
  }
})
