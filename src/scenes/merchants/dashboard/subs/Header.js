import React from 'react'
import { StyleSheet, Text, View,SafeAreaView,ScrollView, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import { COLORS, FONTS, SIZES } from '../../../../theme/theme'
import { authLogOut } from '../../../../slices/app.slice'
import { connect, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Header = ({user}) => {
    const dispatch = useDispatch()

    return (
        <SafeAreaView style={styles.root}>
            <Text style={{color:COLORS.exciteGreen,marginTop:1}}>{user}</Text>
            <TouchableOpacity onPress={()=>dispatch(authLogOut())}><Button icon='logout'>Log Out</Button></TouchableOpacity>
        </SafeAreaView>
    )
}


const mapStateToProps = (state)=>{
    return{
        user:state.app?.me?.fullname
    }
}
export default connect(mapStateToProps)(Header)

const styles = StyleSheet.create({
    root:{
        backgroundColor:COLORS.exciteDark,
        paddingHorizontal:SIZES.padding,
        paddingVertical:SIZES.padding
    }
})
