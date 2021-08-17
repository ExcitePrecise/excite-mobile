import React, { Component } from 'react';
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
} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { COLORS } from '../../../theme/theme';
import { connect } from 'react-redux';



function ReadModeTable({store}){
  
    return (
      <ScrollView contentContainerStyle={styles.stage}>
        <TableView appearance="light">
          <Section header="STORE INFORMATION" footer="These information are valid as at this time.">
            <Cell cellStyle="Basic" title="Basic" contentContainerStyle={{ alignItems: 'center', height: 60 }} />
            <Cell cellStyle="RightDetail" title="Name" detail={store?.storeName} />
            <Cell cellStyle="RightDetail" title="Phone Number" detail={store?.storePhone} />
            <Cell cellStyle="RightDetail" title="Address" detail={store?.storeAddress} />
            <Cell cellStyle="RightDetail" title="LGA" detail={store?.storeLga} />
            <Cell cellStyle="RightDetail" title="State" detail={store?.storeState} />
            <Cell
              contentContainerStyle={{ alignItems: 'flex-start', height: 100 }}
              cellContentView={
                <View style={{ flex: 1, fontSize: 16 }}>
                    <TouchableOpacity style={{backgroundColor:COLORS.exciteGreen,marginTop:30}}>
                    <Button color={COLORS.exciteGreen} onPress={() => console.log('Heyho!')} title="Edit"></Button>
                    </TouchableOpacity>
                </View>
              }
            />
          </Section>
        </TableView>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 20,
    paddingBottom: 20,
  },
});
const mapStateToProps = (state)=>{
  return{
      store:state.app?.me?.storeInfo
  }
}

export default connect(mapStateToProps)(ReadModeTable)