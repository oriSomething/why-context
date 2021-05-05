/* eslint-disable */
"use strict";

const path = require("path");

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
    babelOptions: {
      configFile: path.resolve(__dirname, ".babelrc.json"),
    },
  },

  plugins: ["react", "react-hooks"],
  extends: ["eslint:recommended", "plugin:react/recommended"],

  rules: {
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
