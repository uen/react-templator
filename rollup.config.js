import typescript from '@rollup/plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const cjs = {
  exports: 'named',
  format: 'cjs',
  sourcemap: true
};

const esm = {
  format: 'esm',
  sourcemap: true
};

const getCJS = (override) => ({ ...cjs, ...override });
const getESM = (override) => ({ ...esm, ...override });

const commonPlugins = [
  typescript(),
  sourceMaps(),
  json()
  //   nodeResolve(),
  //   commonjs({
  //     ignoreGlobal: true
  //   }),
  //   replace({
  //     __VERSION__: JSON.stringify(pkg.version)
  //   })
];

// this should always be last
const minifierPlugin = terser({
  compress: {
    passes: 2
  }
});

const configBase = {
  input: './src/index.ts',

  // \0 is rollup convention for generated in memory modules
  external: (id) =>
    !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/'),
  plugins: commonPlugins
};

const globals = { react: 'React', 'react-dom': 'ReactDOM' };

const standaloneBaseConfig = {
  ...configBase,
  input: './src/index.tsx',
  output: {
    file: 'dist/react-templator.jsx',
    format: 'umd',
    globals,
    name: 'templator',
    sourcemap: true
  },
  external: Object.keys(globals),
  plugins: configBase.plugins.concat(
    replace({
      __SERVER__: JSON.stringify(false)
    })
  )
};

const config = {
  ...standaloneBaseConfig,
  plugins: standaloneBaseConfig.plugins.concat(
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    minifierPlugin
  )
};

const nativeConfig = {
  ...configBase,
  input: './src/native.tsx',
  output: [
    getCJS({
      file: 'native/dist/index.cjs.jsx'
    }),
    getESM({
      file: 'native/dist/index.esm.jsx'
    })
  ]
};

export default [config, nativeConfig];
