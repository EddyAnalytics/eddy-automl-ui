module.exports = {
    plugins: ['cypress'],
    env: {
        mocha: true,
        'cypress/globals': true
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaFeatures: {
            legacyDecorators: true,
        },
    },
    rules: {
        strict: 'off'
    }
};
