module.exports = (api) => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            scenes: './src/scenes',
            theme: './src/theme',
            utils: './src/utils',
            slices: './src/slices',
          },
        },
      ],
    ],
  }
}
