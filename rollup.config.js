import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import { readdirSync } from 'fs';
import { join, basename } from 'path';
import * as fs from "node:fs";
import removeExports from "./plugins/rollup-plugin-remove-exports.js";
import removeImports from "./plugins/rollup-plugin-remove-imports.js";
import removeBlankLines from "./plugins/rollup-plugin-remove-blank-lines.js";

// Helper function to get all TypeScript files in the src directory
const getFiles = dir => readdirSync(dir).reduce((files, file) => {
    const name = join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getFiles(name)] : [...files, name];
}, []).filter(file => file.endsWith('.ts'));

// Generate input object for Rollup from all TypeScript files in src directory
const input = getFiles('src').reduce((entries, file) => {
    const key = basename(file, '.ts');
    entries[key] = file;
    return entries;
}, {});

export default {
    input,
    output: {
        dir: 'dist',
        format: 'es',
        sourcemap: false,
        entryFileNames: '[name].js',  // Output flat structure
    },
    plugins: [
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        babel({
            babelHelpers: 'bundled',
            extensions: ['.ts', '.js'],
            include: ['src/**/*'],
            exclude: 'node_modules/**'
        }),
        removeExports(),
        removeImports(),
        removeBlankLines()
    ],
};
