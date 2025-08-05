import globals from 'globals';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';

const files = ['app/**/*.js', 'packages/**/*.js', 'src/**/*.js'];

export default defineConfig([
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
]);
