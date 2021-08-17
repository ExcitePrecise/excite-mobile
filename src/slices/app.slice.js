/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

// ------------------------------------
// Constants

// ------------------------------------

const initialState = {
  checked: false,
  loggedIn: false,
  token: null,
  me: {},
  title: 'Excite',
  tabIcon:'shopping-bag',
  loading: false,
  productListing: { category: '', subCategory: '', images: [] },
}

// ------------------------------------
// Slice
// ------------------------------------

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      state.loggedIn = payload.loggedIn;
      state.token = payload.token;
      state.me = { ...payload.me };
    },
    authLogOut: (state, { payload }) => {
      ;(state.loggedIn = false), (state.token = null), (state.me = {})
    },
    saveMe: (state, { payload }) => {
      state.me = payload.me
    },
    setTitle: (state, { payload }) => {
      state.title = payload.title
    },
    setTabIcon: (state, { payload }) => {
      state.tabIcon = payload.icon
    },
    isLoading: (state, { payload }) => {
      state.loading = payload
    },
    listProduct: (state, { payload }) => {
      state.productListing = {
        ...state.productListing,
        category: payload.category,
        subCategory: payload.subCategory,
      }
    },
    listProductAddImage: (state, { payload }) => {
      state.productListing = {...state.productListing,images:[payload.image,...state.productListing.images]}
    },
    listProductCancelImages: (state) => {
      state.productListing.images=[]
    },
    listProductDeleteImage: (state,{ payload }) => {
      state.productListing.images = state.productListing?.images.filter(item=>item.key !== payload.key)
    },
    selectProductListingCategory: (state, { payload }) => {
      state.productListing.category = payload.category
    },
    selectProductListingSubCategory: (state, { payload }) => {
      state.productListing.subCategory = payload.subCategory
    },
  },
})

export const { action } = appSlice
export const {
  authenticate,
  saveMe,
  setTitle,
  setTabIcon,
  isLoading,
  authLogOut,
  listProduct,
  listProductAddImage,
  listProductCancelImages,
  listProductDeleteImage,
  selectProductListingCategory,
  selectProductListingSubCategory,
} = appSlice.actions

export default appSlice.reducer
