import { useState } from "react";
import Rating from "./Rating";
import { HeartIconButton } from "../ui/AddToWatchlistButton";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, className = "" }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleKeyPress = (e) => {
    if (["Enter", " "].includes(e.key)) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={handleKeyPress}
      aria-label={`View details for ${movie.title}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
        )}
        <img
          src={
            imageError || !movie.poster_path
              ? "/placeholder-poster.jpg"
              : `https://image.tmdb.org/t/p/w300${movie.poster_path}`
          }
          alt={movie.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        <div className="absolute top-2 right-2 z-10">
          <HeartIconButton movie={movie} size="sm" />
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-white">
            <Eye className="w-5 h-5" />
            <span className="font-medium">View Details</span>
          </div>
        </div>
        {movie.vote_average > 0 && (
          <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-semibold backdrop-blur-sm">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3
          className="font-semibold text-white text-sm mb-1 line-clamp-2"
          title={movie.title}
        >
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">{releaseYear}</span>
          <Rating rating={movie.vote_average} size="sm" showNumber={false} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
