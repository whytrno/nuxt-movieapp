module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    // Untuk mengatasi Component name "default" should always be multi-word
    "vue/multi-word-component-names": ["error", {
      "ignores": ["default", "Hero", "index", "Loading"]
    }]
  },
}
