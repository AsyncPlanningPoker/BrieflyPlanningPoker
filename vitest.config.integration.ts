import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts', '!tests'],
    coverage: {
      enabled: true,
    }
  },
  resolve: {
    alias: {}
  }
});