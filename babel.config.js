module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      // Required for expo-router
      require.resolve('expo-router/babel'),
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@/api': './api',
            '@/assets': './assets',
            '@/components': './components',
            '@/constants': './constants',
            '@/hooks': './hooks',
            '@/utils': './utils',
            '@/stores': './stores',
            '@/types': './types'
          }
        }
      ]
    ]
  }
}
