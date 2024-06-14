module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'react-native-paper/babel',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          'moti/skeleton': 'moti/skeleton/react-native-linear-gradient',
        },
      },
    ],
  ],
};
