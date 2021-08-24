import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { COLORS, SIZES, FONTS } from '../../../theme/theme'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
//
export default function ExciteBanner() {
  const navigation = useNavigation()
  const [search,setSearch] = React.useState('')
  return (
    <View style={styles.root}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          textAlign="center"
          placeholder="Search products..."
          placeholderTextColor={COLORS.gray}
          value={search}
          onChangeText={(txt)=>setSearch(txt)}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() =>
            navigation.navigate('Search', {
              text: search,
            })
          }
        >
          <FontAwesome5 name="search" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.exciteDark,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
    paddingBottom: SIZES.padding * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  header: {
    ...FONTS.h1,
    color: COLORS.white,
  },
  body: {
    ...FONTS.body4,
    color: COLORS.white,
  },
  inputWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    marginTop: SIZES.padding,
    paddingLeft: SIZES.padding / 3,
    borderStyle: 'solid',
    borderColor: 'white',
    // borderWidth:2,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
  },
  icon: {
    width: 40,
    backgroundColor: COLORS.exciteGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
