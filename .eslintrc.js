module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ["airbnb", "plugin:react/recommended"],
  plugins: ["babel", "import", "react", "prettier"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "import/no-cycle": ["off"],
    "import/no-named-as-default": ["off"],
    "react/destructuring-assignment": ["off"],
    "react/forbid-prop-types": ["off"],
    "react/jsx-filename-extension": ["error", { extensions: [".js"] }], // airbnb использует .jsx
  },
  settings: {
    "import/resolver": "webpack",
  },
};
