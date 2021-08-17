import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Store from "../../../../components/store/Store"

const index = () => {
    return (
        <View style={{flex:1}}>
            <Store />
        </View>
    )
}

export default index

const styles = StyleSheet.create({})
