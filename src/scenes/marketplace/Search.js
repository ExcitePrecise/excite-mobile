import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  TouchableOpacity,
  Image,
  BackgroundImage,
  Linking,
} from 'react-native'
import { useState } from 'react'
import useAxios from '../../utils/axios/init'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { FontAwesome } from '@expo/vector-icons'
import { COLORS, FONTS } from './../../theme/theme'
import { TextInput } from 'react-native-paper'
// import {FONTS} from './../../theme/theme'

//
const makeCall = (num) => {
  let phoneNumber = ''

  if (Platform.OS === 'android') {
    phoneNumber = `tel:${num}`
  } else {
    phoneNumber = `telprompt:${num}`
  }

  Linking.openURL(phoneNumber)
}
const makeWhatsapp = (num) => {
  let phoneNumber = `https://wa.me/+234${num}`
  Linking.openURL(phoneNumber)
}
const convertPrice = (price) => {
  return Number(price).toLocaleString()
}

const Item = ({ item, navigation, route }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { productID: item._id })}
      // onPress={() => makeCall()}
      style={{
        marginHorizontal: 5,
        marginVertical: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
      }}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: item?.images[0]?.Location }}
          resizeMode="cover"
          style={{ height: 200, width: '100%' }}
        />
      </View>
      <View
        style={{
          marginHorizontal: 5,
          paddingBottom: 15,
          paddingTop: 15,
          flex: 1,
        }}
      >
        <View style={{ overflow: 'hidden' }}>
          <Text
            style={{ ...FONTS.h3, fontWeight: '900', color: COLORS.exciteDark }}
          >
            {item.title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="location-pin" />
            <Text style={{ color: COLORS.gray }}>
              {item?.storeInfo?.storeLga}
            </Text>
          </View>
          <Text
            style={{ ...FONTS.h2, marginTop: 20, color: COLORS.exciteGreen }}
          >
            &#8358; {convertPrice(item.price)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 'auto',
            justifyContent: 'space-between',
          }}
        >
          <FontAwesome5Icon
            name="phone"
            style={{
              backgroundColor: COLORS.exciteDark,
              width: '45%',
              paddingVertical: 5,
              textAlign: 'center',
            }}
            color={COLORS.exciteGreen}
            onPress={() => makeCall(item?.storeInfo?.storePhone)}
            size={20}
            brand
          />
          <FontAwesome
            name="whatsapp"
            style={{
              backgroundColor: COLORS.exciteDark,
              width: '45%',
              paddingVertical: 5,
              textAlign: 'center',
            }}
            color={COLORS.exciteGreen}
            onPress={() => makeWhatsapp(item?.storeInfo?.storePhone)}
            size={20}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Search = ({ navigation, route }) => {
  // console.log(navigation,route)
  const { text } = route?.params
  const [isLoading, setIsLoading] = React.useState(false)
//   console.log(text)
  const [searched, setSearch] = useState(null)

//   
const [newSearch,setNewSearch] = React.useState(text)

  const getSearch = async (string) => {
    try {
      const result = await useAxios.get(`/product/filter?product=${string}`)
    //   console.log(result.data)
      if (result.data.code === 200) {
        setSearch(result.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useState(() => {
    if (text) {
      getSearch(text)
    }
  }, [text])

  //
  return (
    <View style={{ paddingBottom: 130 }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          marginHorizontal: 10,
          padding: 10,
          marginVertical: 20,
        }}
      >
        <TextInput placeholder="Search" value={newSearch} onChangeText={(txt)=>setNewSearch(txt)} onKeyPress={(e)=>console.log(e)}/>
      </View>
      {/* <Text>Search Product</Text> */}
      {searched && (
        <FlatList
          data={searched}
          renderItem={({ item }) => (
            <Item item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => item._id}
          numColumns={1}
          style={{ marginHorizontal: 5 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      {searched?.length === 0 ? (
        <View style={{ marginHorizontal: 10, padding: 10, marginVertical: 20 }}>
          <Text>{`Oops ! your search for ${text} returns nothing`}</Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 150,
  },
})

export default Search
