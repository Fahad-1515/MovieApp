import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/movie/MovieCard";
import { GridLayout } from "../components/layout/GridLayout";
import { Trash2, ArrowUp, ArrowDown, Calendar } from "lucide-react";
import Button from "../components/ui/Button";

const Watchlist = () => {
  const { 
    watchlist, 
    removeFromWatchlist, 
    clearWatchlist, 
    moveMovie 
  } = useWatchlist();

  const handleRemove = (movieId) => {
    if (window.confirm("Are you sure you want to remove this movie from your watchlist?")) {
      removeFromWatchlist(movieId);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire watchlist?")) {
      clearWatchlist();
    }
  };

  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-8 pt-24 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-white mb-4">Your Watchlist</h1>
            <p className="text-gray-400 mb-8">
              Your watchlist is empty. Start adding movies you want to watch later!
            </p>
            <Link to="/">
              <Button>Browse Movies</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Sort by recently added
  const sortedWatchlist = [...watchlist].sort((a, b) => 
    new Date(b.addedAt || 0) - new Date(a.addedAt || 0)
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Watchlist</h1>
            <p className="text-gray-400">
              {watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} in your list
            </p>
          </div>
          
          {watchlist.length > 0 && (
            <Button 
              onClick={handleClearAll}
              variant="danger"
              className="mt-4 md:mt-0"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Sorting options */}
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-white font-medium">Sort by:</span>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Recently Added
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Watchlist Grid */}
        <GridLayout>
          {sortedWatchlist.map((movie) => (
            <div key={movie.id} className="relative group">
              {/* Movie Card */}
              <MovieCard movie={movie} />
              
              {/* Action Overlay */}
              <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="flex space-x-1">
                  <button
                    onClick={() => moveMovie(movie.id, 'up')}
                    className="p-1 bg-gray-800/80 hover:bg-gray-700 rounded-md"
                    aria-label="Move up"
                  >
                    <ArrowUp className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => moveMovie(movie.id, 'down')}
                    className="p-1 bg-gray-800/80 hover:bg-gray-700 rounded-md"
                    aria-label="Move down"
                  >
                    <ArrowDown className="w-4 h-4 text-white" />
                  </button>
                </div>
                
                <button
                  onClick={() => handleRemove(movie.id)}
                  className="p-1 bg-red-600/80 hover:bg-red-700 rounded-md"
                  aria-label="Remove from watchlist"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          ))}
        </GridLayout>

        {/* Watchlist Stats */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Watchlist Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Total Movies</p>
              <p className="text-white text-xl font-bold">{watchlist.length}</p>
            </div>
            {watchlist.length > 0 && (
              <>
                <div>
                  <p className="text-gray-400 text-sm">Oldest Added</p>
                  <p className="text-white text-sm">
                    {new Date(watchlist.reduce((oldest, movie) => {
                      const date = new Date(movie.addedAt || 0);
                      return date < new Date(oldest) ? movie.addedAt : oldest;
                    }, watchlist[0]?.addedAt)).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Newest Added</p>
                  <p className="text-white text-sm">
                    {new Date(watchlist.reduce((newest, movie) => {
                      const date = new Date(movie.addedAt || 0);
                      return date > new Date(newest) ? movie.addedAt : newest;
                    }, watchlist[0]?.addedAt)).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Genres</p>
                  <p className="text-white text-sm">
                    {[...new Set(watchlist.flatMap(movie => 
                      movie.genre_ids || movie.genres?.map(g => g.name) || []
                    ))].slice(0, 3).join(', ')}
                    {[...new Set(watchlist.flatMap(movie => 
                      movie.genre_ids || movie.genres?.map(g => g.name) || []
                    ))].length > 3 ? '...' : ''}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
