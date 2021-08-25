import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { COLORS } from '../../../../../../theme/theme'
import { connect, useDispatch } from 'react-redux'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import { ActivityIndicator } from 'react-native-paper'
import useAxios from '../../../../../../utils/axios/init'
import { getProfileInfo } from '../../../../../../apis/auth'
import { useNavigation } from '@react-navigation/core'
import { saveMe } from '../../../../../../slices/app.slice'

const styles = StyleSheet.create({})

const EditItem = ({ products, item, token, isLoading, setIsLoading }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  //
  const [data, setData] = React.useState({})

  const handleEdit=(txt,field)=>{
      setData({...data, [field]:txt})
  }
  const handleUpdate = async () => {
    setIsLoading(true)
    try {
      const response = await useAxios.put(
        `/app/marketplace/products/update-item/${item}`,{...data},
        { headers: { authorization: `Bearer ${token}` } },
      )
      setIsLoading(false)

      if (response.data.code === 200) {
        Alert.alert('Item updated')
        const updatedProfile = await getProfileInfo(token)
        if (updatedProfile) {
          dispatch(saveMe({ me: updatedProfile }))
          navigation.goBack()
        }
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Network error')
      setIsLoading(false)
    }
  }
  //
  React.useEffect(() => {
    const product = products?.filter((el) => el._id === item)
    if (product) {
      return setData(product[0])
    }
  }, [products])

  //
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10,
        backgroundColor: '#f4f4f4',
      }}
    >
      <View style={{ backgroundColor: COLORS.white }}>
        <View>
          {data?.images ? (
            <Image
              source={{ uri: data?.images[0]?.Location }}
              style={{ width: '100%', height: 200 }}
              resizeMode="contain"
            />
          ) : null}
        </View>
        <View>
          <TableView appearance="light">
            <Section
              header="Product Details"
              footer=""
            >
              <Cell
                cellContentView={
                  <View style={{ width: '100%', marginTop: 10 }}>
                    <Text
                      style={{ color: COLORS.lightGrayDark, marginBottom: 5 }}
                    >
                      Product Title:
                    </Text>
                    <TextInput
                      style={{ fontSize: 16, flex: 1 }}
                      placeholder="Title"
                      value={data?.title}
                      onChangeText={(text)=>handleEdit(text,"title")}
                    />
                  </View>
                }
              />
              <Cell
                cellContentView={
                  <View style={{ width: '100%', marginTop: 10 }}>
                    <Text
                      style={{ color: COLORS.lightGrayDark, marginBottom: 5 }}
                    >
                      Product Price (NGN)
                    </Text>
                    <TextInput
                      style={{ fontSize: 16, flex: 1 }}
                      placeholder="Price"
                      value={data?.price}
                      onChangeText={(text)=>handleEdit(text,"price")}
                      keyboardType="numeric"
                    />
                  </View>
                }
              />
              <Cell
                cellContentView={
                  <View style={{ width: '100%', marginTop: 10 }}>
                    <Text
                      style={{ color: COLORS.lightGrayDark, marginBottom: 5 }}
                    >
                      Product Description
                    </Text>
                    <TextInput
                      style={{ fontSize: 16, flex: 1 }}
                      placeholder="Description"
                      value={data?.description}
                      onChangeText={(text)=>handleEdit(text,"description")}

                      // numberOfLines={4}
                    />
                  </View>
                }
              />
              <Cell
                contentContainerStyle={{
                  alignItems: 'flex-start',
                  height: 100,
                }}
                cellContentView={
                  <View style={{ flex: 1, fontSize: 16 }}>
                    {isLoading && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          marginTop: 10,
                        }}
                      >
                        <ActivityIndicator
                          animating={isLoading}
                          color={COLORS.red}
                        />
                        <Text style={{ marginLeft: 10, fontStyle: 'italic' }}>
                          deleting...
                        </Text>
                      </View>
                    )}

                    <TouchableOpacity
                      style={{
                        backgroundColor: COLORS.exciteGreen,
                        marginTop: 40,
                      }}
                      onPress={() => handleUpdate()}
                    >
                      <Button
                        color={COLORS.exciteGreen}
                        onPress={() => handleUpdate()}
                        title="Update"
                        disabled={isLoading}
                      ></Button>
                    </TouchableOpacity>
                  </View>
                }
              />
            </Section>
          </TableView>
        </View>
      </View>
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.app?.me?.product,
    token: state.app?.token,
  }
}

export default connect(mapStateToProps)(EditItem)
