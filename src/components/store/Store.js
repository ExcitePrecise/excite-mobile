import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {connect} from 'react-redux'

import ReadModeTable from './subs/ReadModeTable'
import EditModeTable from './subs/EditModeTable'

// 
function Store({store}) {
    const [edit,setEdit]=React.useState(false);
    const isEdit=(state)=>{
        setEdit(state)
    }
    return (
        <View>
            {edit ? <EditModeTable isEdit={isEdit} /> : <ReadModeTable isEdit={isEdit}/>}
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