import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Image,
} from 'react-native'
import { useScrollToTop } from '@react-navigation/native';
import { connect } from 'react-redux'
import { COLORS, FONTS } from '../../theme/theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Button, TextInput } from 'react-native-paper'
import MiniSearch from 'minisearch'
import useAxios from '../../utils/axios/init'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { FontAwesome } from '@expo/vector-icons'
import { set } from 'lodash'

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
            &#8358; {Number(item.price)}
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
              onPress={()=>makeCall(item?.storeInfo?.storePhone)}
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
              onPress={()=>makeWhatsapp(item?.storeInfo?.storePhone)}
            size={20}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

//
const ProductDetails = ({ route, products, navigation }) => {
  const { productID } = route.params
  const [item, setItem] = useState(null)

  const [similar, setSimilar] = useState([])

  const getSimilarProducts = async () => {
    // Search with default options
    if (item) {
    setSimilar(item.merchant.product.filter(data=>data._id !== item._id))
    }
  }

  const ref = React.useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    getSimilarProducts()
  }, [item])

  useEffect(() => {
    const product = products?.filter((item) => item._id === productID)
    setItem(product[0])
    // getSimilarProducts()
  }, [products,productID])

  //
  return (
    <SafeAreaView>
      <ScrollView ref={ref} >
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            backgroundColor: COLORS.white,
            paddingBottom: 100,
          }}
        >
          <View>
            {item && (
              <ImageBackground
                source={{ uri: item?.images[0]?.Location }}
                resizeMode="cover"
                style={{ height: 250 }}
              />
            )}
          </View>
          <View>{/* Other Images */}</View>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            {/* Deatiail */}
            <View style={{ width: '45%' }}>
              <Text style={{ ...FONTS.h2, color: COLORS.exciteDark }}>
                {item?.title}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="location-pin" />
                <Text style={{ color: COLORS.gray }}>
                  {item?.storeInfo?.storeLga}
                </Text>
              </View>
            </View>
            <View style={{ width: '45%' }}>
              <Text style={{ ...FONTS.h2, color: COLORS.exciteGreen }}>
                &#8358; {Number(item?.price).toLocaleString()}
              </Text>
            </View>
          </View>
          {/* CTA */}
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity style={{ width: '45%' }}
              onPress={()=>makeCall(item?.storeInfo?.storePhone)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: COLORS.exciteDark,
                }}
              >
                <Button icon="phone">Call Seller</Button>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '45%' }}
              onPress={()=>makeWhatsapp(item?.storeInfo?.storePhone)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: COLORS.white,
                  borderWidth: 1,
                }}
              >
                <Button icon="whatsapp">Message</Button>
              </View>
            </TouchableOpacity>
          </View>
          {/* Deatiail */}
          <View style={{ padding: 10, marginTop: 20, borderTopWidth: 1 }}>
            <Text style={{ textAlign: 'center', ...FONTS.h3 }}>
              Product Description
            </Text>
            <Text style={{ marginTop: 20, color: COLORS.gray }}>
              {item?.description}
            </Text>
          </View>
          {/* Products by Vendor */}
          <View>
            <View style={{ marginTop: 20,paddingTop:30 }}>
              <Text style={{...FONTS.body4, color:COLORS.black,  textAlign: 'center' }}>
                Other products by same vendor
              </Text>
            </View>
            {similar.map((item, index) => (
              <Item key={index} item={item} navigation={navigation} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.marketplace?.landing.products,
  }
}

export default connect(mapStateToProps)(ProductDetails)

const styles = StyleSheet.create({})
