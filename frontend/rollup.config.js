import scss from 'rollup-plugin-scss';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import clean from '@rollup-extras/plugin-clean';

export default {
    input: './src/js/main.js',
    output: {
        dir: './build',
        format: 'es',
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
        sourcemap: 'inline'
    },
    plugins: [
        clean(),
        scss({fileName: 'main.css', sourceMap: true}),
        htmlTemplate({
            template: './src/index.html',
            target: 'index.html'
        }),

        serve({
            open: true,
            port: 3000,
            contentBase: './build',
        }),
        livereload('./build')
    ]
}