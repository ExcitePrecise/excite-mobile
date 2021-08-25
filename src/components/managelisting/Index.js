import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { COLORS } from '../../theme/theme'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'

//
const RenderItem = ({ item }) => {
  const navigation = useNavigation()
  // console.log(navigation)
  return (
    <View style={styles.item}>
      <View>
        <ImageBackground
          source={{ uri: item?.images[0]?.Location }}
          resizeMode="cover"
          style={{ width: 200, height: 150 }}
        />
      </View>
      <View style={{ paddingLeft: 10, paddingVertical: 20, flex: 1 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="clip"
          style={{ marginBottom: 2 }}
        >
          {item?.title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="clip"
          style={{ marginBottom: 5, color: COLORS.gray }}
        >
          {item?.category}
        </Text>
        <Text>NGN {item?.price}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={styles.action}
            onPress={() =>
              navigation.navigate('Modals', {
                screen: 'ProductListingEdit',
                params: { item: item._id, action: 'Edit' },
              })
            }
          >
            <Text>Edit</Text>
            <MaterialIcons color={COLORS.exciteGreen} name="edit" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.action}
            onPress={() =>
              navigation.navigate('Modals', {
                screen: 'ProductListingEdit',
                params: { item: item._id, action: 'Delete' },
              })
            }
          >
            <Text>Delete</Text>
            <MaterialIcons color="red" name="delete" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const Index = ({ products }) => {
  //   console.log(products)

  return (
    <View style={{ backgroundColor: 'transparent' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: COLORS.white,
          padding: 10,
        }}
      >
        <Text>
          <MaterialIcons name="line-style" size={25} />{' '}
        </Text>
        <Text>Listed Services / Products</Text>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item, index) => item._id}
        style={{ padding: 10 }}
      />
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    store: state.app?.me?.storeInfo,
    products: state.app?.me?.product,
  }
}

export default connect(mapStateToProps)(Index)

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginBottom: 10,
    elevation: 3,
    borderRadius: 3,
  },
  action: {
    flexDirection: 'row',
    flex: 1,
    // backgroundColor:'blue'
  },
})
