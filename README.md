# Showmate - Movie Discovery App

A modern React-based movie discovery application that allows users to browse, search, and explore movies using The Movie Database (TMDB) API. Features include movie details, video trailers, and a responsive design.

## Features

- Browse popular, top-rated, and upcoming movies
- Search movies by title
- View detailed movie information including cast, ratings, and overview
- Watch movie trailers directly on the site
- Responsive design with dark mode support
- Fast and intuitive user interface built with Tailwind CSS

## Tech Stack

- **Frontend**: React 19, React Router DOM
- **Styling**: Tailwind CSS
- **API**: The Movie Database (TMDB) API
- **Build Tool**: Create React App
- **Deployment**: Vercel/Netlify

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API Key (get one from [TMDB](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MOHAMMADYASSINE23/Showmate.git
   cd Showmate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your TMDB API key:
   ```
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## Deployment

### Vercel (Recommended)

1. Sign up for a free account at [Vercel](https://vercel.com)
2. Connect your GitHub account
3. Import the Showmate repository
4. Add environment variables in Vercel's dashboard:
   - `REACT_APP_TMDB_API_KEY` = your TMDB API key
5. Deploy!

### Netlify

1. Sign up for a free account at [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Set build command to `npm run build`
4. Set publish directory to `build`
5. Add environment variables in Netlify's dashboard
6. Deploy!

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.js
│   ├── Cards.js
│   ├── Footer.js
│   ├── Header.js
│   └── ScrollToTop.js
├── pages/               # Page components
│   ├── MovieDetails.js
│   ├── MovieList.js
│   ├── Search.js
│   └── PageNotFound.js
├── hooks/               # Custom React hooks
│   └── useFetch.js
├── routes/              # Routing configuration
│   └── AllRoutes.js
├── assets/              # Static assets
└── App.js               # Main app component
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [React](https://reactjs.org/) for the frontend library
