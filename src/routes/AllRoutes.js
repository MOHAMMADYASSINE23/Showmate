import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";

const MovieList = lazy(() => import("../pages/MovieList"));
const MovieDetails = lazy(() => import("../pages/MovieDetails"));
const Search = lazy(() => import("../pages/Search"));
const Favorites = lazy(() => import("../pages/Favorites"));
const Watchlist = lazy(() => import("../pages/Watchlist"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

export const AllRoutes = () => {
  const location = useLocation();

  return (
    <div className="dark:bg-slate-800">
      <AnimatePresence mode="wait">
        <Suspense fallback={<div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div></div>}>
          <Routes location={location} key={location.pathname}>
          <Route path="" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MovieList apiPath="movie/now_playing" />
            </motion.div>
          } />
          <Route path="movie/:id" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MovieDetails />
            </motion.div>
          } />
          <Route path="movies/popular" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MovieList apiPath="movie/popular" />
            </motion.div>
          } />
          <Route path="movies/top" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MovieList apiPath="movie/top_rated" />
            </motion.div>
          } />
          <Route path="movies/upcoming" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MovieList apiPath="movie/upcoming" />
            </motion.div>
          } />
          <Route path="search" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Search />
            </motion.div>
          } />
          <Route path="favorites" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Favorites />
            </motion.div>
          } />
          <Route path="watchlist" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Watchlist />
            </motion.div>
          } />
          <Route path="*" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <PageNotFound />
            </motion.div>
          } />
        </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  )
}
