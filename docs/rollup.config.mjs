import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import sourcemaps from 'rollup-plugin-sourcemaps';
//import svg from 'rollup-plugin-svg'

export default {
    input: "index.tsx",
    output: {
        file: "bundle.js",
        format: "iife",
        name: "bundle",
        sourcemap: "inline",
    },
    
    plugins: [
        typescript({}),
        replace({ 'process.env.NODE_ENV': JSON.stringify('development'), preventAssignment: false }),
        commonjs({ sourceMap: true, transformMixedEsModules: true }),
        resolve({ dedupe: ['preact', "preact/compat", "preact/hooks"] }),   // TODO: Why, exactly, is this needed? It doesn't not make sense, but specifically. Why.
        sourcemaps()
    ],
}

