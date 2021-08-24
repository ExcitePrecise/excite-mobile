import { Dimensions } from 'react-native'
import { fonts } from './fonts'

const { width, height } = Dimensions.get('window')

export const COLORS = {
  exciteDark: '#2c2d3f',
  purple: '#A7CC48',
  exciteGreen: '#A7CC48',
  lightGrayDark: '#2C2D3F',
  pink: '#ff3d69',
  gray: '#797777',
  white: '#fff',
  black: '#000000',
  green: '#37E39F',
  red: 'crimson',
  lightGray: '#dbdbdb',
  lightGray1: '#f5f6fa',
  bg:'#fffbfb'
}
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
}
export const FONTS = {
  h1: { fontFamily: fonts.openSan.regular, fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: fonts.openSan.regular, fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: fonts.openSan.regular, fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: fonts.openSan.regular, fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: fonts.openSan.regular,
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: fonts.openSan.regular,
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: fonts.openSan.regular,
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: fonts.openSan.regular,
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: fonts.openSan.regular,
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
}

const appTheme = { COLORS, SIZES, FONTS }

export default appTheme
