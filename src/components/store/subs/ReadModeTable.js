import React, { Component } from 'react'
import {
  ActivityIndicator,
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
import { connect } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'

function ReadModeTable({ store, isEdit }) {
  return (
    <ScrollView contentContainerStyle={styles.stage}>
      <TableView appearance="light">
        <Section
          header="STORE INFORMATION"
          footer="These information are valid as at this time."
        >
          <Cell
            cellStyle="Basic"
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
                  onPress={() => isEdit(true)}
                >
                <Text style={{ color: COLORS.lightGrayDark, marginRight: 5 }}>
                  Edit
                </Text>
                <View style={{height:40,width:40,borderRadius:20,backgroundColor:COLORS.exciteDark,justifyContent:'center',alignItems:'center'}}>
                <MaterialIcons
                    color={COLORS.exciteGreen}
                    name="edit"
                    size={20}
                  />
                </View>
                 
                </TouchableOpacity>
              </View>
            }
          />
          <Cell
            cellStyle="RightDetail"
            title="Name"
            detail={store?.storeName}
          />
          <Cell
            cellStyle="RightDetail"
            title="Phone Number"
            detail={store?.storePhone}
          />
          <Cell
            cellStyle="RightDetail"
            title="Address"
            detail={store?.storeAddress}
          />
          <Cell cellStyle="RightDetail" title="LGA" detail={store?.storeLga} />
          <Cell
            cellStyle="RightDetail"
            title="State"
            detail={store?.storeState}
          />
          {/* <Cell
              contentContainerStyle={{ alignItems: 'flex-start', height: 100 }}
              cellContentView={
                <View style={{ flex: 1, fontSize: 16 }}>
                    <TouchableOpacity style={{backgroundColor:COLORS.exciteGreen,marginTop:30}}>
                    <Button onPress={()=>isEdit(true)} color={COLORS.exciteGreen} title="Edit"></Button>
                </View>
              }
            /> */}
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
  }
}

export default connect(mapStateToProps)(ReadModeTable)
