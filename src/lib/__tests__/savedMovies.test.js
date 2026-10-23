import { fetchSavedMovies } from "../savedMovies";

describe("fetchSavedMovies", () => {
  test("keeps successful movies when one saved movie cannot be fetched", async () => {
    const fetchMovie = vi.fn(async (id) => {
      if (id === "404") throw new Error("Not found");
      return { id: Number(id), title: `Movie ${id}` };
    });

    await expect(fetchSavedMovies(["12", "404", "34"], fetchMovie)).resolves.toEqual([
      { id: 12, title: "Movie 12" },
      { id: 34, title: "Movie 34" },
    ]);
  });

  test("isolates synchronous lookup errors as well as rejected promises", async () => {
    const fetchMovie = (id) => {
      if (id === "broken") throw new Error("Invalid lookup");
      return { id: Number(id), title: `Movie ${id}` };
    };

    await expect(fetchSavedMovies(["12", "broken", "34"], fetchMovie)).resolves.toEqual([
      { id: 12, title: "Movie 12" },
      { id: 34, title: "Movie 34" },
    ]);
  });

  test("returns an empty list when no saved IDs exist", async () => {
    const fetchMovie = vi.fn();

    await expect(fetchSavedMovies([], fetchMovie)).resolves.toEqual([]);
    expect(fetchMovie).not.toHaveBeenCalled();
  });

  test("ignores successful responses without a movie ID", async () => {
    await expect(
      fetchSavedMovies(["1", "2"], async (id) =>
        id === "1" ? { title: "Incomplete response" } : { id: 2, title: "Valid movie" },
      ),
    ).resolves.toEqual([{ id: 2, title: "Valid movie" }]);
  });
});
