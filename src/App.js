import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'
// import reduxStrore from './redux/store';
import { Provider } from 'react-redux'
import reduxStrore from 'utils/store'
import 'utils/ignore'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// assets
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import { COLORS } from './theme/theme'
import Router from './routes'

const App = () => {
  // state
  const [didLoad, setDidLoad] = useState(false)

  // handler
  const handleLoadAssets = async () => {
    // assets preloading
    await Promise.all([...imageAssets, ...fontAssets])
    setDidLoad(true)
  }

  // lifecycle
  useEffect(() => {
    handleLoadAssets()
  }, [])

  // rendering
  if (!didLoad) return <View />

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: COLORS.exciteGreen,
      accent: 'yellow',
    },
  };
  const {store,persistor}= reduxStrore();

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PaperProvider theme={theme}>
      <Router />
      </PaperProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
