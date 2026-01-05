import { renderHook, act } from '@testing-library/react';
import { useFetch } from '../useFetch';

// Mock fetch globally
global.fetch = jest.fn();

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
      json: jest.fn().mockResolvedValue(mockResponse)
    });
  });

  test('fetches data on mount', async () => {
    const { result } = renderHook(() => useFetch('movie/popular'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);

    // Wait for the effect to run
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockMovies);
    expect(result.current.hasMore).toBe(true);
  });

  test('loads more data', async () => {
    const { result } = renderHook(() => useFetch('movie/popular'));

    // Wait for initial load
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
    const { result } = renderHook(() => useFetch('search/movie', 'test query'));

    // Wait for the effect to run
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('query=test%20query')
    );
  });

  test('stops loading when no more pages', async () => {
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        results: mockMovies,
        total_pages: 1,
        page: 1
      })
    });

    const { result } = renderHook(() => useFetch('movie/popular'));

    // Wait for the effect to run
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.hasMore).toBe(false);
  });
});