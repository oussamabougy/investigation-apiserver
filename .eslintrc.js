'use strict'
module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        jest: true
    },
    extends: [
        'usecases/usecase/nodejs'
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'object-curly-spacing': [2, 'always'],
        'space-before-function-paren': ['error', {
            asyncArrow: 'always'
        }],
    },
}
