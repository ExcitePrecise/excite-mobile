import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  Image,
} from 'react-native'
import { COLORS, SIZES, FONTS } from '../../../theme/theme'
import { FontAwesome5 } from '@expo/vector-icons'
// import { ScrollView } from 'react-native-gesture-handler'
import { display } from './../../../slices/marketplace.slice'
import { useDispatch } from 'react-redux'
import { images } from '../../../theme'

export default function PopularCategorySwitch({ navigation }) {
  const dispatch = useDispatch()

  const navItems = [
    {
      category: 'electronics',
      name: 'Electronics',
      icon: images.electronic_icon,
    },
    {
      category: 'vehicle',
      name: 'Automobiles',
      icon: images.vehicle_icon,
    },
    {
      category: 'phones-tablets',
      name: 'Phones & Tablet',
      icon: images.phone_icon,
    },
    {
      category: 'fashion',
      name: 'Hair & Beauty',
      icon: images.hair_icon,
    },
    {
      category: 'Property',
      name: 'Properties',
      icon: images.property_icon,
    },
    {
      category: 'fashion',
      name: 'Fashion & Style',
      icon: images.fashion_icon,
    },
    {
      category: 'home-ofices',
      name: 'Home & Offices',
      icon: images.home_icon,
    },
    {
      category: 'kids',
      name: 'Babies & Kids',
      icon: images.kid_icon,
    },
    {
      category: 'babies',
      name: 'Euipment & Tools',
      icon: images.tools_icon,
    },
    {
      category: 'repairs',
      name: 'Services',
      icon: images.repairs_icon,
    },
    {
      category: 'repairs',
      name: 'Animals & Pets',
      icon: images.pets_icon,
    },
    {
      category: 'repairs',
      name: 'Top Products',
      icon: images.top_icon,
    },
  ]
  return (
    <View style={styles.root}>
      {navItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tabs}
          onPress={() =>
            navigation.navigate('Category', { category: item.category })
          }
        >
          <Image
            source={item.icon}
            width={20}
            height={40}
            resizeMode="contain"
          />
          <Text style={styles.tabText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    flexWrap: 'wrap',
    marginTop: 15,
  },
  tabs: {
    width: '32%',
    backgroundColor: COLORS.white,
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  tabText: {
    color: COLORS.gray,
    ...FONTS.body4,
    marginTop: 2,
  },
})
