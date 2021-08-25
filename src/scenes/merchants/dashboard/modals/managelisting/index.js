import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { COLORS } from '../../../../../theme/theme'
import { connect } from 'react-redux'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import { ActivityIndicator } from 'react-native-paper'
import useAxios from '../../../../../utils/axios/init'
import DeleteItem from './subs/Delete'
import EditItem from './subs/Edit'
//
function ModalScreen({ navigation, route, products }) {
  const { action, item } = route.params
  console.log(action, item);

  

// 
const [isLoading,setIsLoading] = React.useState(false)

// 
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.white,
          padding: 20,
          marginTop: 10,
          marginHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>
            <MaterialIcons name={action?.toLowerCase()} size={25} />{' '}
          </Text>
          {/* <Text>Edit</Text> */}
        </View>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => navigation.goBack()}
        >
          <Text>
            <MaterialIcons color="red" name="cancel" size={25} />
          </Text>
          <Text>close</Text>
        </TouchableOpacity>
      </View>
      {action === "Delete" ? 
      <DeleteItem products={products} item={item} isLoading={isLoading} setIsLoading={setIsLoading}/> :
      <EditItem products={products} item={item} isLoading={isLoading} setIsLoading={setIsLoading}/>}
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.app?.me?.product,
  }
}

export default connect(mapStateToProps)(ModalScreen)

const styles = StyleSheet.create({})