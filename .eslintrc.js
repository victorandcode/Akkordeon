module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: "eslint:recommended",
  parser: "babel-eslint",
  rules: {
    semi: ["error", "never"],
    eqeqeq: ["error"],
    "comma-dangle": ["error", "always-multiline"],
  },
}
