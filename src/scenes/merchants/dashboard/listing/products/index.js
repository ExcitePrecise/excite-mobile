import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const index = ({navigation}) => {
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // Screen was focused
          // Do something
        //   alert('hello')
        });
    
        return unsubscribe;
      }, [navigation]);
    return (
        <View>
            <Text>List</Text>
        </View>
    )
}

export default index

const styles = StyleSheet.create({})
