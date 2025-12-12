import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { Header } from "./components/layout/Header";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import MovieChatbot from "./pages/MovieChatbot";
import { NotFound } from "./pages/NotFound";
import MovieBot from "./components/chatbot/MovieBot";
import "./index.css";

function App() {
  return (
    <ErrorBoundary>
      <WatchlistProvider>
        <Router>
          <div className="min-h-screen bg-gray-900">
            <Header />
            <main role="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/chatbot" element={<MovieChatbot />} />{" "}
                {/* Add this route */}
                <Route path="/genre/:genreId" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <MovieBot /> {/* Add the floating chatbot */}
          </div>
        </Router>
      </WatchlistProvider>
    </ErrorBoundary>
  );
}

export default App;
