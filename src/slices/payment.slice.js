/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

// ------------------------------------
// Constants

// ------------------------------------

const initialState = {
  checked: false,
  payNow: null
}

// ------------------------------------
// Slice
// ------------------------------------

const appSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    authPay: (state, { payload }) => {
      state.payNow = payload.payNow;
      state.checked = payload.checked;
    },
    authPayClose: (state, { payload }) => {
      state.payNow = "";
      state.checked = false;
    },
    
  },
})

export const { action } = appSlice
export const {
  authPay,
  authPayClose,
 
} = appSlice.actions

export default appSlice.reducer
