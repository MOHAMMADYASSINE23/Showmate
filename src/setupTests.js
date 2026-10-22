import '@testing-library/jest-dom/vitest';

vi.stubEnv('VITE_TMDB_API_KEY', 'test-tmdb-api-key');
globalThis.fetch = vi.fn();
