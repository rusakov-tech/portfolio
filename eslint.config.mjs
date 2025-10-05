import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

const files = ['app/**/*.js', 'src/**/*.js'];

export default defineConfig([
    js.configs.recommended,
    {
        ignores: ['dist/**/*.js', 'public/**/*.js'],
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
