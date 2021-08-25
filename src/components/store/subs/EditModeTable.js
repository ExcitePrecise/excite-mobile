import React, { Component } from 'react'
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import { COLORS } from '../../../theme/theme'
import { connect, useDispatch } from 'react-redux'
import useAxios from '../../../utils/axios/init'
import { getProfileInfo } from '../../../apis/auth'
import { saveMe } from '../../../slices/app.slice'
import { MaterialIcons } from '@expo/vector-icons'



// 
function StoreTableEditMode({ store, token,isEdit }) {
const dispatch = useDispatch()
  const [inputs,setInputs] = React.useState({storeName:"",storePhone:"",storeAddress:"",storeLga:"",storeState:""});

  React.useEffect(()=>{
    if(store){
      setInputs({...store})
    }
    return 
  },[])
const handleChange=(text,field)=>{
  // console.log(text,field)
  inputs[field]=text,
  setInputs({...inputs})
}

const isEdited = ()=>{
  return JSON.stringify(inputs) === JSON.stringify(store)
}

const handleUpdate=async ()=>{
    try {
      const update= await  useAxios.post("/marketplace/store-set-up", inputs, {headers:{
        authorization:`Bearer ${token}`
      }})
      if(update.data.code===201){
        setInputs({ ...update.data.store });
        const updatedStore = await getProfileInfo(token);
        if(updatedStore){
          dispatch(saveMe({me:updatedStore}))
        }
        //  dispatch(getProfileInfo(token))
         Alert.alert("Store updated")
         isEdit(false)
        }
    } catch (error) {
      console.log(error)
      Alert.alert("Store error occured")
      
    }
}
  return (
    <ScrollView contentContainerStyle={styles.stage}>
      <TableView appearance="light">
        <Section
          header="STORE INFORMATION"
          footer="These information are valid as at this time."
        >
          <Cell
            cellStyle="Basic"
            title="Edit/Update"
            contentContainerStyle={{ alignItems: 'center', height: 60 }}
            cellContentView={
              <View
                style={{
                  width: '100%',
                  marginTop: 10,
                  alignItems: 'flex-end',
                }}
              >
                 <TouchableOpacity
                  style={{
                  flexDirection: 'row',
                  justifyContent:'flex-end',
                  alignItems:'center',
                  width:100
                  }}
                  onPress={() => isEdit(false)}
                >
                <Text style={{ color: COLORS.lightGrayDark, marginRight: 5 }}>
                  close
                </Text>
                <View style={{height:40,width:40,borderRadius:20,backgroundColor:COLORS.red,justifyContent:'center',alignItems:'center'}}>
                <MaterialIcons
                    color={COLORS.white}
                    name="close"
                    size={20}
                  />
                </View>
                 
                </TouchableOpacity>
              </View>
            }
          />
          <Cell
            cellContentView={
              <View style={{width:'100%', marginTop:10}}>
                <Text style={{color:COLORS.lightGrayDark, marginBottom:5}}>Store Name:</Text>
                <TextInput
                  style={{ fontSize: 16, flex: 1 }}
                  placeholder="Enter store name"
                  value={inputs?.storeName}
                  onChangeText={(text)=>handleChange(text,"storeName")}
                />
              </View>

            }
          />
          <Cell
            cellContentView={
              <View style={{width:'100%', marginTop:10}}>
                <Text style={{color:COLORS.lightGrayDark, marginBottom:5}}>Contact Number:</Text>
                <TextInput
                  style={{ fontSize: 16, flex: 1 }}
                  placeholder="Enter contact number"
                  value={inputs?.storePhone}
                  onChangeText={(text)=>handleChange(text,"storePhone")}

                />
              </View>
            }
          />
          <Cell
            cellContentView={
              <View style={{width:'100%', marginTop:10}}>
                <Text style={{color:COLORS.lightGrayDark, marginBottom:5}}>Store Address:</Text>
                <TextInput
                  style={{ fontSize: 16, flex: 1 }}
                  placeholder="Enter address"
                  value={inputs?.storeAddress}
                  onChangeText={(text)=>handleChange(text,"storeAddress")}

                />
              </View>
            }
          />
          <Cell
            cellContentView={
              <View style={{width:'100%', marginTop:10}}>
                <Text style={{color:COLORS.lightGrayDark, marginBottom:5}}>Local Govt:</Text>
                <TextInput
                  style={{ fontSize: 16, flex: 1 }}
                  placeholder="Enter address"
                  value={inputs?.storeLga}
                  onChangeText={(text)=>handleChange(text,"storeLga")}

                />
              </View>
            }
          />
          <Cell
            cellContentView={
              <View style={{width:'100%', marginTop:10}}>
                <Text style={{color:COLORS.lightGrayDark, marginBottom:5}}>State:</Text>
                <TextInput
                  style={{ fontSize: 16, flex: 1 }}
                  placeholder="Enter state"
                  value={inputs?.storeState}
                  onChangeText={(text)=>handleChange(text,"storeState")}

                />
              </View>
            }
          />
          <Cell
            contentContainerStyle={{ alignItems: 'flex-start', height: 100 }}
            cellContentView={
              <View style={{ flex: 1, fontSize: 16 }}>
                <TouchableOpacity
                  style={{ backgroundColor: COLORS.exciteGreen, marginTop: 30 }}
                >
                  <Button
                    color={COLORS.exciteGreen}
                    onPress={() => handleUpdate()}
                    title="Update"
                    disabled={isEdited()}
                  ></Button>
                </TouchableOpacity>
              </View>
            }
          />
        </Section>
      </TableView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 20,
    paddingBottom: 20,
  },
})
const mapStateToProps = (state) => {
  return {
    store: state.app?.me?.storeInfo,
    token:state.app?.token
  }
}

export default connect(mapStateToProps)(StoreTableEditMode)
