import { useState, useEffect } from "react";

import { Cards } from "../components/Cards";
import { SkeletonCard } from "../components/SkeletonCard";

const Favorites = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = JSON.parse(localStorage.getItem('movieFavorites') || '[]');
      if (favorites.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const moviePromises = favorites.map(id =>
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=299dbc2257c90dccef0f8793240a189c`)
            .then(res => res.json())
        );
        const movieData = await Promise.all(moviePromises);
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <main>
        <section className="max-w-7xl mx-auto py-7">
          <div className="flex justify-start flex-wrap other:justify-evenly">
            {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="max-w-7xl mx-auto py-7">
        <h1 className="text-3xl font-bold mb-4 text-center lg:text-left">My Favorites</h1>
        {movies.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No favorite movies yet. Add some from movie details!</p>
        ) : (
          <div className="flex justify-start flex-wrap other:justify-evenly">
            {movies.map((movie) => (
              <Cards key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Favorites;