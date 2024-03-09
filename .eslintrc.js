module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
        {
            "files": ["*.ts", "*.mts", "*.cts", "*.tsx"],
            "rules": { "@typescript-eslint/explicit-function-return-type": "warn" }
        },
        {
            "files": ["*.js", "*.mjs", "*.cjs", "*.jsx"],
            "extends": ["eslint:recommended", "plugin:react/recommended"],
            "rules": { "@typescript-eslint/explicit-function-return-type": "off" }
        }
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            tsx: true,
        },
    },
    plugins: ["@typescript-eslint", "react"],
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "never"],
        "no-empty": "warn",
        "no-cond-assign": ["error", "always"],
    },
    
}
