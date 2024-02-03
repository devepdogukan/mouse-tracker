// rollup.config.js
import terser from '@rollup/plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

import pkg from './package.json' assert { type: 'json' }

export default [
  {
    input: './src/index.tsx',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: 'inline'
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: 'inline'
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json', declaration: true }),
      postcss(),
      terser()
    ]
  }
]
