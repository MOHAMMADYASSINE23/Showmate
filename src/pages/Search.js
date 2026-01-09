import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { useFetch } from "../hooks/useFetch";
import { Cards } from "../components";
import { SkeletonCard } from "../components/SkeletonCard";

const Search = ({apiPath = "search/movie"}) => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q") || "";

  const { data: movies, loading, hasMore, loadMore } = useFetch(apiPath, queryTerm);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  if (loading && movies.length === 0) {
    return (
      <main>
        <section className="py-7">
          <p className="text-3xl text-gray-700 dark:text-white">Searching for '{queryTerm}'...</p>
        </section>
        <section className="max-w-7xl mx-auto py-7">
          <div className="flex justify-start flex-wrap">
            {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="py-7">
        <p className="text-3xl text-gray-700 dark:text-white">{ movies.length === 0 ? `No result found for '${queryTerm}'` : `Result for '${queryTerm}'` }</p>
      </section>
      <section className="max-w-7xl mx-auto py-7">
        <div className="flex justify-start flex-wrap">
          { movies.map((movie) => (
            <Cards key={movie.id} movie={movie} />
          )) }
        </div>
        {hasMore && (
          <div ref={ref} className="flex justify-center py-4">
            {loading && <div className="text-gray-500">Loading more movies...</div>}
          </div>
        )}
      </section>
    </main>
  )
}

export { Search };


