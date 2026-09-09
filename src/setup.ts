import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Vitest globals are disabled, so RTL cannot auto-register its cleanup.
afterEach(() => {
  cleanup()
})