import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    outDir: "out",
    format: ['cjs'],
    shims: false,
    dts: false,
    splitting: true,
    clean: true,
    minify: 'terser',
    platform: 'node',
    sourcemap: false,
    external: ['vscode'],
    noExternal: [
        "pkg-types",
    ]
});

