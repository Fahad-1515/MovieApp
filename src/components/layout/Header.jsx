import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, Home } from "lucide-react";
import { useWatchlist } from "../../context/WatchlistContext";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { watchlistCount } = useWatchlist();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-white text-xl font-bold hidden sm:block">
              Movies
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors p-2"
              title="Home"
            >
              <Home className="w-5 h-5" />
            </Link>
            <Link
              to="/watchlist"
              className="text-gray-300 hover:text-white transition-colors p-2 relative"
              title="Watchlist"
            >
              <Heart className="w-5 h-5" />
              {watchlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {watchlistCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
