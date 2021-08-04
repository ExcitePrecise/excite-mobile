import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ScrollView, Image } from 'react-native'
import { COLORS, SIZES, FONTS } from '../../../theme/theme'
import { FontAwesome5 } from '@expo/vector-icons'
// import { ScrollView } from 'react-native-gesture-handler'
import {display} from './../../../slices/marketplace.slice';
import { useDispatch } from 'react-redux';
import { images } from '../../../theme';

export default function PopularCategorySwitch({navigation}) {
   const dispatch = useDispatch();

   const navItems=[
       {
           category:"electronics",
           name:"Electronics",
           icon:images.electronic_icon
       },
       {
           category:"vehicle",
           name:"Automobiles",
           icon:images.vehicle_icon,
       },
       {
           category:"phones-tablets",
           name:"Phones & Tablet",
           icon:images.phone_icon
       },
       {
           category:"fashion",
           name:"Hair & Beauty",
           icon:images.hair_icon
       },
       {
           category:"Property",
           name:"Properties",
           icon:images.property_icon
       },
       {
           category:"fashion",
           name:"Fashion & Style",
           icon:images.fashion_icon
       },
       {
           category:"home-ofices",
           name:"Home & Offices",
           icon:images.home_icon
       },
       {
           category:"kids",
           name:"Babies & Kids",
           icon:images.kid_icon
       },
       {
           category:"babies",
           name:"Euipment & Tools",
           icon:images.tools_icon
       },
       {
           category:"repairs",
           name:"Repairs & Construction",
           icon:images.repairs_icon
       },
       {
           category:"repairs",
           name:"Animals & Pets",
           icon:images.pets_icon
       },
       {
           category:"repairs",
           name:"Top Products",
           icon:images.top_icon
       }
    ]
    return (
        <View style={styles.root}>
            <View horizontal={false} style={styles.categories}>
                {navItems.map((item,index)=>
                
                <TouchableOpacity key={index} onPress={()=>navigation.navigate("Category",{category:item.category})}>
                    <View style={styles.tabs}>
                        <Image source={item.icon} width={20} height={40} resizeMode='contain'/>
                        <Text style={styles.tabText}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
                )}
            </View>
            {/* <Displays /> */}
        </View>
    )
}


const styles = StyleSheet.create({
    root:{
        marginVertical:SIZES.padding,
        // paddingHorizontal:SIZES.padding
    },
    categories:{
        flexDirection:'row',
        flexWrap:'wrap'

    },
    tabs:{
        // paddingHorizontal:SIZES.padding,
        // paddingVertical:SIZES.padding/3,
        borderWidth:1,
        borderColor:COLORS.lightGray,
        borderRadius:3,
        width:SIZES.width/3,
        height:SIZES.width/3,
        alignItems:'center',
        justifyContent:'center'
    },
    tabText:{
        color:COLORS.gray,
        ...FONTS.body4,
        marginTop:2
    }
})