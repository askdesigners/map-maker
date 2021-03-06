"use strict";

module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: ["eslint:recommended", "plugin:vue/essential"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 2018,
        parser: "babel-eslint",
        sourceType: "module"
    },
    plugins: ["vue"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        quotes: ["off", "double"],
        semi: ["off", "always"],
        "no-unused-vars": ["off", { vars: "all", args: "after-used", ignoreRestSiblings: false }]
    }
};
