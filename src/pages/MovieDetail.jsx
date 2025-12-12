import { useParams, useNavigate } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useWatchlist } from "../context/WatchlistContext";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import Rating from "../components/movie/Rating";
import {
  Heart,
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Play,
  Share,
} from "lucide-react";
import { imageUrl } from "../utils/imageUrl";

export const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movieData, loading, error } = useMovieDetails(id);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const isSaved = isInWatchlist(movieData?.id);

  const handleWatchlistToggle = () => {
    if (isSaved) {
      removeFromWatchlist(movieData.id);
    } else {
      addToWatchlist(movieData);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: movieData.title,
          text: movieData.overview,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900">

        <div className="pt-20 flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-900">
        
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Error loading movie
            </h2>
            <p className="text-gray-400 mb-6">{error.message}</p>
            <Button onClick={handleBack}>Go Back</Button>
          </div>
        </div>
      </div>
    );

  if (!movieData)
    return (
      <div className="min-h-screen bg-gray-900">
        
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Movie not found
            </h2>
            <Button onClick={handleBack}>Go Back</Button>
          </div>
        </div>
      </div>
    );

  // Find trailer if available
  const trailer = movieData.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop Image */}
      {movieData.backdrop_path && (
        <div className="fixed inset-0 -z-10">
          <img
            src={imageUrl.backdrop(movieData.backdrop_path)}
            alt={movieData.title}
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40"></div>
        </div>
      )}

      

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 pt-24">
        {/* Back Button */}
        <div className="flex items-center mb-6">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
        </div>

        {/* Movie Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <img
                src={imageUrl.poster(movieData.poster_path)}
                alt={movieData.title}
                className="w-full rounded-lg shadow-2xl"
                onError={(e) => {
                  e.target.src = "/placeholder-movie.jpg";
                }}
              />

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col space-y-3">
                {trailer && (
                  <Button
                    onClick={() =>
                      window.open(
                        `https://www.youtube.com/watch?v=${trailer.key}`,
                        "_blank"
                      )
                    }
                    variant="primary"
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Watch Trailer</span>
                  </Button>
                )}

                <Button
                  onClick={handleWatchlistToggle}
                  variant={isSaved ? "secondary" : "outline"}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <Heart
                    className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
                  />
                  <span>
                    {isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
                  </span>
                </Button>

                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <Share className="w-4 h-4" />
                  <span>Share</span>
                </Button>
              </div>

              {/* Quick Facts */}
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-white mb-3">Quick Facts</h3>
                <div className="space-y-2 text-sm">
                  {movieData.status && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span className="text-white">{movieData.status}</span>
                    </div>
                  )}
                  {movieData.original_language && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Language</span>
                      <span className="text-white">
                        {movieData.original_language.toUpperCase()}
                      </span>
                    </div>
                  )}
                  {movieData.budget > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Budget</span>
                      <span className="text-white">
                        ${movieData.budget.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {movieData.revenue > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Revenue</span>
                      <span className="text-white">
                        ${movieData.revenue.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-2">
            {/* Title and Basic Info */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">{movieData.title}</h1>
              {movieData.original_title !== movieData.title && (
                <p className="text-gray-400 text-lg mb-4">
                  {movieData.original_title}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Rating
                  rating={movieData.vote_average}
                  voteCount={movieData.vote_count}
                  size="large"
                />

                {movieData.release_date && (
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(movieData.release_date).getFullYear()}
                  </div>
                )}

                {movieData.runtime > 0 && (
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 mr-1" />
                    {movieData.runtime} min
                  </div>
                )}

                {movieData.adult && (
                  <span className="px-2 py-1 bg-red-600/20 text-red-300 rounded text-sm">
                    18+
                  </span>
                )}
              </div>

              {/* Genres */}
              {movieData.genres?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movieData.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            {movieData.overview && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {movieData.overview}
                </p>
              </div>
            )}

            {/* Cast Section */}
            {movieData.credits?.cast?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Top Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {movieData.credits.cast.slice(0, 8).map((actor) => (
                    <div
                      key={actor.id}
                      className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            actor.profile_path
                              ? imageUrl.profile(actor.profile_path)
                              : "/placeholder-actor.jpg"
                          }
                          alt={actor.name}
                          className="w-12 h-12 rounded-full object-cover"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate">
                            {actor.name}
                          </p>
                          <p className="text-sm text-gray-400 truncate">
                            {actor.character}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Production Companies */}
            {movieData.production_companies?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Production Companies
                </h2>
                <div className="flex flex-wrap gap-4">
                  {movieData.production_companies.map((company) => (
                    <div
                      key={company.id}
                      className="flex items-center space-x-3 bg-gray-800 rounded-lg p-3"
                    >
                      {company.logo_path && (
                        <img
                          src={imageUrl.poster(company.logo_path, "w92")}
                          alt={company.name}
                          className="w-8 h-8 object-contain"
                          loading="lazy"
                        />
                      )}
                      <span className="text-white font-medium">
                        {company.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Similar Movies */}
            {movieData.similar?.results?.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {movieData.similar.results.slice(0, 6).map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => navigate(`/movie/${movie.id}`)}
                      className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors"
                    >
                      <img
                        src={imageUrl.poster(movie.poster_path, "w200")}
                        alt={movie.title}
                        className="w-full h-32 object-cover rounded mb-2"
                        loading="lazy"
                      />
                      <p className="text-white font-medium text-sm truncate">
                        {movie.title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {movie.release_date
                          ? new Date(movie.release_date).getFullYear()
                          : "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
