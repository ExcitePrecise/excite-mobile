import React ,{useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { authLogOut } from '../../../slices/app.slice'
import {rememberToken,getValidToken} from './../../../utils/axios/token'

const Index = ({navigation}) => {
    useEffect(()=>{
        console.log(getValidToken())
        // return 'ok'
       },[])
    const dispatch = useDispatch()
    return (
        <View>
            <Text>Dashboard</Text>
            <Button onPress={()=>dispatch(authLogOut())}>Log out</Button>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({})
