import { useFetch } from "../hooks/useFetch";
import { Cards } from "../components/Cards";

export const MovieList = ({apiPath}) => {
  const { data: movies } = useFetch(apiPath);

  return (
    <main>
      <section className="max-w-7xl mx-auto py-7">
        <div className="flex justify-start flex-wrap other:justify-evenly">       
          { movies.map((movie) => (
            <Cards key={movie.id} movie={movie} />
          )) }
                 
        </div>
      </section>
    </main>
  )
}