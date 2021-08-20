import React from 'react'
import { Button, StyleSheet, Text, View} from 'react-native'
import { COLORS, FONTS } from './../../theme/theme'
import Monthly from './subs/Monthly'
import Yearly from './subs/Yearly'
import { connect } from 'react-redux'

//

const styles = StyleSheet.create({
  current: {
    backgroundColor: COLORS.exciteDark,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
})


const handleDisplay =(code,navigation)=>{
    switch (code) {
        case 0:
            return <Monthly navigation={navigation}/>;
        case 1:
            return <Yearly navigation={navigation} />;
        default:
            break;
    }
}

//
const Index = ({navigation,subscriptionLevel,subscriptionEnd,cycle}) => {
    const [tab,setTab]= React.useState(0)
    const handleGetPlan=()=>{
      switch (subscriptionLevel) {
        case 1:
          return `Bronze (${cycle})`;
        case 2:
          return `Silver (${cycle})`;
        case 3:
          return `Gold (${cycle})`;
        default:
          return "Freemium";
      }
    }
    const handleGetExp=()=>{
      if(subscriptionEnd){
        const day = new Date(subscriptionEnd);
        return day.toLocaleString()
      }else{
        return "---"
      }
    }
  return (
    <View style={{flex:1}}>
      <View style={styles.current}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text style={{ color: COLORS.white }}>Current plan</Text>
          <Text style={{ color: COLORS.exciteGreen, ...FONTS.h4 }}>{handleGetPlan()}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: COLORS.white }}>End date</Text>
          <Text style={{ color: COLORS.exciteGreen, ...FONTS.h4 }}>
            {handleGetExp()}
          </Text>
        </View>
        <Text style={{color:COLORS.white, textAlign:'center',marginTop: 20}}>Activate New Plan</Text>
         {/* Button */}
         <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Button onPress={()=>setTab(0)} title="Monthly" color={tab===0 ? COLORS.exciteGreen : COLORS.lightGray}></Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button onPress={()=>setTab(1)} title="Yearly" color={tab===1 ? COLORS.exciteGreen : COLORS.lightGray}></Button>
          </View>
        </View>
      </View>
      {/* Subscription Components */}
      {handleDisplay(tab,navigation)}
    </View>
  )
}


const mapStateToProps=(state)=>{
  return{
    subscriptionLevel:state.app?.me?.subscriptionLevel,
    subscriptionEnd:state.app?.me?.subscriptionEnd,
    cycle:state.app?.me?.cycle,
    user:state.app?.me?.fullname

  }
}

export default connect(mapStateToProps)(Index)