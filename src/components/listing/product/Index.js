import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { images } from '../../../theme'
import { TextInput } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import subs, {
  CategoryMajor,
  category,
} from '../../../utils/productCategoriesHandler'
import { COLORS } from '../../../theme/theme'
import { useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import useAxios from '../../../utils/axios/init'
import { phoneCategory } from '../../../utils/productCategoriesHandler/phones'
import { connect, useDispatch } from 'react-redux'
import Electronics from './forms/Electronics'
import Fashion from './forms/Fashion'
import {
  listProduct,
  listProductAddImage,
  listProductCancelImages,
  listProductDeleteImage,
  selectProductListingCategory,
  selectProductListingSubCategory,
} from '../../../slices/app.slice'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ImageResizer } from '../../ImageResizer'
import Vehicle from './forms/Vehicle'
import Health from './forms/Health'
import Property from './forms/Property'
import Kids from './forms/Kids'
import Services from './forms/Services'
import Home from './forms/Home'
import Agro from './forms/Agro'
import Laptops from './forms/Laptops'

//
const createFormData = async (photo) => {
  const resized = await ImageResizer({
    uri: Platform.OS === 'ios' ? photo.replace('file://', '') : photo,
  })
  // console.log(resized, 'resized')

  const data = new FormData()
  const fileSplit = resized.uri.split('.')
  const ext = fileSplit[fileSplit.length - 1]
  data.append('image', {
    name: Date.now() + `.${ext}`,
    type: `image/${ext}`,
    uri:
      Platform.OS === 'ios' ? resized.uri.replace('file://', '') : resized.uri,
  })
  // console.log(data, 'data')
  return data
}

