import { renderHook, act } from '@testing-library/react';

import { useFetch } from '../useFetch';

// Mock fetch globally
global.fetch = vi.fn();

const mockMovies = [
  { id: 1, title: 'Movie 1' },
  { id: 2, title: 'Movie 2' }
];

const mockResponse = {
  results: mockMovies,
  total_pages: 5,
  page: 1
};

describe('useFetch Hook', () => {
  beforeEach(() => {
    global.fetch.mockClear();
    global.fetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse)
    });
  });

  test('fetches data on mount', async () => {
    const { result } = renderHook(() => useFetch('movie/popular'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockMovies);
    expect(result.current.hasMore).toBe(true);
  });

  test('loads more data', async () => {
    const { result } = renderHook(() => useFetch('movie/popular'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.loadMore();
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenLastCalledWith(
      expect.stringContaining('page=2')
    );
  });

  test('handles search query', async () => {
    renderHook(() => useFetch('search/movie', 'test query'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('query=test+query')
    );
  });

  test('stops loading when no more pages', async () => {
    global.fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValue({
        results: mockMovies,
        total_pages: 1,
        page: 1
      })
    });

    const { result } = renderHook(() => useFetch('movie/popular'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.hasMore).toBe(false);
  });

  test('ignores an older search response when a newer query has already loaded', async () => {
    let resolveOldRequest;
    global.fetch
      .mockImplementationOnce(() => new Promise(resolve => {
        resolveOldRequest = resolve;
      }))
      .mockResolvedValueOnce({
        json: vi.fn().mockResolvedValue({
          results: [{ id: 9, title: 'New query result' }],
          total_pages: 1,
          page: 1
        })
      });

    const { result, rerender } = renderHook(
      ({ query }) => useFetch('search/movie', query),
      { initialProps: { query: 'old query' } }
    );

    await act(async () => {
      rerender({ query: 'new query' });
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.data).toEqual([{ id: 9, title: 'New query result' }]);

    await act(async () => {
      resolveOldRequest({
        json: vi.fn().mockResolvedValue({
          results: [{ id: 1, title: 'Stale result' }],
          total_pages: 1,
          page: 1
        })
      });
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.data).toEqual([{ id: 9, title: 'New query result' }]);
    expect(result.current.loading).toBe(false);
  });
});
