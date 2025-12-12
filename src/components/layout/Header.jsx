import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Heart, Home } from "lucide-react";
import { useWatchlist } from "../../context/WatchlistContext";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { watchlistCount } = useWatchlist();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // Auto-focus search when on search page
  const isSearchPage = location.pathname === "/search";

  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-50 backdrop-blur-md bg-gray-800/90">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            aria-label="Go to homepage"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-white text-xl font-bold hidden sm:block tracking-tight">
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
                className="w-full pl-10 pr-4 py-2 bg-gray-700/80 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm placeholder-gray-400 transition-colors"
                autoFocus={isSearchPage && !location.search.includes("q=")}
                aria-label="Search movies"
              />
              {/* Keyboard shortcut hint */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center">
                <kbd className="px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded border border-gray-700">
                  ⌘K
                </kbd>
              </div>
            </div>
          </form>

          {/* Navigation */}
          <nav className="flex items-center space-x-2 md:space-x-4" aria-label="Main navigation">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-700/50 relative group"
              title="Home"
              aria-current={location.pathname === "/" ? "page" : undefined}
            >
              <Home className="w-5 h-5" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Home
              </span>
            </Link>
            
            <Link
              to="/watchlist"
              className="text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-700/50 relative group"
              title="Watchlist"
              aria-current={location.pathname === "/watchlist" ? "page" : undefined}
            >
              <Heart className="w-5 h-5" />
              {watchlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {watchlistCount > 99 ? "99+" : watchlistCount}
                </span>
              )}
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Watchlist ({watchlistCount})
              </span>
            </Link>
          </nav>
        </div>

        {/* Quick Search Suggestions (optional enhancement) */}
        {searchQuery.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 mx-4 bg-gray-800 border border-gray-700 rounded-md shadow-xl z-50">
            <div className="p-3 text-center text-gray-400 text-sm">
              Press Enter to search for "{searchQuery}"
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
