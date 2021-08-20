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




export default function StoreTable(){
  
    return (
      <ScrollView contentContainerStyle={styles.stage}>
        <TableView appearance="light">
          <Section header="STORE INFORMATION" footer="These information are valid as at this time.">
            <Cell cellStyle="Basic" title="Basic" contentContainerStyle={{ alignItems: 'center', height: 60 }} />
            <Cell cellStyle="RightDetail" title="Name" detail="Mac Arthur" />
            <Cell cellStyle="RightDetail" title="Phone Number" detail="090783843767" />
            <Cell cellStyle="RightDetail" title="Address" detail="14 Bolade oshodi" />
            <Cell cellStyle="RightDetail" title="LGA" detail="Ikeja" />
            <Cell cellStyle="RightDetail" title="State" detail="Lagos" />
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
