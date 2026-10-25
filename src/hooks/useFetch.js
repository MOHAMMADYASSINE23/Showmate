import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchTmdb } from '../lib/tmdb';

// Simple in-memory cache
const cache = new Map();

export const useFetch = (apiPath, queryTerm = "") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const requestVersion = useRef(0);

  const fetchMovies = useCallback(async (pageNum = 1, append = false, isCurrent = () => true) => {
    const cacheKey = `${apiPath}_${queryTerm}_${pageNum}`;
    if (cache.has(cacheKey) && process.env.NODE_ENV !== 'test') {
      if (!isCurrent()) return;
      const cachedData = cache.get(cacheKey);
      if (append) {
        setData(prev => [...prev, ...cachedData.results]);
      } else {
        setData(cachedData.results);
      }
      setHasMore(pageNum < cachedData.total_pages);
      setLoading(false);
      return;
    }

    if (!isCurrent()) return;
    setLoading(true);
    const params = { page: pageNum };
    if (queryTerm) params.query = queryTerm;

    try {
      const json = await fetchTmdb(apiPath, params);
      cache.set(cacheKey, json);
      if (!isCurrent()) return;

      if (append) {
        setData(prev => [...prev, ...json.results]);
      } else {
        setData(json.results);
      }
      setHasMore(pageNum < json.total_pages);
    } catch (error) {
      if (isCurrent()) console.error("Error fetching movies:", error);
    } finally {
      if (isCurrent()) setLoading(false);
    }
  }, [apiPath, queryTerm]);

  useEffect(() => {
    const version = ++requestVersion.current;
    setData([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(1, false, () => requestVersion.current === version);

    return () => {
      requestVersion.current += 1;
    };
  }, [apiPath, queryTerm, fetchMovies]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      const version = requestVersion.current;
      setPage(nextPage);
      fetchMovies(nextPage, true, () => requestVersion.current === version);
    }
  };

  return { data, loading, hasMore, loadMore };
};
