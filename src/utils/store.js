import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import appReducer from 'slices/app.slice'
import paymentReducer from 'slices/payment.slice'
import marketplaceReducer from 'slices/marketplace.slice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';


const rootReducer = combineReducers({
  app: appReducer,
  marketplace:marketplaceReducer,
  payment:paymentReducer
  // add more reducers
})

// 
const persistConfig = {
  key: 'root',
  storage:AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const defaultMiddleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
})

// DISABLED LOGGER
export default () => {
  let store = configureStore({
      reducer: persistedReducer,
      // middleware: __DEV__ ? defaultMiddleware : defaultMiddleware,
      middleware: __DEV__ ? defaultMiddleware : defaultMiddleware,
    })
      let persistor = persistStore(store)
      return { store, persistor }
    }

// export default () => {

//   let store = configureStore({
//       reducer: persistedReducer,
//       // middleware: __DEV__ ? defaultMiddleware : defaultMiddleware,
//       middleware: __DEV__ ? defaultMiddleware.concat(logger) : defaultMiddleware,
  
//     })
//       let persistor = persistStore(store)
//       return { store, persistor }
//     }
