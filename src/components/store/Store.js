import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {connect} from 'react-redux'

import ReadModeTable from './subs/ReadModeTable'
import EditModeTable from './subs/EditModeTable'

// 
function Store({store}) {
    return (
        <View>
            <Text>Store {store?.storeName}</Text>
            {/* <ReadModeTable /> */}
            <EditModeTable />
        </View>
    )
}

const styles = StyleSheet.create({})

const mapStateToProps = (state)=>{
    return{
        store:state.app?.me?.storeInfo
    }
}

export default connect(mapStateToProps)(Store)