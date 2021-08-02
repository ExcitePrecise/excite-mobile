import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import store from 'utils/store'
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

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
      <Router />
      </PaperProvider>
    </Provider>
  )
}

export default App
