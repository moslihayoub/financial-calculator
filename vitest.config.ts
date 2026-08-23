import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.spec.ts', 'tests/**/*.test.ts'],
    exclude: ['tests/calculator.spec.ts'] // Playwright E2E tests are separate
  }
})
