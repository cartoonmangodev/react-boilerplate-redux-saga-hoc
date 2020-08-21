import json from '@rollup/plugin-json';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import size from 'rollup-plugin-size';
import externalDeps from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
import replace from '@rollup/plugin-replace';

const external = ['react'];

const globals = {
  react: 'React',
};

const inputSrc = 'src/index.js';

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'];
const babelConfig = { extensions };
const resolveConfig = { extensions };

export default [
  // {
  //   input: inputSrc,
  //   output: {
  //     file: 'dist/react-boilerplate-redux-saga-hoc.mjs',
  //     format: 'es',
  //     sourcemap: true,
  //   },
  //   external,
  //   plugins: [
  //     resolve(resolveConfig),
  //     babel(babelConfig),
  //     commonJS(),
  //     externalDeps(),
  //     json(),
  //   ],
  // },
  // {
  //   input: inputSrc,
  //   output: {
  //     file: 'dist/react-boilerplate-redux-saga-hoc.min.mjs',
  //     format: 'es',
  //     sourcemap: true,
  //   },
  //   external,
  //   plugins: [
  //     resolve(resolveConfig),
  //     babel(babelConfig),
  //     commonJS(),
  //     externalDeps(),
  //     terser(),
  //     json(),
  //   ],
  // },
  // {
  //   input: inputSrc,
  //   output: {
  //     name: 'ReactQuery',
  //     file: 'dist/react-boilerplate-redux-saga-hoc.development.js',
  //     format: 'umd',
  //     sourcemap: true,
  //     globals,
  //   },
  //   external,
  //   plugins: [
  //     resolve(resolveConfig),
  //     babel(babelConfig),
  //     commonJS(),
  //     externalDeps(),
  //     json(),
  //   ],
  // },
  {
    input: inputSrc,
    output: {
      name: 'ReactQuery',
      file: 'dist/react-boilerplate-redux-saga-hoc.production.min.js',
      format: 'umd',
      sourcemap: false,
      globals,
    },
    external,
    plugins: [
      replace({ 'process.env.NODE_ENV': `"production"`, delimiters: ['', ''] }),
      resolve(resolveConfig),
      babel(babelConfig),
      commonJS(),
      externalDeps(),
      terser(),
      size(),
      visualizer(),
      json(),
    ],
  },
];
