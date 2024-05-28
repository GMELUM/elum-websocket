import { defineConfig } from 'vite';
import { resolve } from 'path'
import solidPlugin from 'vite-plugin-solid';
import copy from 'rollup-plugin-copy';

export default defineConfig({
    root: resolve(__dirname, "../src/solid"),
    build: {
        outDir: "../../dist/solid",
        emptyOutDir: false,
        rollupOptions: {
            external: ['solid-js']
        },
        target: "esnext",
        minify: "terser",
        terserOptions: {
            toplevel: true,
            compress: {
                dead_code: true,
            },
            format: {
                comments: false,
            }
        },
        copyPublicDir: false,
        lib: {
            name: "websocket",
            entry: "index.ts",
            formats: ['es', 'cjs'],
            fileName: "index"
        },
    },
    plugins: [
        solidPlugin(),
        copy({
            targets: [
                { src: "LICENSE", dest: "dist" },
                { src: "README.md", dest: "dist" },
                { src: "src/solid/package.json", dest: "dist", rename: "solid/package.json" }
            ]
        })
    ],
})