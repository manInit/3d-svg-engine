import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) =>
  mode === 'demo'
    ? {
        //демо-страница для GitHub Pages: относительные пути, чтобы работать из подпапки репозитория
        base: './',
        build: { target: 'es2020', outDir: 'demo-dist' },
      }
    : {
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
      },
)
