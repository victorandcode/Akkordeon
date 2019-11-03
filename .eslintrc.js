module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: "eslint:recommended",
  parser: "babel-eslint",
  rules: {
    semi: ["error", "never"],
    eqeqeq: ["error"]
  }
}
