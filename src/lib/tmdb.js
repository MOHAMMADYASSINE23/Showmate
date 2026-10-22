const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTmdb(path, params = {}) {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("Missing REACT_APP_TMDB_API_KEY. Add it to your local environment.");
  }

  const normalizedPath = String(path).replace(/^\\/+/, "");
  const url = new URL(`${TMDB_API_BASE_URL}/${normalizedPath}`);
  url.searchParams.set("api_key", apiKey);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url.toString());
  if (response.ok === false) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }

  return response.json();
}
