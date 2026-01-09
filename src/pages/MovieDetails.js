import {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';

import Backup from "../assets/images/backup.png"

const MovieDetails = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [videos, setVideos] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [watchProviders, setWatchProviders] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const image = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : Backup ;

  useEffect(() => {
      async function fetchMovie() {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=299dbc2257c90dccef0f8793240a189c`);
      const json = await response.json();
      setMovie(json);

      const videoResponse = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=299dbc2257c90dccef0f8793240a189c`);
      const videoJson = await videoResponse.json();
      setVideos(videoJson.results);

      const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=299dbc2257c90dccef0f8793240a189c`);
      const creditsJson = await creditsResponse.json();
      setCast(creditsJson.cast.slice(0, 10)); // Top 10 cast members
      setCrew(creditsJson.crew.filter(person => person.job === 'Director' || person.job === 'Writer'));

      const watchResponse = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/watch/providers?api_key=299dbc2257c90dccef0f8793240a189c`);
      const watchJson = await watchResponse.json();
      setWatchProviders(watchJson.results || {});

      const similarResponse = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=299dbc2257c90dccef0f8793240a189c&page=1`);
      const similarJson = await similarResponse.json();
      setSimilarMovies(similarJson.results.slice(0, 20)); // Top 20 similar movies
      }
      fetchMovie();
  }, [params.id]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('movieFavorites') || '[]');
    const watchlist = JSON.parse(localStorage.getItem('movieWatchlist') || '[]');
    setIsFavorite(favorites.includes(params.id));
    setIsInWatchlist(watchlist.includes(params.id));
  }, [params.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('movieFavorites') || '[]');
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== params.id);
    } else {
      newFavorites = [...favorites, params.id];
    }
    localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const toggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('movieWatchlist') || '[]');
    let newWatchlist;
    if (isInWatchlist) {
      newWatchlist = watchlist.filter(id => id !== params.id);
    } else {
      newWatchlist = [...watchlist, params.id];
    }
    localStorage.setItem('movieWatchlist', JSON.stringify(newWatchlist));
    setIsInWatchlist(!isInWatchlist);
  };

  return (
    <main>
      <section className="flex justify-around flex-wrap py-5">
        <div className="max-w-sm">
          <img className="rounded" src={image} alt={movie.title} />
        </div>
        <div className="max-w-2xl text-gray-700 text-lg dark:text-white">
          <h1 className="text-4xl font-bold my-3 text-center lg:text-left">{movie.title}</h1>
          <p className="my-4">{movie.overview}</p>

          {videos.length > 0 && (
            <div className="my-4">
              <h2 className="text-2xl font-bold mb-2">Video Summary</h2>
              {(() => {
                const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                return trailer ? (
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p>No trailer available.</p>
                );
              })()}
            </div>
          )}
            { movie.genres ? (
              <p className="my-7 flex flex-wrap gap-2">
              { movie.genres.map((genre) => (
                <span className="mr-2 border border-gray-200 rounded dark:border-gray-600 p-2" key={genre.id}>{genre.name}</span>
              )) }
            </p>
            ) : "" }

          { movie.production_companies && movie.production_companies.length > 0 && (
            <p className="my-4">
              <span className="mr-2 font-bold">Production Companies:</span>
              <span>{movie.production_companies.map(company => company.name).join(', ')}</span>
            </p>
          )}

          { movie.production_countries && movie.production_countries.length > 0 && (
            <p className="my-4">
              <span className="mr-2 font-bold">Production Countries:</span>
              <span>{movie.production_countries.map(country => country.name).join(', ')}</span>
            </p>
          )}

          { cast.length > 0 && (
            <div className="my-4">
              <span className="mr-2 font-bold">Cast:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {cast.map(actor => (
                  <span key={actor.id} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                    {actor.name} as {actor.character}
                  </span>
                ))}
              </div>
            </div>
          )}

          { crew.length > 0 && (
            <div className="my-4">
              <span className="mr-2 font-bold">Crew:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {crew.map(person => (
                  <span key={person.id} className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                    {person.name} ({person.job})
                  </span>
                ))}
              </div>
            </div>
          )}

          { watchProviders.US && (watchProviders.US.flatrate || watchProviders.US.rent || watchProviders.US.buy) && (
            <div className="my-6">
              <h3 className="text-xl font-bold mb-3">Where to Watch</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-4">
                {watchProviders.US.flatrate && watchProviders.US.flatrate.length > 0 && (
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm font-semibold text-green-700 dark:text-green-400">Available to Stream</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {watchProviders.US.flatrate.slice(0, 8).map(provider => (
                        <div key={provider.provider_id} className="flex items-center bg-white dark:bg-gray-700 rounded-lg px-3 py-2 shadow-sm border border-gray-200 dark:border-gray-600">
                          <img
                            src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="w-6 h-6 mr-2 rounded"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <span className="text-sm font-medium">{provider.provider_name}</span>
                        </div>
                      ))}
                      {watchProviders.US.flatrate.length > 8 && (
                        <span className="text-sm text-gray-500">+{watchProviders.US.flatrate.length - 8} more</span>
                      )}
                    </div>
                  </div>
                )}

                {watchProviders.US.rent && watchProviders.US.rent.length > 0 && (
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">Available to Rent</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {watchProviders.US.rent.slice(0, 6).map(provider => (
                        <div key={provider.provider_id} className="flex items-center bg-white dark:bg-gray-700 rounded-lg px-3 py-2 shadow-sm border border-gray-200 dark:border-gray-600">
                          <img
                            src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="w-6 h-6 mr-2 rounded"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <span className="text-sm font-medium">{provider.provider_name}</span>
                        </div>
                      ))}
                      {watchProviders.US.rent.length > 6 && (
                        <span className="text-sm text-gray-500">+{watchProviders.US.rent.length - 6} more</span>
                      )}
                    </div>
                  </div>
                )}

                {watchProviders.US.buy && watchProviders.US.buy.length > 0 && (
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-sm font-semibold text-purple-700 dark:text-purple-400">Available to Buy</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {watchProviders.US.buy.slice(0, 6).map(provider => (
                        <div key={provider.provider_id} className="flex items-center bg-white dark:bg-gray-700 rounded-lg px-3 py-2 shadow-sm border border-gray-200 dark:border-gray-600">
                          <img
                            src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="w-6 h-6 mr-2 rounded"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <span className="text-sm font-medium">{provider.provider_name}</span>
                        </div>
                      ))}
                      {watchProviders.US.buy.length > 6 && (
                        <span className="text-sm text-gray-500">+{watchProviders.US.buy.length - 6} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} aria-hidden="true" className={`w-5 h-5 ${i < Math.round(movie.vote_average / 2) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                ))}
                <span className="ml-2 text-gray-900 dark:text-white">{movie.vote_average}/10</span>
              </div>
              <span className="text-gray-900 dark:text-white">{movie.vote_count} reviews</span>
          </div>

          <div className="my-4 flex flex-wrap gap-3">
            <button
              onClick={toggleFavorite}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isFavorite
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>

            <button
              onClick={toggleWatchlist}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isInWatchlist
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill={isInWatchlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: movie.title,
                    text: movie.overview,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share Movie
            </button>
          </div>

          <p className="my-4">
            <span className="mr-2 font-bold">Runtime:</span>
            <span>{movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A'}</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Original Language:</span>
            <span>{movie.original_language ? movie.original_language.toUpperCase() : 'N/A'}</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Budget:</span>
            <span>{movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Revenue:</span>
            <span>{movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">Release Date:</span>
            <span>{movie.release_date}</span>
          </p>

          <p className="my-4">
            <span className="mr-2 font-bold">IMDB Code:</span>
            <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">{movie.imdb_id}</a>
          </p>


        </div>
      </section>

      { similarMovies.length > 0 && (
        <section className="my-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Similar Movies</h2>
            <Link
              to={`/movies/popular`}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="flex flex-row overflow-x-auto gap-4 pb-4 px-4 scroll-smooth" style={{scrollSnapType: 'x mandatory'}}>
            {similarMovies.map(movie => (
              <div key={movie.id} className="text-center flex-shrink-0 w-32" style={{scrollSnapAlign: 'start'}}>
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : Backup}
                    alt={movie.title}
                    className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-200 shadow-md"
                  />
                  <h3 className="text-sm font-medium mt-2 line-clamp-2 text-gray-900 dark:text-white">{movie.title}</h3>
                  <div className="flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{movie.vote_average?.toFixed(1)}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export { MovieDetails };
