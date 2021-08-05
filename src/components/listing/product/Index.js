import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { images } from '../../../theme'
import { TextInput } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import subs,{ CategoryMajor,category } from '../../../utils/productCategoriesHandler'
import { COLORS } from '../../../theme/theme'
import { useEffect } from 'react'


const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory,setSelectedSubcategory] = useState([]);
  const [subCategory,setSubCategory] = useState("")
  useEffect(()=>{
    if(selectedCategory){
      console.log(subs[selectedCategory])
      setSelectedSubcategory(subs[selectedCategory])

    }
  },[selectedCategory])
  return (
    <View style={styles.form}>
      <View style={styles.title}>
        <Image
          source={images.new}
          width={20}
          height={20}
          resizeMode="contain"
        />
        <Text style={{marginLeft:10}}>Product</Text>
      </View>
      {/* <TextInput /> */}
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) => {
          if(itemIndex===0) return null
          return setSelectedCategory(itemValue)
        }}
      >
        <Picker.Item color={COLORS.lightGray} label="Select Category" value={null} />
        {CategoryMajor.map((item,index)=> 
        <Picker.Item key={index} label={item.type} value={item.key} /> )}
      </Picker>
      {/* Sub Category */}
      <Picker
        selectedValue={subCategory}
        onValueChange={(itemValue, itemIndex) => {
          if(itemIndex===0) return null
          return setSubCategory(itemValue)
        }}
        style={{marginTop:20, display: selectedCategory ? 'flex':'none'}}
      >
        <Picker.Item color={COLORS.lightGray} label="Select Category" value={null} />
        {selectedSubCategory.map((item,index)=> 
        <Picker.Item key={index} label={item} value={item} /> )}
      </Picker>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  form: {
    // backgroundColor:'red',
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,

    elevation: 1,
  },
})
