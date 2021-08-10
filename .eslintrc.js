module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },

  env: {
    jest: true,
    browser: true,
    node: true
  },

  extends: [
    'airbnb-base',
    'plugin:vue/essential',
  ],

  globals: {
    __static: true
  },

  plugins: [
    'vue',
  ],

  'rules': {
    'linebreak-style': 1,
    'max-len': [2, 150],
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'no-multi-assign': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
     'vue/html-self-closing': 0,
     'onject.property.newline': 0,
     'vue/max-attributes-per-line': 0,
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
