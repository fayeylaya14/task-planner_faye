module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  extends: [
    "@nuxtjs",
    "plugin:nuxt/recommended",
    "prettier",
    "plugin:cypress/recommended",
    "@nuxtjs/eslint-config-typescript"
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
  },
};
