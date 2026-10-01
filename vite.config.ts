import { defineConfig } from 'vitest/config'

export default defineConfig({
  build: {
    target: 'es2020',
    lib: {
      entry: 'src/ts/engine.ts',
      name: 'SVGEngine',
      formats: ['iife'],
      fileName: () => '3dengine.dist.js',
    },
  },
  test: {
    include: ['test/**/*.test.ts'],
  },
})
