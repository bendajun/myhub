module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // eslint的解析器，用于解析typescript，从而检查和规范typescript代码
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  rules: {
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    '@typescript-eslint/no-var-requires': 'off', // 除导入语句外，禁止使用require语句
  }
}