import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ScrollView } from 'react-native'
import { COLORS, SIZES, FONTS } from '../../../theme/theme'
import { FontAwesome5 } from '@expo/vector-icons'
// import { ScrollView } from 'react-native-gesture-handler'
import {display} from './../../../slices/marketplace.slice';
import { useDispatch } from 'react-redux';
export default function PopularCategorySwitch() {
   const dispatch = useDispatch();

   const handleDisplay=(payload)=>{
       dispatch(display({data:payload}))
   }
    return (
        <View style={styles.root}>
            <View style={styles.header}>
            <Text>Popular</Text>
            </View>
            <ScrollView horizontal={true}>
                <TouchableOpacity onPress={()=>handleDisplay("electronics")}><View style={styles.tabs}><Text style={styles.tabText}>Electronics</Text></View></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleDisplay("phones")}><View style={styles.tabs}><Text style={styles.tabText}>Phone & Accessories</Text></View></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleDisplay("fashion")}><View style={styles.tabs}><Text style={styles.tabText}>Fashion & Styles</Text></View></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleDisplay("vehicle")}><View style={styles.tabs}><Text style={styles.tabText}>Automobiles</Text></View></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleDisplay("health")}><View style={styles.tabs}><Text style={styles.tabText}>Health & Beauty</Text></View></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleDisplay("home")}><View style={styles.tabs}><Text style={styles.tabText}>Home & Kitchen</Text></View></TouchableOpacity>
            </ScrollView>
            {/* <Displays /> */}
        </View>
    )
}


const styles = StyleSheet.create({
    root:{
        marginVertical:SIZES.padding,
        paddingHorizontal:SIZES.padding
    },
    header:{
        marginBottom:SIZES.padding/2
    },
    tabs:{
        paddingHorizontal:SIZES.padding,
        paddingVertical:SIZES.padding/3,
        borderWidth:1,
        borderColor:COLORS.exciteGreen,
        borderRadius:3,
        marginLeft:6
    },
    tabText:{
        color:COLORS.gray,
        ...FONTS.body4
    }
})