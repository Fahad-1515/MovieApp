import { useParams, useNavigate } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useWatchlist } from "../context/WatchlistContext";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import Rating from "../components/movie/Rating";
import { Heart, ArrowLeft, Calendar, Clock, DollarSign } from "lucide-react";
import { imageUrl } from "../utils/imageUrl";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movieData, loading, error } = useMovieDetails(id);
  const { addToWatchlist, removeFromWatchlist, watchlist } = useWatchlist(); 

  const isSaved = movieData?.id ? watchlist.some(item => item.id === movieData.id) : false;

  const handleWatchlistToggle = () => {
    if (!movieData?.id) return;
    
    if (isSaved) {
      removeFromWatchlist(movieData.id);
    } else {
      addToWatchlist(movieData);
    }
  };

  const handleBack = () => navigate(-1);

  if (loading) return <Loader />;

  if (error || !movieData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {error ? "Error loading movie" : "Movie not found"}
          </h2>
          <Button onClick={handleBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {movieData.backdrop_path && (
        <div className="fixed inset-0 -z-10">
          <img
            src={imageUrl.backdrop(movieData.backdrop_path)}
            alt={movieData.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40"></div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <img
                src={imageUrl.poster(movieData.poster_path)}
                alt={movieData.title}
                className="w-full rounded-lg shadow-2xl"
                onError={(e) => (e.target.src = "/placeholder-movie.jpg")}
              />
              <div className="mt-4">
                <Button
                  onClick={handleWatchlistToggle}
                  variant={isSaved ? "secondary" : "primary"}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <Heart
                    className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
                  />
                  <span>
                    {isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2">{movieData.title}</h1>
              {movieData.original_title !== movieData.title && (
                <p className="text-gray-400 text-lg mb-4">
                  {movieData.original_title}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Rating rating={movieData.vote_average} size="lg" />
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
              </div>

              {movieData.genres?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
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

            {movieData.overview && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {movieData.overview}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {movieData.production_companies?.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">Production</h3>
                  <div className="space-y-2">
                    {movieData.production_companies.map((company) => (
                      <div key={company.id} className="text-gray-300">
                        {company.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(movieData.budget > 0 || movieData.revenue > 0) && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">Financial Info</h3>
                  <div className="space-y-2">
                    {movieData.budget > 0 && (
                      <div className="flex items-center text-gray-300">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Budget: ${movieData.budget.toLocaleString()}
                      </div>
                    )}
                    {movieData.revenue > 0 && (
                      <div className="flex items-center text-gray-300">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Revenue: ${movieData.revenue.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold mb-3">Details</h3>
                <div className="space-y-2">
                  {movieData.status && (
                    <div className="text-gray-300">
                      Status: {movieData.status}
                    </div>
                  )}
                  {movieData.original_language && (
                    <div className="text-gray-300">
                      Original Language:{" "}
                      {movieData.original_language.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {movieData.credits?.cast?.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Top Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {movieData.credits.cast.slice(0, 8).map((actor) => (
                    <div key={actor.id} className="bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            actor.profile_path
                              ? imageUrl.profile(actor.profile_path)
                              : "/placeholder-actor.jpg"
                          }
                          alt={actor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-white">{actor.name}</p>
                          <p className="text-sm text-gray-400">
                            {actor.character}
                          </p>
                        </div>
                      </div>
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

export default MovieDetailPage;
