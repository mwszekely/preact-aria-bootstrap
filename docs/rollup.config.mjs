import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import sourcemaps from 'rollup-plugin-sourcemaps';
import path from "path";
import postcss from 'rollup-plugin-postcss'
import svg from 'rollup-plugin-svg'
import cssnano from 'cssnano';
import postcssImport from "postcss-import";
import postcssMixins from "postcss-mixins";
import postcssNesting from "postcss-nesting";
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
    input: "index.tsx",
    output: {
        file: "bundle.js",
        format: "iife",
        name: "bundle",
        sourcemap: "inline"
    },
    plugins: [
        typescript({}),
        svg(),
        postcss({
            plugins: [

                postcssImport(),
                //require( './themeimporter' )( options.themeImporter ),
                postcssMixins(),
                postcssNesting({ noIsPseudoSelector: true })
                /*require('./themelogger')()
                cssnano({
                    preset: 'default',
                    autoprefixer: false,
                    reduceIdents: false
                })*/
            ]
        }),
        nodePolyfills(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            preventAssignment: false
        }),
        alias({
            entries: [
                { find: 'react', replacement: 'preact/compat' },
                { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
                { find: 'react-dom', replacement: 'preact/compat' },
                { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' }
            ]
        }),
        commonjs({ sourceMap: true }),
        resolve({ browser: true, dedupe: ['preact', "preact/compat", "preact/hooks", "preact-prop-helpers"] }),
        /*getBabelOutputPlugin({
            configFile: path.resolve(".babelrc"),
            sourceMaps: true,
            allowAllFormats: true
        }),*/
        sourcemaps()
    ],
}

