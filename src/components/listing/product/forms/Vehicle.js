import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// Formik x React Native example
import { Alert, ActivityIndicator } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { TextInput } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { COLORS } from '../../../../theme/theme'
import { connect, useDispatch } from 'react-redux'
import useAxios from '../../../../utils/axios/init'
import { useState } from 'react'
import {
  listProduct,
  listProductCancelImages,
} from '../../../../slices/app.slice'
//
const Vehicle = ({ category, subCategory, images, token, productListing }) => {
  const dispatch = useDispatch()
  const [isSubmit, setIsSubmit] = useState(false)
  //
  return (
    <>
      <Formik
        initialValues={{
          title: '',
          images: images,
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Product title is required'),
          price: Yup.string().required('Product price is required'),
          quantity: Yup.string().required('Product quantity is required'),
          salesTarget: Yup.string().required('Sales target is required'),
          description: Yup.string().required('Product description is required'),
        })}
        onSubmit={async (values) => {
          setIsSubmit(true)
          try {
            const response = await useAxios.post(
              '/app/marketplace/products/add-item/vehicle',
              {
                ...values,
                category,
                subCategory,
                images,
              },
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              },
            )
            setIsSubmit(false)
            if (response.data.code === 201) {
              Alert.alert('Item Posted Successfully')
              // Dispatch
              dispatch(listProduct({ category: '', subCategory: '' }))
              dispatch(listProductCancelImages())
              return
            }
            if (response.data.code === 304) {
              return Alert.alert(
                'Max number of product listing reached. Please upgrade your account',
              )
            }
            if (response.data.code === 404) {
              return Alert.alert('Please setup your store information')
            }
            return Alert.alert('Something went wrong')
          } catch (error) {
            setIsSubmit(false)
            return Alert.alert('Server error')
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
        }) => (
          <View style={{ paddingVertical: 30 }}>
            {touched.title && errors.title ? (
              <Text style={styles.error}>{errors.title}</Text>
            ) : null}
            <TextInput
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              mode="outlined"
              label="Product Title *"
              style={styles.textField}
              right={
                <TextInput.Icon
                  name="access-point"
                  color={COLORS.exciteGreen}
                />
              }
            />
            {touched.price && errors.price ? (
              <Text style={styles.error}>{errors.price}</Text>
            ) : null}
            <TextInput
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price}
              mode="outlined"
              label="Product Price *"
              style={styles.textField}
              right={<TextInput.Icon name="cash" color={COLORS.exciteGreen} />}
              keyboardType="numeric"
            />
            <TextInput
              onChangeText={handleChange('brand')}
              onBlur={handleBlur('brand')}
              value={values.brand}
              mode="outlined"
              label="Brand"
              style={styles.textField}
              right={
                <TextInput.Icon name="adjust" color={COLORS.exciteGreen} />
              }
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: '#444',
                borderRadius: 5,
                marginBottom: 20,
              }}
            >
              <Picker
                selectedValue={values.condition}
                onValueChange={(itemValue, itemIndex) => {
                  setFieldValue('condition', itemValue)
                  // this.setState({selectedLanguage: itemValue})
                }}
                mode="dropdown"
              >
                <Picker.Item
                  color={COLORS.lightGray}
                  label="Condition"
                  value={null}
                />
                {['Faily Used', 'New'].map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </Picker>
            </View>
            {touched.quantity && errors.quantity ? (
              <Text style={styles.error}>{errors.quantity}</Text>
            ) : null}
            <TextInput
              onChangeText={handleChange('quantity')}
              onBlur={handleBlur('quantity')}
              value={values.quantity}
              mode="outlined"
              label="Quantity *"
              style={styles.textField}
              right={
                <TextInput.Icon name="adjust" color={COLORS.exciteGreen} />
              }
              keyboardType="numeric"
              maxLength={6}
            />
            {touched.salesTarget && errors.salesTarget ? (
              <Text style={styles.error}>{errors.salesTarget}</Text>
            ) : null}
            <TextInput
              onChangeText={handleChange('salesTarget')}
              onBlur={handleBlur('salesTarget')}
              value={values.salesTarget}
              mode="outlined"
              label="Sales Target *"
              style={styles.textField}
              right={
                <TextInput.Icon name="adjust" color={COLORS.exciteGreen} />
              }
              keyboardType="numeric"
              maxLength={6}
            />
            {touched.description && errors.description ? (
              <Text style={styles.error}>{errors.description}</Text>
            ) : null}
            <TextInput
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              mode="outlined"
              label="Product Description *"
              style={styles.textField}
              //   right={<TextInput.Icon name="adjust" color={COLORS.exciteGreen} />}
              multiline
              numberOfLines={8}
              maxLength={300}
            />
            <View style={{ paddingBottom: 20 }}>
              <Text style={{ color: COLORS.gray, marginBottom: 20 }}>
                By clicking on POST PRODUCT, you accept the Terms of Use,
                confirm that you will abide by the safety tips, and declare that
                this posting does not include any prohibited items.
              </Text>
              <TouchableOpacity
                // disabled={errors.title}
                onPress={()=>{
                  if(errors.title) return Alert.alert("Field marked * are required")
                  return handleSubmit()}}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.exciteDark,
                  borderRadius: 3,
                }}
              >
                {isSubmit && (
                  <ActivityIndicator
                    size="large"
                    animating={isSubmit}
                    color={COLORS.exciteGreen}
                    hidesWhenStopped={true}
                  />
                )}
                <PaperButton>Post Product</PaperButton>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </>
  )
}

const styles = StyleSheet.create({
  textField: {
    marginBottom: 20,
    backgroundColor: COLORS.white,
  },
  error: {
    color: COLORS.red,
  },
})

const mapStateToProps = (state) => {
  return {
    category: state?.app?.productListing?.category,
    subCategory: state?.app?.productListing?.subCategory,
    images: state?.app?.productListing?.images,
    token: state?.app?.token,
    productListing: state?.app?.productListing,
  }
}

export default connect(mapStateToProps)(Vehicle)
