import dotenv from 'dotenv'

dotenv.config()

import json from '@rollup/plugin-json'
import dts from 'rollup-plugin-dts'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import commonjs from '@rollup/plugin-commonjs'
import externals from 'rollup-plugin-node-externals'
import includePaths from 'rollup-plugin-includepaths'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json' assert { type: 'json' }

const nodeEnv = process.env.NODE_ENV || 'production'

console.log(`Starting build with NODE_ENV=${nodeEnv}`)

const getProductionPlugins = () => {
  if (nodeEnv !== 'development') {
    return [terser()]
  }

  return []
}

const bundle = config => ({
  ...config,
  input: 'src/main.ts',
})

export default [
  bundle({
    plugins: [
      includePaths({
        include: {},
        paths: ['src/'],
        external: [],
        extensions: ['.ts', '.tsx'],
      }),
      json(),
      peerDepsExternal(),
      externals({ deps: true }),
      nodeResolve({
        extensions: ['.ts', '.tsx'],
      }),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        exclude: '**/node_modules/**',
        extensions: ['.ts', '.tsx'],
      }),

      ...getProductionPlugins(),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  }),
  bundle({
    plugins: [
      includePaths({
        include: {},
        paths: ['src/'],
        external: [],
        extensions: ['.ts', '.tsx'],
      }),
      json(),
      dts(),
    ],
    output: {
      file: `dist/index.d.ts`,
      format: 'es',
    },
  }),
]
