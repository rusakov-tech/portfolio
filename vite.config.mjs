import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    root: 'app/pages',
    base: '/portfolio',
    publicDir: '../../public',
    plugins: [tailwindcss()],
    resolve: {
        extensions: ['.js'],
        alias: {
            '#': path.resolve(__dirname, 'src'),
            '@': path.resolve(__dirname, 'app'),
        },
    },
    build: {
        target: 'es6',
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                app: path.resolve(__dirname, 'app/pages/index.html'),
            },
        },
    },
});
