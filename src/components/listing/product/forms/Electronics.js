import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { FontAwesome5 } from '@expo/vector-icons'
// import { FontAwesome } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

const Electronics = () => {
    const [inputs,setInputs]= React.useState({"title":"tiaj","description":""})
    const handleChange=(text,field)=>{
        inputs[`${field}`]=text;
        setInputs({...inputs})
    }
    return (
        <View>
            <Text>Electronis</Text>
            <TextInput mode="outlined" value={inputs.title} label="Product Title" onChange={(text)=>handleChange(text,"title")}/>
            <TextInput mode="outlined" value={inputs.title} label="Product Title" onChange={(text)=>handleChange(text,"title")}/>
        </View>
    )
}

export default Electronics

const styles = StyleSheet.create({})
