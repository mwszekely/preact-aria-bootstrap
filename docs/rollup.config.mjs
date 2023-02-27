import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import path from "path";
import sourcemaps from "rollup-plugin-sourcemaps"

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
    input: "index.tsx",
    output: {
        file: "bundle.js",
        format: "iife",
        name: "bundle",
        sourcemap: "inline"
    },
    plugins: [
        typescript({ sourceMap: true }), 
        replace({ 'process.env.NODE_ENV': JSON.stringify('development'), preventAssignment: false }),
        commonjs({ sourceMap: true, transformMixedEsModules: true, extensions }),
        resolve({ extensions, dedupe: ['preact', "preact/compat", "preact/hooks"] }),   // TODO: Why, exactly, is dedupe needed? It doesn't not make sense, but could the Preact error be avoided?
        getBabelOutputPlugin({
            configFile: path.resolve(".babelrc"),
            sourceMaps: true,
            allowAllFormats: true
        }),
        sourcemaps()    // TODO: This is deprecated but needed for TS source maps
    ],
}