//
const Index = ({ productListing, productImg, navigation }) => {
  // console.log(productListing)
  const dispatch = useDispatch()
  // const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubCategory, setSelectedSubcategory] = useState([])
  // const [subCategory, setSubCategory] = useState('')
  useEffect(() => {
    if (productListing?.category) {
      // console.log(subs[selectedCategory])
      setSelectedSubcategory(subs[productListing?.category])
    }
  }, [productListing?.category])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Alert.alert('Refreshed');
      dispatch(listProduct({ category: '', subCategory: '' }))
      dispatch(listProductCancelImages())
      // getData()
    })
    return unsubscribe
  }, [navigation])

  // uploader

  const [image, setImage] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    if(productImg?.length > 3) return null;
    // for ongoing delete operation do nothing
    if(isDeleting) return null
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    // console.log(result)
    if (!result.cancelled) {
      setImage(result.uri)
    }
  }
  const [isUploading, setIsUploading] = useState(false)
  const handleUpload = async () => {
    setIsUploading(true)
    try {
      const response = await useAxios.post(
        '/upload-v2/mobile',
        await createFormData(image),
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (e) => {
            // console.log(e)
          },
        },
      )
      setIsUploading(false)
      // console.log(response.data)
      if (response.data.code === 201) {
        dispatch(listProductAddImage({ ...response.data }))
        setImage(null)
      } else {
        setIsUploading(false)
       Alert.alert('Error occured')
      }
    } catch (error) {
      setIsUploading(false)
      // console.log(error)
      Alert.alert('Network/Server error')

    }
  }

  const [isDeleting, setIsDeleting] = useState(false)
  const deleteFromS3 = async (key, name) => {
    setIsDeleting(true)
    useAxios
      .post('/upload/delete-item', { key: key })
      .then((res) => {
        setIsDeleting(false)
        dispatch(listProductDeleteImage({ key: key }))
        Alert.alert('Image deleted')
      })
      .catch((e) => {
        // console.log(e)
        setIsDeleting(false)
        return Alert.alert('Error occured')
      })
  }
  const DisplayCategory = () => {
    switch (productListing?.category) {
      case 'fashion':
        return <Fashion />
      case 'electronics':
        return <Electronics />
      case 'vehicle':
        return <Vehicle />
      case 'health':
        return <Health />
      case 'Property':
        return <Property />
      case 'kids':
        return <Kids />
      case 'services':
        return <Services />
      case 'home':
        return <Home />
      case 'agro':
        return <Agro />
      case 'laptops-acc':
        return <Laptops />
      default:
        return <View></View>
    }
  }

  //
  return (
    <View style={styles.form}>
      <View style={styles.title}>
        <Image
          source={images.new}
          width={20}
          height={20}
          resizeMode="contain"
        />
        <Text style={{ marginLeft: 10 }}>Product</Text>
      </View>
      {/* <TextInput /> */}
      <View
        style={{
          borderWidth: 0.5,
          borderColor: COLORS.lightGray,
          borderRadius: 5,
          marginVertical: 20,
        }}
      >
        <Picker
          selectedValue={productListing?.category}
          onValueChange={(itemValue, itemIndex) => {
            if (itemIndex === 0) return null
            return dispatch(
              selectProductListingCategory({ category: itemValue }),
            )
          }}
          mode="dropdown"
        >
          <Picker.Item
            color={COLORS.lightGray}
            label="Select Category"
            value={null}
          />
          {CategoryMajor?.map((item, index) => (
            <Picker.Item key={index} label={item.type} value={item.key} />
          ))}
        </Picker>
      </View>
      {/* Sub Category */}
      <View
        style={{
          marginTop: 5,
          borderWidth: 0.5,
          borderColor: COLORS.lightGray,
          borderRadius: 5,
          marginBottom: 20,
        }}
      >
        <Picker
          selectedValue={productListing?.subCategory}
          onValueChange={(itemValue, itemIndex) => {
            if (itemIndex === 0) return null
            return dispatch(
              selectProductListingSubCategory({ subCategory: itemValue }),
            )
          }}
          style={{ display: productListing?.category ? 'flex' : 'none' }}
          mode="dropdown"
        >
          <Picker.Item
            color={COLORS.lightGrayDark}
            label="Select Type"
            value={null}
          />
          {selectedSubCategory?.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>
      {/* New Image Uploader */}
      <View style={styles.uploader}>
        <View style={{ marginVertical: 10, flexDirection:'row',alignItems:'center',justifyContent:'space-between' }}>
          <Text style={{ color: COLORS.red, fontStyle: 'italic' }}>
            {`${!isDeleting ? '' : 'Deleting...'}`}
          </Text>
          <ActivityIndicator
            size="large"
            animating={isDeleting}
            color={'red'}
            hidesWhenStopped={true}
          />
        </View>
        <ScrollView style={styles.imagePreviews} horizontal={true}>
          {productImg?.map((img, index) => (
            <View style={{ marginRight: 10, position: 'relative' }} key={index}>
              <Image
                source={{ uri: img?.Location }}
                resizeMode="contain"
                style={{ width: 100, height: 100 }}
              />
              <TouchableOpacity
                style={{ position: 'absolute', top: 5, right: 2 }}
                onPress={() => deleteFromS3(img?.Key)}
              >
                <MaterialCommunityIcons size={25} name="delete" color={'red'} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={styles.action}>
          {productImg?.length > 0 ? (
            <Text style={{ color: COLORS.exciteGreen }}>
              {`${productImg?.length} / 4 image${
                productImg?.length > 1 ? 's' : ''
              } uploaded (4 Max.)`}
            </Text>
          ) : (
            <Text style={{ color: 'red' }}>
              {productImg?.length} Image uploaded
            </Text>
          )}
          {!image && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: COLORS.exciteDark }}>Add Image</Text>
              <TouchableOpacity onPress={pickImage} style={styles.addBtn}>
                <MaterialCommunityIcons
                  color={COLORS.white}
                  size={20}
                  name="plus"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{ marginVertical: 10 }}></View>
        <View>
          {image && (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: COLORS.exciteDark, fontStyle: 'italic' }}>
                {`${!isUploading ? 'Confirm (1) upload...' : 'Uploading...'}`}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <ActivityIndicator
                  size="large"
                  animating={isUploading}
                  color={COLORS.exciteGreen}
                  hidesWhenStopped={true}
                />
                {!isUploading && (
                  <>
                    <TouchableOpacity
                      onPress={() => handleUpload()}
                      style={styles.uploadbtn}
                    >
                      <MaterialCommunityIcons
                        size={20}
                        name="upload"
                        color={COLORS.white}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setImage(null)}
                      style={styles.calcelbtn}
                    >
                      <MaterialCommunityIcons
                        size={20}
                        name="cancel"
                        color={COLORS.white}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
      {/* New Image Uploader */}
      {/* FORMS */}
      {productListing?.subCategory && productListing?.images?.length > 0 ? (
        <DisplayCategory />
      ) : null}
      {/* <Fashion /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    // backgroundColor:'red',
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,

    elevation: 1,
  },
  uploader: {},
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addBtn: {
    backgroundColor: COLORS.exciteGreen,
    width: 40,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  calcelbtn: {
    backgroundColor: 'red',
    width: 40,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  uploadbtn: {
    backgroundColor: COLORS.exciteGreen,
    width: 40,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 20,
  },
})

const mapStateToProps = (state) => {
  return {
    productListing: state?.app?.productListing,
    productImg: state?.app?.productListing?.images,
  }
}

export default connect(mapStateToProps)(Index)
