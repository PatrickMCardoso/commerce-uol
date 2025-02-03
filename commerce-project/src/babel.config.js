module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: [
    'react-native-reanimated/plugin',
    '@babel/plugin-transform-typescript',
    'nativewind/babel'
  ]
};
