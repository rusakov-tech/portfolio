import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import baselineJs from 'eslint-plugin-baseline-js';

const files = ['app/**/*.js', 'src/**/*.js'];

export default defineConfig([
    js.configs.recommended,
    {
        name: 'ignores',
        ignores: ['dist/**/*.js', 'public/**/*.js'],
    },
    {
        name: 'node',
        ignores: files,
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    {
        name: 'browser',
        files,
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            'no-undef': 'error',
        },
    },
    {
        name: 'baseline',
        files,
        plugins: {
            'baseline-js': baselineJs,
        },
    },
]);
