import { defineConfig } from 'vite';
import { resolve } from 'path'
import react from "@vitejs/plugin-react";

export default defineConfig({
    root: resolve(__dirname, "../src/react"),
    build: {
        outDir: "../../dist/react",
        emptyOutDir: false,
        rollupOptions: {
            external: ['react', 'react/jsx-runtime', "elum-state", "elum-state/react"]
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
    plugins: [react()],
})