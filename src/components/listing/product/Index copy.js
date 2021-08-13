import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Button,
  TouchableOpacity,
  ScrollView
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
import { listProduct, listProductAddImage } from '../../../slices/app.slice'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ImageResizer } from '../../ImageResizer'



//
const createFormData =async (photo) => {
 
  const resized = await ImageResizer({uri:Platform.OS === 'ios' ? photo.replace('file://', '') : photo})
  console.log(resized, 'resized');

  const data = new FormData()
  const fileSplit = resized.uri.split('.')
  const ext = fileSplit[fileSplit.length - 1]
  data.append('image', {
    name: Date.now() + `.${ext}`,
    type: `image/${ext}`,
    uri: Platform.OS === 'ios' ? resized.uri.replace('file://', '') : resized.uri,
  })
  console.log(data, 'data');
  return data
}

//
const Index = ({ productListing, productImg }) => {
  // console.log(productListing)
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubCategory, setSelectedSubcategory] = useState([])
  const [subCategory, setSubCategory] = useState('')
  useEffect(() => {
    if (selectedCategory) {
      // console.log(subs[selectedCategory])
      setSelectedSubcategory(subs[selectedCategory])
    }
  }, [selectedCategory])

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

  const handleUpload = async () => {
    // console.log(createFormData(image,{userId:"124"},'sub'))
    try {
      const response = await useAxios.post(
        '/upload-v2/mobile',
        await createFormData(image),
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      console.log(response.data)
      if(response.data.code===201){
        handleNext()
        dispatch(listProductAddImage({ ...response.data }))
      }else{
        alert('Error occured')
      }
     
    } catch (error) {
      console.log(error)
    }
  }
  const handleNext = () => {
    dispatch(
      listProduct({
        category: selectedCategory,
        subCategory: subCategory,
      }),
    )
  }

  const handleDisplayCategory=()=>{
    switch (productListing?.category) {
      case "fashion":
        return <Fashion />
      default:
        // return <Fashion />

        break;
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
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            if (itemIndex === 0) return null
            return setSelectedCategory(itemValue)
          }}
          mode="dropdown"
        >
          <Picker.Item
            color={COLORS.lightGray}
            label="Select Category"
            value={null}
          />
          {CategoryMajor.map((item, index) => (
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
          selectedValue={subCategory}
          onValueChange={(itemValue, itemIndex) => {
            if (itemIndex === 0) return null
            return setSubCategory(itemValue)
          }}
          style={{ display: selectedCategory ? 'flex' : 'none' }}
          mode="dropdown"
        >
          <Picker.Item
            color={COLORS.lightGrayDark}
            label="Select Type"
            value={null}
          />
          {selectedSubCategory.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>
      {/* New Image Uploader */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
        {/* {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )} */}
      </View>
      <View style={styles.uploader}>
        <View style={{ marginVertical: 10 }}></View>
        <ScrollView style={styles.imagePreviews} horizontal={true}>
          {productImg?.map((img, index) => (
            <Image
              source={{ uri: img?.Location }}
              resizeMode="contain"
              key={index}
              style={{ width: 100, height: 100, marginRight:10 }}
            />
          ))}
        </ScrollView>
        <View style={styles.action}>
          {productImg?.length > 1 ? (
            <Text style={{ color: COLORS.lightGray }}>
              {productImg?.length} images uploaded
            </Text>
          ) : (
            <Text style={{ color: COLORS.lightGray }}>
              {productImg?.length} image uploaded
            </Text>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{color:COLORS.exciteDark}}>Add Image</Text>
            <TouchableOpacity onPress={pickImage} style={styles.addBtn}>
              <MaterialCommunityIcons size={25} name="upload-multiple" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}></View>
      </View>
      {/* New Image Uploader */}
      {/* Image Uploader */}

      <Button title="Upload" onPress={() => handleUpload()} />

      <View>
      <Button title="Next" onPress={() => handleNext()} />
      </View>

      {/* <Button title="Proceed" onPress={()=>handleNext()} /> */}
      {/* Image Uploadd ends*/}
      {/* FORMS */}
      {/* <Electronics /> */}
      {handleDisplayCategory()}
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
    width: 50,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginLeft: 10,
  },
})

const mapStateToProps = (state) => {
  return {
    productListing: state?.app?.productListing,
    productImg: state?.app?.productListing?.images,
  }
}

export default connect(mapStateToProps)(Index)
