import React, { useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  RefreshControl,

} from 'react-native'
import { Button } from 'react-native-paper'
import { connect, useDispatch } from 'react-redux'
import { authLogOut, setTabIcon, setTitle } from '../../../slices/app.slice'
import { images } from '../../../theme'
import { COLORS, FONTS } from '../../../theme/theme'
import { rememberToken, getValidToken } from './../../../utils/axios/token'
import Header from './subs/Header'
import { getProfileInfo } from '../../../apis/auth'
import { saveMe } from '../../../slices/app.slice'
import { showMessage, hideMessage } from "react-native-flash-message";

const navItem = [
  {
    name: 'Post a Product',
    icon: images.post_icon,
    navigate: 'ProductListing',
    paid:false,
    level:0,
  },
  {
    name: 'List a Service',
    icon: images.repairs_icon,
    navigate: 'ProductListing',
    paid:false,
    level:0,
  },
  {
    name: 'Place Banner',
    icon: images.banner,
    navigate: 'PostBanner',
    paid:true,
    level:2,
  },
  {
    name: 'Biz Book',
    icon: images.book,
    navigate: 'BookKeeping',
    paid:false,
    level:0,
  },
  {
    name: 'Influencer Marketing',
    icon: images.influencer,
    navigate: 'Influencer',
    paid:false,
    level:0,
  },
  {
    name: 'Social Commerce',
    icon: images.social,
    navigate: 'SocialCommerce',
    paid:true,
    level:3,
  },
  {
    name: 'Manage Listing',
    icon: images.top,
    navigate: 'ManageListing',
    paid:false,
    level:0,
  },
  // {
  //   name: 'Help Desk',
  //   icon: images.help,
  //   navigate: 'HelpDesk',
  // },
  {
    name: 'My Store',
    icon: images.services_icon,
    navigate: 'Store',
    paid:false,
    level:0,
  },
  {
    name: 'My Account',
    icon: images.accounts,
    navigate: 'MyAccount',
    paid:false,
    level:0,
  },
  {
    name: 'Subscription',
    icon: images.wallet,
    navigate: 'Subscription',
    paid:false,
    level:0,
  },
  // {
  //   name: 'Verify Email',
  //   icon: images.email,
  //   navigate: 'EmailVerification',
  // },
]

function DasboardRoute({navigation, userSub}) {
  const handleSubType=(sub)=>{
    switch (sub) {
      case 1:
        return "Bronze"
      case 2:
        return "Silver"
      case 3:
        return "Gold"
      default:
        break;
    }
  }
  return (
    <View style={styles.route}>
      {navItem.map((item, index) => (
        <TouchableOpacity style={styles.links} key={index} 
        onPress={
          ()=> {
            if(item?.paid && item.level > userSub){
              return(
                showMessage({
                  message:"Paid Module",
                  description:`Upgrade to ${handleSubType(item.level)} package`,
                  type:"danger",
                  icon:"auto"
                })
              )
          }
          navigation.navigate(item.navigate)
        }
        }>
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
const Index = ({navigation,token, userSub}) => {
const dispatch = useDispatch();
// console.log(userSub)
  // Refresh control
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const updatedProf =await getProfileInfo(token);
    if(updatedProf){
      dispatch(saveMe({me:updatedProf}))
    }
    setRefreshing(false)
    // getData()
  }, [])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      dispatch(setTitle({title:"My Account"}))
      dispatch(setTabIcon({icon:'account-circle'}))
    });

    return unsubscribe;
  }, [navigation]);
  // const dispatch = useDispatch()
  return (
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    showsVerticalScrollIndicator={false}
    >
      <View>
        {/* <Text>Dashboard</Text> */}
        <Header />
        <DasboardRoute navigation={navigation} userSub={userSub}/>
      </View>
    </ScrollView>
  )
}


const mapStateToProps = (state)=>{
  return{
    token:state.app?.token,
    userSub:state.app?.me?.subscriptionLevel,
  }
}
export default connect(mapStateToProps)(Index);


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
