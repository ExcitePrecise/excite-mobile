import * as React from 'react'
import {
  useWindowDimensions
} from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { TabBar } from 'react-native-tab-view'
import { COLORS } from '../../../theme/theme'
import { MaterialIcons} from 'react-native-vector-icons'
import BronzeYearly from './yearly/BronzeYearly'
import SilverYearly from './yearly/SilverYearly'
import GoldYearly from './yearly/GoldYearly'



//
const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: COLORS.exciteGreen }}
    style={{ backgroundColor: COLORS.exciteDark }}
    renderIcon={({ route, focused, color }) => (
      <MaterialIcons
        name={focused ? 'check-circle-outline' : 'radio-button-unchecked'}
        color={focused ? COLORS.exciteGreen : COLORS.white}
        size={20}
      />
    )}
  />
)
// 
const renderScene = SceneMap({
  bronze: BronzeYearly,
  silver: SilverYearly,
  gold: GoldYearly,
})

export default function TabViewExample({navigation}) {
  // console.log(navigation,'tab')

  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'bronze', title: 'Bronze', navigation:navigation },
    { key: 'silver', title: 'Silver' ,navigation:navigation },
    { key: 'gold', title: 'Gold',navigation:navigation },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width, height: layout.height }}
      tabBarPosition="top"
      renderTabBar={renderTabBar}
    />
  )
}