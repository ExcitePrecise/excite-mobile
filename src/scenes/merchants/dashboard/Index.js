import React, { useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { authLogOut } from '../../../slices/app.slice'
import { images } from '../../../theme'
import { COLORS, FONTS } from '../../../theme/theme'
import { rememberToken, getValidToken } from './../../../utils/axios/token'
import Header from './subs/Header'

const navItem = [
  {
    name: 'Post a Product',
    icon: images.post_icon,
    navigate: 'ProductListing',
  },
  {
    name: 'List a Service',
    icon: images.repairs_icon,
    navigate: 'ServiceListing',
  },
  {
    name: 'Place Banner',
    icon: images.banner,
    navigate: '',
  },
  {
    name: 'Book Keeping',
    icon: images.book,
    navigate: 'BookKeeping',
  },
  {
    name: 'Influencer Marketing',
    icon: images.influencer,
    navigate: 'Influencer',
  },
  {
    name: 'Social Commerce',
    icon: images.social,
    navigate: 'SocialCommerce',
  },
  {
    name: 'Manage Listing',
    icon: images.top,
    navigate: 'ManageListing',
  },
  {
    name: 'Help Desk',
    icon: images.help,
    navigate: 'HelpDesk',
  },
  {
    name: 'My Store',
    icon: images.services_icon,
    navigate: 'Store',
  },
  {
    name: 'My Account',
    icon: images.accounts,
    navigate: 'MyAccount',
  },
  {
    name: 'Subscription',
    icon: images.services_icon,
    navigate: 'Subscription',
  },
  {
    name: 'Verify Email',
    icon: images.email,
    navigate: 'EmailVerification',
  },
]

function DasboardRoute({navigation}) {
  return (
    <View style={styles.route}>
      {navItem.map((item, index) => (
        <TouchableOpacity style={styles.links} key={index} onPress={()=>navigation.navigate(item.navigate)}>
          <Image
            source={item.icon}
            width={20}
            height={40}
            resizeMode="contain"
          />
          <Text style={{ ...FONTS.body5 }}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}


//
const Index = ({navigation}) => {

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
    });

    return unsubscribe;
  }, [navigation]);
  const dispatch = useDispatch()
  return (
    <ScrollView>
      <View>
        {/* <Text>Dashboard</Text> */}
        <Header />
        <DasboardRoute navigation={navigation}/>
      </View>
    </ScrollView>
  )
}

export default Index

const styles = StyleSheet.create({
  route: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    flexWrap: 'wrap',
    marginTop: 15,
  },
  links: {
    width: '32%',
    backgroundColor: COLORS.white,
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
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
})
