/* eslint-disable */
"use strict";

module.exports = {
  env: {
    commonjs: false,
    es2021: true,
    node: false,
    browser: true,
  },

  parser: "@babel/eslint-parser",

  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
  },

  plugins: ["react", "react-hooks"],
  extends: ["eslint:recommended", "plugin:react/recommended"],

  rules: {
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
