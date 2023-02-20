module.exports = {
  root: true,
  extends: '@react-native-community',
  ignorePatterns: ['node_modules/'],
  rules: {
    semi: ['error', 'never'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],
    'dot-notation': 'off',
    quotes: 'off',
    'prettier/prettier': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-dupe-class-members': 'off',
        'no-unused-vars': 'off',
      },
    },
  ],
}
