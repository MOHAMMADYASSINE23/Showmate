# Showmate

Showmate is a responsive movie discovery app built with React, React Router, Tailwind CSS, and Vite. It uses The Movie Database (TMDB) for movie data and lets visitors browse titles and maintain favorites/watchlists in the browser.

## Features

- Browse trending, popular, top-rated, and upcoming movies.
- Search movies and view details, trailers, credits, streaming providers, and similar titles.
- Keep favorites and a watchlist in browser storage.
- Responsive layout and skeleton loading states.

## Requirements

- Node.js 22.12 or newer
- npm
- A TMDB v3 API key

## Local setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Set `VITE_TMDB_API_KEY` in `.env.local`. Restart the Vite server after changing environment variables.

**API key note:** Vite embeds `VITE_*` values in the browser bundle. The TMDB key is public client configuration, not a server secret. Restrict usage where supported and rotate the key if it was exposed unexpectedly. Never put server-side credentials in a `VITE_*` variable.

## Quality checks

```bash
npm ci
npm run lint
npm test
npm run build
npm audit --omit=dev
```

GitHub Actions runs dependency auditing, lint, unit tests, production build, and Cypress smoke tests.

## License

MIT. See [LICENSE](LICENSE).
