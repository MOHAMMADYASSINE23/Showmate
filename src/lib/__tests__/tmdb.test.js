import { fetchTmdb } from "../tmdb";

describe("fetchTmdb", () => {
  beforeEach(() => {
    global.fetch.mockReset();
    vi.stubEnv("VITE_TMDB_API_KEY", "test-tmdb-api-key");
  });

  test("adds the API key and encodes query parameters", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ results: [] }),
    });

    await fetchTmdb("search/movie", { query: "Star Wars", page: 2 });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://api.themoviedb.org/3/search/movie?"),
    );
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("api_key=test-tmdb-api-key"));
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("query=Star+Wars"));
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("page=2"));
  });

  test("throws a useful error when the key is missing", async () => {
    vi.stubEnv("VITE_TMDB_API_KEY", "");

    await expect(fetchTmdb("movie/popular")).rejects.toThrow("Missing VITE_TMDB_API_KEY");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("rejects unsuccessful TMDB responses", async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 401 });

    await expect(fetchTmdb("movie/popular")).rejects.toThrow("status 401");
  });
});
