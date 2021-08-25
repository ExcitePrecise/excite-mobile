import React from 'react'
import {
  StyleSheet,
  Text,
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

const DeleteItem = ({ products, item, token, isLoading, setIsLoading }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  //
  const [data, setData] = React.useState({})
  const handleDelete = async () => {
      setIsLoading(true)
    try {
      const response = await useAxios.delete(
        `/app/marketplace/products/delete-item/${item}`,
        { headers: { authorization: `Bearer ${token}` } },
      )
      setIsLoading(false)

      if (response.data.code === 200) {
        Alert.alert('Item Deleted')
        const updatedProfile = await getProfileInfo(token)
        if (updatedProfile) {
          dispatch(saveMe({ me: updatedProfile }))
          navigation.goBack()
        }
      }
    } catch (error) {
      console.log(error)
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
          {/* <Text>{data?.title}</Text> */}
          <TableView appearance="light">
            <Section
              header="Product Details"
              footer="Please note that this action is irreversible"
            >
              <Cell
                cellStyle="RightDetail"
                title="Title"
                detail={data?.title}
              />
              <Cell
                cellStyle="RightDetail"
                title="Category"
                detail={data?.category}
              />
              <Cell
                cellStyle="RightDetail"
                title="Type"
                detail={data?.subCategory}
              />
              <Cell
                cellStyle="RightDetail"
                title="Price"
                detail={`NGN ${data?.price}`}
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
                        marginTop: 10,
                      }}
                    >
                      <Button
                        color="red"
                        onPress={() => handleDelete()}
                        title="Delete"
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

export default connect(mapStateToProps)(DeleteItem)
