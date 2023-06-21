module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "prettier",
    ],
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
    },
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
