import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { Image } from 'react-native'
import { CategoryMajor, category } from '../../utils/productCategoriesHandler'
import BannerNotification from '../BannerNotification'
import { Picker } from '@react-native-picker/picker'
import { COLORS } from '../../theme/theme'
import * as ImagePicker from 'expo-image-picker'
import { ImageResizer } from '../ImageResizer'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FAB } from 'react-native-paper'
import useAxios from '../../utils/axios/init'
import { connect } from 'react-redux'
import { popBanner } from '../../slices/app.slice'
//
const createFormData = async (photo) => {
  const resized = await ImageResizer({
    uri: Platform.OS === 'ios' ? photo.replace('file://', '') : photo,
  })

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
const BannerPlacement = ({ popBanner, token }) => {
  //   Loading April
  const [isLoading, setIsLoading] = React.useState(false)

  //   Picker
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const [values, setValues] = React.useState({
    categories: '',
    purpose: '',
    banner: null,
  })

  //
  // uploader

  const [image, setImage] = useState(null)
  React.useEffect(() => {
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
    // for ongoing delete operation do nothing
    if (isDeleting) return null
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
        '/upload/banner',
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
        // dispatch(listProductAddImage({ ...response.data }))
        setValues({ ...values, banner: { ...response.data.data } })
        popBanner({ visible: true, msg: 'Uploaded successfully', type:'success' })
        setImage(null)
      } else {
        setIsUploading(false)
        popBanner({ visible: true, msg: 'Error occured', type:'error' })
      }
    } catch (error) {
      setIsUploading(false)
      popBanner({ visible: true, msg: 'Network error' })
      // console.log(error)
    }
  }
  const [isDeleting, setIsDeleting] = useState(false)
  const deleteFromS3 = async (key, name) => {
    setIsDeleting(true)
    useAxios
      .post('/upload/delete-item', { key: key })
      .then((res) => {
        setIsDeleting(false)
        setValues({ ...values, banner: null })
        popBanner({ visible: true, msg: 'Deleted successfully',type:"success" })
      })
      .catch((e) => {
        setIsDeleting(false)
        popBanner({ visible: true, msg: 'Network error',type:"error" })
      })
  }

  const handlePostBanner = async () => {
    setIsLoading(true)
    try {
      const posted = await useAxios.post(
        '/banner/new',
        { ...values, banner: values.banner.Location },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      )
      setIsLoading(false)
      if (posted.data.code === 201) {
        popBanner({ visible: true, msg: 'Banner submitted', type:'success' })
        setValues({ banner: null, categories: '', purpose: '' })
      }
    } catch (error) {
      setIsLoading(false)
      popBanner({ visible: true, msg: 'Error: Failed to connect', type:"error" })
    }
  }
  //
  return (
    <React.Fragment>
      <BannerNotification />
      <ScrollView>
        <View style={styles.imagePreviews}>
          <View style={{ marginRight: 10 }}>
            {image ? (
              <View>
                <ImageBackground
                  source={{ uri: image }}
                  resizeMode="contain"
                  style={{ width: 400, height: 200, marginBottom: 10 }}
                />
                <Button
                  icon="pencil"
                  style={{ backgroundColor: 'red', marginBottom: 15 }}
                  color={COLORS.white}
                  onPress={() => pickImage()}
                >
                  Change
                </Button>
                <Button
                  loading={isUploading}
                  icon="upload"
                  style={{ backgroundColor: COLORS.exciteDark }}
                  onPress={handleUpload}
                >
                  Upload
                </Button>
              </View>
            ) : null}
          </View>
          {!image && !values.banner && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginTop: 30,
                  // position: 'absolute',
                  top: 0,
                  width: '100%',
                }}
              >
                <Text style={{ color: COLORS.exciteDark }}>Add Image</Text>
                <FAB
                  style={styles.fab}
                  small
                  icon="plus"
                  onPress={() => pickImage()}
                  color={COLORS.white}
                />
              </View>
            </View>
          )}
        </View>
        <View style={{ borderWidth: 1, borderRadius: 3, marginVertical: 20 }}>
          <Picker
            selectedValue={values.purpose}
            onValueChange={(itemValue, itemIndex) => {
              if (itemIndex === 0) return null
              return setValues({ ...values, purpose: itemValue })
            }}
            mode="dropdown"
          >
            <Picker.Item
              color={COLORS.lightGrayDark}
              label="Select Purpose"
              value={null}
            />
            {['Awareness', 'Promotional'].map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>
        <View style={{ borderWidth: 1, borderRadius: 3 }}>
          <Picker
            selectedValue={values.categories}
            onValueChange={(itemValue, itemIndex) => {
              if (itemIndex === 0) return null
              return setValues({ ...values, categories: itemValue })
            }}
            mode="dropdown"
          >
            <Picker.Item
              color={COLORS.lightGrayDark}
              label="Select Category"
              value={null}
            />
            {category?.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>
        <View style={styles.imagePreviews}>
          {values.banner ? (
            <View
              style={{
                marginRight: 10,
                position: 'relative',
                marginVertical: 20,
              }}
            >
              <ImageBackground
                source={{ uri: values?.banner?.Location }}
                resizeMode="contain"
                style={{ width: '100%', height: 200 }}
              />
              <FAB
                small
                icon="delete"
                onPress={() => pickImage()}
                color={COLORS.white}
                style={{
                  backgroundColor: 'crimson',
                  position: 'absolute',
                  top: 5,
                  right: 2,
                }}
                loading={isDeleting}
                onPress={() => deleteFromS3(values?.banner?.Key)}
                disabled={isDeleting}
              />
            </View>
          ) : null}
        </View>
        <View>
          <Button
            onPress={handlePostBanner}
            loading={isLoading}
            style={{ backgroundColor: COLORS.exciteGreen, marginTop: 20 }}
            disabled={isLoading || !values.banner || !values.categories || !values.purpose}
            color={COLORS.white}
            uppercase={false}
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => {
  return {
    banner: state.app?.banner,
    token: state.app?.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    popBanner: (payload) => dispatch(popBanner(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BannerPlacement)

const styles = StyleSheet.create({
  fab: {
    backgroundColor: COLORS.exciteGreen,
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
