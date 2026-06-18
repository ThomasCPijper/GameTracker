import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    sequence: { concurrent: false },
    fileParallelism: false,
    maxWorkers: 1,
    testTimeout: 30_000,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**'
    ]
  }
});