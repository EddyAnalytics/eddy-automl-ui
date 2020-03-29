module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
        '\\.(gql|graphql)$': 'jest-transform-graphql'
    },
    setupFiles: ['./tests/unit/mocks.js']
};
