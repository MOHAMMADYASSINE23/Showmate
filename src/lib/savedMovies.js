export async function fetchSavedMovies(ids, fetchMovie) {
  const results = await Promise.allSettled(
    ids.map((id) =>
      Promise.resolve().then(() => fetchMovie(encodeURIComponent(id))),
    ),
  );

  return results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value)
    .filter((movie) => movie && typeof movie === "object" && movie.id != null);
}
