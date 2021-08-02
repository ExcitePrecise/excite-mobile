/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

// ------------------------------------
// Constants

// ------------------------------------

const initialState = {
  checked: false,
  loggedIn: false,
  token:null,
  me: {},
  loading:false,
}



// ------------------------------------
// Slice
// ------------------------------------

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      state.loggedIn = payload.loggedIn
      state.token = payload.token
    },
    authLogOut:(state,{payload})=>{
      state.loggedIn=false,
      state.token=null
    },
    saveMe: (state, { payload }) => {
      state.me = payload.me
    },
    isLoading:(state,{payload})=>{
      state.loading=payload
    }
  },
})

export const { action } = appSlice
export const { authenticate, saveMe,isLoading,authLogOut } = appSlice.actions

export default appSlice.reducer
