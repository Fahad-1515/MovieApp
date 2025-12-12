import { createContext, useContext, useState, useEffect, useCallback } from "react";

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistCount, setWatchlistCount] = useState(0);

  // Load watchlist from localStorage on initial render
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("movieWatchlist");
    if (savedWatchlist) {
      try {
        const parsed = JSON.parse(savedWatchlist);
        setWatchlist(parsed);
        setWatchlistCount(parsed.length);
      } catch (error) {
        console.error("Error parsing watchlist from localStorage:", error);
        localStorage.removeItem("movieWatchlist");
      }
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    if (watchlist.length > 0) {
      localStorage.setItem("movieWatchlist", JSON.stringify(watchlist));
    } else {
      localStorage.removeItem("movieWatchlist");
    }
    setWatchlistCount(watchlist.length);
  }, [watchlist]);

  // Add movie to watchlist
  const addToWatchlist = useCallback((movie) => {
    if (!movie || !movie.id) {
      console.error("Invalid movie object:", movie);
      return;
    }

    setWatchlist(prev => {
      // Check if movie already exists
      const exists = prev.some(item => item.id === movie.id);
      if (exists) {
        return prev; // Don't add duplicate
      }
      // Add new movie with timestamp
      const movieWithTimestamp = {
        ...movie,
        addedAt: new Date().toISOString()
      };
      return [...prev, movieWithTimestamp];
    });
  }, []);

  // Remove movie from watchlist
  const removeFromWatchlist = useCallback((movieId) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
  }, []);

  // Check if movie is in watchlist
  const isInWatchlist = useCallback((movieId) => {
    return watchlist.some(movie => movie.id === movieId);
  }, [watchlist]);

  // Clear entire watchlist
  const clearWatchlist = useCallback(() => {
    setWatchlist([]);
    localStorage.removeItem("movieWatchlist");
  }, []);

  // Move movie up/down in watchlist
  const moveMovie = useCallback((movieId, direction) => {
    setWatchlist(prev => {
      const index = prev.findIndex(movie => movie.id === movieId);
      if (index === -1) return prev;

      const newWatchlist = [...prev];
      if (direction === 'up' && index > 0) {
        [newWatchlist[index], newWatchlist[index - 1]] = 
        [newWatchlist[index - 1], newWatchlist[index]];
      } else if (direction === 'down' && index < newWatchlist.length - 1) {
        [newWatchlist[index], newWatchlist[index + 1]] = 
        [newWatchlist[index + 1], newWatchlist[index]];
      }
      return newWatchlist;
    });
  }, []);

  const value = {
    watchlist,
    watchlistCount,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearWatchlist,
    moveMovie
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};
