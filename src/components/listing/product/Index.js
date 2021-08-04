import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { images } from '../../../theme'
import { TextInput } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import { FONT_SANS_10_BLACK } from 'jimp'


const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState()
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
      <TextInput />
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
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
