/// <reference types="vitest" />
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'jsonLoose',
      formats: ['es', 'cjs', 'umd'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['moo'],
      output: { globals: { moo: 'moo' } }
    }
  },
  test: {
    globals: true,
    include: ['test/*.test.ts']
  }
})
