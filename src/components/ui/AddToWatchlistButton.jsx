import { useState, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";
import { useWatchlist } from "../../context/WatchlistContext";

const AddToWatchlistButton = ({ movie, size = "md", showLabel = false }) => {
  const { addToWatchlist, removeFromWatchlist, watchlist } = useWatchlist();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (movie?.id) {
      const saved = watchlist.some(item => item.id === movie.id);
      setIsSaved(saved);
    }
  }, [watchlist, movie?.id]);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsAnimating(true);

    if (!movie?.id) {
      console.error("No movie ID provided");
      return;
    }

    if (isSaved) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }

    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [movie, isSaved, addToWatchlist, removeFromWatchlist]);

  const sizeClasses = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" };
  const iconSizes = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };

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
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
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

export const HeartIconButton = ({ movie, size = "md" }) => (
  <AddToWatchlistButton movie={movie} size={size} showLabel={false} />
);

export const WatchlistButtonWithLabel = ({ movie, size = "md" }) => (
  <AddToWatchlistButton movie={movie} size={size} showLabel={true} />
);

export default AddToWatchlistButton;
