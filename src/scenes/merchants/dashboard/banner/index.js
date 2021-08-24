import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Banner  from './../../../../components/banner/Banner'
import { COLORS } from '../../../../theme/theme'

const index = () => {
    return (
        <View style={styles.root}>
            <Banner />
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    root:{
        backgroundColor:COLORS.bg,
        flex:1,
        padding:20,
    }
})
