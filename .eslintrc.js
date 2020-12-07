module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "jest",
    "promise",
    "unicorn"
  ],
  parserOptions: {
    project: "./tsconfig.json"
  },
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  rules: {
    "max-classes-per-file": ["error", 3],
    "import/prefer-default-export": "off",
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowTypedFunctionExpressions: true }
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true, typedefs: true }
    ]
  }
};
