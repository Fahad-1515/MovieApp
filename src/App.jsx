import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { Header } from "./components/layout/Header";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import { NotFound } from "./pages/NotFound";
import "./index.css";
import { useEffect } from "react";

// Scroll restoration on route change
const ScrollToTop = () => {
  const { pathname } = window.location;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <ErrorBoundary>
      <WatchlistProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-gray-900">
            <Header />
            <main role="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
      </WatchlistProvider>
    </ErrorBoundary>
  );
}

export default App;
