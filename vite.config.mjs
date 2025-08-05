import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    root: 'app',
    publicDir: '../public',
    plugins: [tailwindcss()],
    resolve: {
        extensions: ['.js'],
        alias: {
            '#': path.resolve(__dirname, 'src'),
            '@repo/cursor': path.resolve(__dirname, 'packages/cursor'),
            '@repo/btn-top': path.resolve(__dirname, 'packages/btn-top'),
        },
    },
    build: {
        outDir: path.resolve(__dirname, 'docs'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                app: path.resolve(__dirname, 'app/index.html'),
            },
        },
    },
});
