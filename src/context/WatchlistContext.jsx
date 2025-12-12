import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useWatchlist } from "../context/WatchlistContext";

const AddToWatchlistButton = ({ movie, size = "md", showLabel = false }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist, watchlist } = useWatchlist();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Change to state

  const sizeClasses = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" };
  const iconSizes = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };

  // FIX: Update isSaved whenever watchlist changes
  useEffect(() => {
    if (movie?.id) {
      const saved = isInWatchlist(movie.id);
      console.log("🔄 Updating isSaved to:", saved, "for movie ID:", movie.id);
      setIsSaved(saved);
    }
  }, [movie?.id, isInWatchlist, watchlist]); // Watch for watchlist changes

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    console.log("=== DEBUG CLICK ===");
    console.log("Movie object:", movie);
    console.log("Movie ID:", movie?.id);
    console.log("Is currently saved?", isSaved);
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
          isSaved ? "fill-red-500 text-red-500" : "text-gray-400"
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
