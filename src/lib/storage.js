export const FAVORITES_KEY = "movieFavorites";
export const WATCHLIST_KEY = "movieWatchlist";
export const DARK_MODE_KEY = "darkMode";

function getStorage() {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readIdList(key) {
  const storage = getStorage();
  if (!storage) return [];

  try {
    const value = JSON.parse(storage.getItem(key) || "null");
    if (!Array.isArray(value)) return [];

    const ids = value
      .filter(
        (id) =>
          (typeof id === "string" && id.trim().length > 0) ||
          (typeof id === "number" && Number.isSafeInteger(id) && id >= 0),
      )
      .map((id) => (typeof id === "string" ? id.trim() : String(id)));

    return [...new Set(ids)];
  } catch {
    return [];
  }
}

export function writeIdList(key, ids) {
  const storage = getStorage();
  if (!storage) return false;

  try {
    const safeIds = Array.isArray(ids)
      ? ids
          .filter(
            (id) =>
              (typeof id === "string" && id.trim().length > 0) ||
              (typeof id === "number" && Number.isSafeInteger(id) && id >= 0),
          )
          .map(String)
      : [];
    storage.setItem(key, JSON.stringify([...new Set(safeIds)]));
    return true;
  } catch {
    return false;
  }
}

export function readBoolean(key, fallback = false) {
  const storage = getStorage();
  if (!storage) return fallback;

  try {
    const raw = storage.getItem(key);
    if (raw === null) return fallback;

    const value = JSON.parse(raw);
    return typeof value === "boolean" ? value : fallback;
  } catch {
    return fallback;
  }
}

export function writeBoolean(key, value) {
  const storage = getStorage();
  if (!storage || typeof value !== "boolean") return false;

  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
