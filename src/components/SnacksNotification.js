import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
// import { teal700 } from 'react-native-paper/lib/typescript/styles/colors';



// 
const SnacksNotification = ({visible,message,handleNotification,navigation}) => {


//   const onToggleSnackBar = () => handleNotification(!visible);

  const onDismissSnackBar = () => {
      handleNotification(false)
    if(navigation){
        return navigation.navigate("Login")
    }
    };

  return (
    <View style={{...styles.container, display:visible ? 'flex' : 'none'}}>
      {/* <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button> */}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={10000}
        wrapperStyle={{position:'relative',top:50}}
        style={{display:visible ? 'flex' : 'none'}}
        >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});

export default SnacksNotification;