import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

// 
const index = ({navigation}) => {
    return (
        <View style={styles.root}>
            <Text style={{fontStyle:'italic'}}>coming soon</Text>
            <Button style={{marginTop:20}} onPress={()=>navigation.goBack()}>Go Back</Button>
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
