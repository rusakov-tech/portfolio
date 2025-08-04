import globals from 'globals';
import js from '@eslint/js';

const files = ['app/**/*.js', 'packages/**/*.js', 'src/**/*.js'];

export default [
    js.configs.recommended,
    {
        ignores: ['docs/**/*.js'],
    },
    {
        ignores: files,
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    {
        files,
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
    },
];
