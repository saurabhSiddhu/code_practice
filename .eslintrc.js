module.exports = {
    env: {
        node: true,
        jest: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:jest/recommended',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['jest'],
    rules: {
        'no-console': 'off',
        'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error'
    }
}; 