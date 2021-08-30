import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {COLORS} from './../../theme/theme'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import { authLogOut } from '../../slices/app.slice'
import { useDispatch } from 'react-redux'
// 
const Index = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
  return (
    <View style={styles.root}>
      <View style={{backgroundColor:COLORS.white, flex:1, padding:10}}>
        <View style={styles.action}>
          <Button icon="home" mode="outlined" dark uppercase={false} contentStyle={{justifyContent:'flex-start', height:50}} onPress={()=>navigation.navigate("Store")}>
            Setup/Update Store
          </Button>
        </View>
        <View style={styles.action}>
          <Button icon="key" mode="outlined" dark uppercase={false} onPress={()=>navigation.navigate("Modals",{screen:"ChangePassword"})} contentStyle={{justifyContent:'flex-start', height:50}}>
            Change Password
          </Button>
        </View>
        <View style={styles.action}>
          <Button icon="view-list-outline" onPress={()=>navigation.navigate("ManageListing")} mode="outlined" dark uppercase={false} contentStyle={{justifyContent:'flex-start', height:50}}>
            Manage Listing
          </Button>
        </View>
        <View style={styles.action}>
          <Button icon="logout" mode="outlined" dark uppercase={false} contentStyle={{justifyContent:'flex-start', height:50}} onPress={()=>dispatch(authLogOut())}>
            Log Out
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  root: {
    flex:1,
    marginHorizontal:20,
  },
  action:{
      marginBottom:20,
    backgroundColor:COLORS.white

  }
})
