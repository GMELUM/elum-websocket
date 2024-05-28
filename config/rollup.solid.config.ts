import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import terser from '@rollup/plugin-terser';
import copy from "rollup-plugin-copy";
import typescript from '@rollup/plugin-typescript';

import webWorkerLoader from 'rollup-plugin-web-worker-loader';
import { RollupOptions } from 'rollup';

const external = ["solid-js"];
const extensions = [".js", ".jsx", ".ts", ".tsx"]

const config: RollupOptions[] = [
    {
        plugins: [
            typescript({
                tsconfig: "src/solid/tsconfig.json",
                sourceMap: false
            }),
            webWorkerLoader({
                targetPlatform: "base64",
                extensions: extensions,
                inline: true,
            }),
            esbuild(),
            terser()
        ],
        input: 'src/solid/index.ts',
        treeshake: false,
        output: [
            {
                file: `dist/solid/index.mjs`,
                format: 'es',
                sourcemap: false,
            },
            {
                file: `dist/solid/index.js`,
                format: 'cjs',
                sourcemap: false,
            }
        ],
        external: (name) => external.includes(name),

    },
    {
        plugins: [
            typescript({
                tsconfig: "src/solid/tsconfig.json", // src\solid\tsconfig.json
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
                    { src: "src/solid/package.json", dest: "dist", rename: "solid/package.json" }
                ]
            })
        ],
        external: (name) => external.includes(name),
        input: 'src/solid/index.ts',
        output: {
            file: `dist/solid/index.d.ts`,
            format: 'es',
        },
    }
]

export default config;
