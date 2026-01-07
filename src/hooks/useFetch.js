import { useState, useEffect, useCallback } from 'react';

// Simple in-memory cache
const cache = new Map();

export const useFetch = (apiPath, queryTerm = "") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMovies = useCallback(async (pageNum = 1, append = false) => {
    const cacheKey = `${apiPath}_${queryTerm}_${pageNum}`;
    if (cache.has(cacheKey) && process.env.NODE_ENV !== 'test') {
      const cachedData = cache.get(cacheKey);
      if (append) {
        setData(prev => [...prev, ...cachedData.results]);
      } else {
        setData(cachedData.results);
      }
      setHasMore(pageNum < cachedData.total_pages);
      return;
    }

    setLoading(true);
    const query = queryTerm ? `&query=${encodeURIComponent(queryTerm)}` : "";
    const url = `https://api.themoviedb.org/3/${apiPath}?api_key=299dbc2257c90dccef0f8793240a189c&page=${pageNum}${query}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      cache.set(cacheKey, json);
      if (append) {
        setData(prev => [...prev, ...json.results]);
      } else {
        setData(json.results);
      }
      setHasMore(pageNum < json.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [apiPath, queryTerm]);

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(1, false);
  }, [apiPath, queryTerm, fetchMovies]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage, true);
    }
  };

  return { data, loading, hasMore, loadMore };
};
