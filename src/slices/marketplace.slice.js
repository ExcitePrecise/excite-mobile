/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

// ------------------------------------
// Constants
// ------------------------------------

const initialState = {
  landing: [],
  "electronics":[] ,
  "fashion": [],
  display:"electronics"
}

// ------------------------------------
// Slice
// ------------------------------------

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    landingProduct: (state, { payload }) => {
      state.landing = payload
    },
    products: (state, { payload }) => {
      state[payload.category] = payload.data
    },
    display:(state,{payload})=>{
      state.display=payload.data
    }
  },
})

export const { action } = marketplaceSlice
export const { landingProduct, products,display } = marketplaceSlice.actions

export default marketplaceSlice.reducer
