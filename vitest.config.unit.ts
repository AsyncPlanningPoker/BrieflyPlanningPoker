import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['./**/*.test.ts'],
    exclude: ['./tests/integration/*'],
    coverage: {
      enabled: true,
    },
  },
});