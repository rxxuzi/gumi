import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const banner = `/*!
 * Gumi.js v1.0.0
 * Clean & minimal design system with delightful interactions 🍬
 * https://github.com/rxxuzi/gumi
 * (c) 2025 rxxuzi
 * Released under the MIT License
 */`;

export default [
  // UMD build (for browsers)
  {
    input: 'src/ts/gumi-umd.ts',
    output: [
      {
        file: 'dist/gumi.js',
        format: 'umd',
        name: 'gumi',
        banner,
        sourcemap: true,
        exports: 'default'
      },
      {
        file: 'dist/gumi.min.js',
        format: 'umd',
        name: 'gumi',
        banner,
        sourcemap: true,
        exports: 'default',
        plugins: [terser()]
      }
    ],
    plugins: [
      nodeResolve({
        browser: true
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationDir: undefined,
        outDir: undefined
      })
    ]
  },

  // ES Module build
  {
    input: 'src/ts/gumi.ts',
    output: [
      {
        file: 'dist/gumi.esm.js',
        format: 'es',
        banner,
        sourcemap: true
      },
      {
        file: 'dist/gumi.esm.min.js',
        format: 'es',
        banner,
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins: [
      nodeResolve({
        browser: true
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationDir: undefined,
        outDir: undefined
      })
    ]
  }
];