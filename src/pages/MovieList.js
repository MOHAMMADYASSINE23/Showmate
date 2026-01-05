import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useFetch } from "../hooks/useFetch";
import { Cards } from "../components/Cards";
import { SkeletonCard } from "../components/SkeletonCard";

export const MovieList = ({apiPath}) => {
  const { data: movies, loading, hasMore, loadMore } = useFetch(apiPath);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  if (loading && movies.length === 0) {
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
        <div className="flex justify-start flex-wrap other:justify-evenly">
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