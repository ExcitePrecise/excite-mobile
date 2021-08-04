import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';



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