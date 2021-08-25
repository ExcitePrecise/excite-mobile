import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {
  FlatList,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { FontAwesome } from '@expo/vector-icons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect, useDispatch } from 'react-redux'
import { COLORS, FONTS, SIZES } from '../../theme/theme'
import { images } from '../../theme/images'
import ExciteBanner from './landingchunks/ExciteBanner'
import { setTabIcon, setTitle } from '../../slices/app.slice'
import SkeletonContent from 'react-native-skeleton-content'

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

const ProgressiveImage = ({ item }) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [img, setImg] = React.useState()
  React.useState(() => {
    setImg(item)
  }, [])
  return (
    <React.Fragment>
      <Image
        source={{ uri: img?.images[0]?.Location }}
        resizeMode="cover"
        style={{ height: 200, width: '100%' }}
        onLoad={() => setIsLoading(false)}
      />
      <View style={{ position: 'absolute',width:'100%',top:0,bottom:0 }}>
        <SkeletonContent isLoading={isLoading}>
          <View style={{flex:1,width:'100%'}} />
        </SkeletonContent>
      </View>
    </React.Fragment>
  )
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
        {/* <SkeletonContent isLoading={true}> */}
        {/* <Image
            source={{ uri: item?.images[0]?.Location }}
            resizeMode="cover"
            style={{ height: 200, width: '100%' }}
            onLoadStart={() => {
              // setIsLoading(false)
            console.log('end')
            }}
            onLoad={()=>console.log('e')}
            loadingIndicatorSource={images.wallet}
            
          /> */}
        {/* </SkeletonContent> */}
        <ProgressiveImage item={item} />
        {/* <View style={{position:'absolute',top:0,left:0}}>
          <Text>Loading</Text>
        </View> */}
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
          {item?.category !== 'services' ? (
            <Text
              style={{ ...FONTS.h2, marginTop: 20, color: COLORS.exciteGreen }}
            >
              &#8358; {convertPrice(item.price)}
            </Text>
          ) : (
            <Text></Text>
          )}
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

const Products = ({ route, products, navigation }) => {
  const { category, subs } = route.params
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  useEffect(() => {
    const items = products?.filter(
      (item) => item.category === category && item.subCategory === subs,
    )
    // console.log(category, subs)
    setData(items)
  }, [products])
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setTitle({ title: `Browse ${subs} Collections` }))
      dispatch(setTabIcon({ icon: 'shopping-bag' }))
    })
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.root}>
      <ExciteBanner />
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={(item, index) => item._id}
        numColumns={1}
        style={{ marginHorizontal: 5 }}
      />
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.marketplace?.landing.products,
  }
}

export default connect(mapStateToProps)(Products)

const styles = StyleSheet.create({
  root: {
    marginBottom: 150,
  },
})
