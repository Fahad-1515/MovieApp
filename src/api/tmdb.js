const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const requestCache = new Map();

const fetchFromAPI = async (endpoint, params = {}) => {
  const urlParams = new URLSearchParams({
    api_key: API_KEY,
    ...params,
  });

  const url = `${BASE_URL}${endpoint}?${urlParams}`;
  const cacheKey = url;

  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey);
  }

  try {
    const promise = fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .finally(() => {
        requestCache.delete(cacheKey);
      });

    requestCache.set(cacheKey, promise);
    return await promise;
  } catch (error) {
    console.error("TMDB API Error:", error);
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};

export const api = {
  getTrendingMovies: (page = 1) =>
    fetchFromAPI("/trending/movie/week", { page: page.toString() }),

  getPopularMovies: (page = 1) =>
    fetchFromAPI("/movie/popular", { page: page.toString() }),

  getTopRatedMovies: (page = 1) =>
    fetchFromAPI("/movie/top_rated", { page: page.toString() }),

  getUpcomingMovies: (page = 1) =>
    fetchFromAPI("/movie/upcoming", { page: page.toString() }),

  searchMovies: (query, page = 1) =>
    fetchFromAPI("/search/movie", {
      query,
      page: page.toString(),
      include_adult: "false",
    }),

  getMovieDetails: (movieId) =>
    fetchFromAPI(`/movie/${movieId}`, {
      append_to_response: "credits,videos,similar",
    }),

  getMoviesByGenre: (genreId, page = 1) =>
    fetchFromAPI("/discover/movie", {
      with_genres: genreId.toString(),
      page: page.toString(),
    }),
};
