module.exports = {
  root: true,
  env: { browser: true, es2020: true , commonjs: true,},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh','require-path-exists','sort-keys-fix'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "indent": [
      "error",
      4,
      {
          "SwitchCase": 1
      }
  ],
  "linebreak-style": [
      "error",
      "unix"
  ],
  "quotes": [
      "error",
      "double"
  ],
  "semi": [
      "error",
      "always"
  ],
  "no-console": "off",
  "curly": ["error", "multi-or-nest"],
  "brace-style": ["error", "stroustrup"],
  "comma-dangle": ["error", "never"],
  "array-bracket-newline": ["error", "consistent"],
  "array-bracket-spacing": ["error", "always", {
      "objectsInArrays": false,
      "arraysInArrays": true
  }],
  "comma-spacing": ["error", {
      "before": false,
      "after": true
  }],
  "max-nested-callbacks": ["error", {
      "max": 4
  }],
  "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
  }],
  "no-multiple-empty-lines": ["error", {
      "max": 1,
      "maxEOF": 1,
      "maxBOF": 0
  }],
  "padding-line-between-statements": ["error", {
      "blankLine": "always",
      "prev": "*",
      "next": "return"
  }, {
      "blankLine": "always",
      "prev": ["const", "let", "var"],
      "next": "*"
  }, {
      "blankLine": "any",
      "prev": ["const", "let", "var"],
      "next": ["const", "let", "var"]
  }, {
      "blankLine": "always",
      "prev": ["if"],
      "next": "*"
  }, {
      "blankLine": "always",
      "prev": "*",
      "next": "if"
  }, {
      "blankLine": "always",
      "prev": "directive",
      "next": "*"
  }],
  "padded-blocks": ["error", "never"],
  "max-lines-per-function": ["error", {
      "max": 500
  }],
  "max-statements-per-line": ["error", {
      "max": 1
  }],
  "arrow-spacing": ["error", {
      "before": true,
      "after": true
  }],
  "default-case": ["error"],
  "complexity": ["error", {
      "max": 200
  }],
  "eqeqeq": ["error", "always"],
  "no-alert": ["error"],
  "no-use-before-define": ["error"],
  "handle-callback-err": ["error"],
  "quote-props": ["error", "as-needed"],
  "require-path-exists/notEmpty": 2,
  "require-path-exists/tooManyArguments": 2,
  "require-path-exists/exists": [2],
  "no-var": ["error"],
  "object-property-newline": ["error"],
  "array-element-newline": ["error", "always"],
  "sort-keys-fix/sort-keys-fix": ["error", "asc", {
      "caseSensitive": false,
      "natural": false
  }],
  "key-spacing": ["error"],
  "space-infix-ops": ["error"],
  "keyword-spacing": ["error"],
//   "comma-spacing": ["error"],
  "object-curly-newline": ["error", {
      "minProperties": 1
  }],
  "sort-vars": ["error", {
      "ignoreCase": true
  }],
  "dot-notation": ["error"]
  }
}
