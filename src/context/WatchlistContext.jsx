import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useWatchlist } from "../context/WatchlistContext";

const AddToWatchlistButton = ({ movie, size = "md", showLabel = false }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist, watchlist } = useWatchlist();
  const [isAnimating, setIsAnimating] = useState(false);

  const isSaved = isInWatchlist(movie?.id);

  const sizeClasses = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" };
  const iconSizes = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    // DEBUG: Check what we're receiving
    console.log("=== DEBUG CLICK ===");
    console.log("Movie object:", movie);
    console.log("Movie ID:", movie?.id);
    console.log("Movie ID type:", typeof movie?.id);
    console.log("Is currently saved?", isSaved);
    console.log("Full watchlist:", watchlist);
    console.log("Watchlist IDs:", watchlist.map(m => m.id));
    console.log("===================");
    
    setIsAnimating(true);

    if (isSaved) {
      console.log("Removing movie with ID:", movie.id);
      removeFromWatchlist(movie.id);
    } else {
      console.log("Adding movie:", movie);
      addToWatchlist(movie);
    }
  };

  useEffect(() => {
    let timer;
    if (isAnimating) {
      timer = setTimeout(() => setIsAnimating(false), 600);
    }
    return () => clearTimeout(timer);
  }, [isAnimating]);

  // Add this useEffect to monitor localStorage
  useEffect(() => {
    console.log("Button mounted for movie ID:", movie?.id);
    console.log("Initial isSaved state:", isSaved);
    
    // Check localStorage directly
    const stored = localStorage.getItem("movie-watchlist");
    console.log("LocalStorage content:", stored);
    if (stored) {
      console.log("Parsed watchlist:", JSON.parse(stored));
    }
  }, [movie?.id, isSaved]);

  return (
    <button
      onClick={handleClick}
      aria-label={isSaved ? "Remove from watchlist" : "Add to watchlist"}
      aria-pressed={isSaved}
      className={`
        relative group flex items-center justify-center rounded-full transition-all duration-300
        ${
          isSaved
            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
            : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/70 hover:text-white"
        }
        ${sizeClasses[size]}
        ${isAnimating ? "scale-110" : "scale-100"}
      `}
    >
      {isAnimating && (
        <div className="absolute inset-0 rounded-full bg-red-400/30 animate-ping"></div>
      )}

      <Heart
        className={`${iconSizes[size]} transition-all duration-300 ${
          isSaved ? "fill-current" : ""
        } ${isAnimating ? "scale-125" : "scale-100"}`}
      />

      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {isSaved ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
};
