module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended', '@vue/prettier'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'prettier/prettier': [
            'error',
            {
                printWidth: 100,
                singleQuote: true,
                htmlWhitespaceSensitivity: 'ignore'
            }
        ]
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true
            }
        }
    ],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaFeatures: {
            legacyDecorators: true,
        },
    },
    plugins: [
        'graphql'
    ]
};
