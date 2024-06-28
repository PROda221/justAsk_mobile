import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/node_modules/", "**/*.json", "**/*.svg", "**/*.ttf"],
}, ...fixupConfigRules(compat.extends(
    "xo",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "prettier",
)), {
    plugins: {
        react: fixupPluginRules(react),
        "react-native": fixupPluginRules(reactNative),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: "latest",
        sourceType: "module",
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-throw-literal": "off",
        "react-native/no-raw-text": "off",

        "react/jsx-filename-extension": [1, {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
        }],

        "no-use-before-define": ["error", {
            variables: false,
        }],

        "react/prop-types": ["error", {
            ignore: ["navigation", "navigation.navigate"],
        }],
    },
}, ...compat.extends("xo-typescript", "prettier").map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
}))];