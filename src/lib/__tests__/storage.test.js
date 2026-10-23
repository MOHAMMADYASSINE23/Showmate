import {
  DARK_MODE_KEY,
  FAVORITES_KEY,
  WATCHLIST_KEY,
  readBoolean,
  readIdList,
  writeBoolean,
  writeIdList,
} from "../storage";

describe("safe browser storage helpers", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("returns an empty list when saved JSON is malformed", () => {
    localStorage.setItem(FAVORITES_KEY, "{broken");
    expect(readIdList(FAVORITES_KEY)).toEqual([]);
  });

  test("rejects non-array data and filters invalid IDs", () => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify({ id: "123" }));
    expect(readIdList(WATCHLIST_KEY)).toEqual([]);

    localStorage.setItem(
      WATCHLIST_KEY,
      JSON.stringify([" 123 ", "", null, {}, 42, -1, "123"]),
    );
    expect(readIdList(WATCHLIST_KEY)).toEqual(["123", "42"]);
  });

  test("writes unique valid IDs as strings", () => {
    expect(writeIdList(FAVORITES_KEY, ["42", 42, "", -1, "7"])).toBe(true);
    expect(readIdList(FAVORITES_KEY)).toEqual(["42", "7"]);
  });

  test("uses a safe fallback for malformed boolean settings", () => {
    localStorage.setItem(DARK_MODE_KEY, "not-json");
    expect(readBoolean(DARK_MODE_KEY, false)).toBe(false);

    localStorage.setItem(DARK_MODE_KEY, JSON.stringify("true"));
    expect(readBoolean(DARK_MODE_KEY, true)).toBe(true);
  });

  test("round-trips boolean settings", () => {
    expect(writeBoolean(DARK_MODE_KEY, true)).toBe(true);
    expect(readBoolean(DARK_MODE_KEY)).toBe(true);
  });
});
