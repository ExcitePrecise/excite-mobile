import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import appReducer from 'slices/app.slice'
import paymentReducer from 'slices/payment.slice'
import marketplaceReducer from 'slices/marketplace.slice'

const rootReducer = combineReducers({
  app: appReducer,
  marketplace:marketplaceReducer,
  payment:paymentReducer
  // add more reducers
})

const defaultMiddleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
})

// DISABLED LOGGER
const store = configureStore({
  reducer: rootReducer,
  // eslint-disable-next-line no-undef
  middleware: __DEV__ ? defaultMiddleware : defaultMiddleware,
})


// TO USE LOGGER

// const store = configureStore({
//   reducer: rootReducer,
//   // eslint-disable-next-line no-undef
//   middleware: __DEV__ ? defaultMiddleware.concat(logger) : defaultMiddleware,
// })

export default store
