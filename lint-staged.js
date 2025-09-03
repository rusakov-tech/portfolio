/**
 * @type {import('lint-staged').Configuration}
 */
export default {
    '*.{html,css,js,json, md}': () => 'npm run check:format',
    '*.js': () => 'npm run check:ts',
};
