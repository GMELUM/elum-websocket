import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import terser from '@rollup/plugin-terser';
import copy from "rollup-plugin-copy";
import typescript from '@rollup/plugin-typescript';

import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import { RollupOptions } from 'rollup';

const external = ["react"];
const extensions = [".js", ".jsx", ".ts", ".tsx"]

const config: RollupOptions[] = [
  {
    input: 'src/react/index.ts',
    treeshake: false,
    output: [
      {
        file: `dist/react/index.mjs`,
        format: 'es',
        sourcemap: false,
      },
      {
        file: `dist/react/index.js`,
        format: 'cjs',
        sourcemap: false,
      }
    ],
    external: (name) => external.includes(name),
    plugins: [
      typescript({
        tsconfig: "src/react/tsconfig.json",
        sourceMap: false
      }),
      webWorkerLoader({
        targetPlatform: "base64",
        extensions: extensions,
        inline: true,
      }),
      esbuild(),
      terser()]
  },
  {
    input: 'src/react/index.ts',
    external: (name) => external.includes(name),
    plugins: [
      typescript({
        tsconfig: "src/react/tsconfig.json",
        sourceMap: false
      }),
      webWorkerLoader({
        targetPlatform: "base64",
        extensions: extensions,
        inline: true,
      }),
      dts(),
      copy({
        targets: [
          { src: "LICENSE", dest: "dist" },
          { src: "README.md", dest: "dist" },
          { src: "package.npm.json", dest: "dist", rename: "package.json" },
          { src: "src/react/package.json", dest: "dist", rename: "react/package.json" }
        ]
      })
    ],
    output: {
      file: `dist/react/index.d.ts`,
      format: 'es',
    },
  }
]

export default config;