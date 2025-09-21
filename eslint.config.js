const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const eslintPluginReactNative = require("eslint-plugin-react-native");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      "react-native": eslintPluginReactNative
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json"
        },
        alias: {
          map: [["@", "./"]],
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
        }
      }
    },
    rules: {
      "react-native/no-unused-styles": "error",
      "import/no-unresolved": "error",
      "prettier/prettier": ["error", { trailingComma: "none" }]
    }
  }
]);
