import { useState, useRef, useEffect } from "react";
import { Header } from "../components/layout/Header";
import {
  Bot,
  MessageSquare,
  Sparkles,
  Film,
  Star,
  TrendingUp,
  Zap,
  Search,
  Heart,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const MovieChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial messages
  useEffect(() => {
    const initialMessages = [
      {
        id: 1,
        text: "🎬 Welcome to Movie Buddy! I'm here to help you discover amazing movies.",
        sender: "bot",
        timestamp: new Date(),
      },
      {
        id: 2,
        text: "I can help you find movies by genre, discover trending picks, search for specific movies, and more!",
        sender: "bot",
        timestamp: new Date(),
      },
    ];
    setMessages(initialMessages);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Sample features
  const features = [
    {
      icon: <Film className="w-6 h-6" />,
      title: "Genre Discovery",
      description: "Find movies by genre",
      examples: ["Action", "Comedy", "Romance", "Thriller"],
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Trending Picks",
      description: "What's popular right now",
      examples: ["Trending movies", "Most watched"],
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Top Rated",
      description: "Highest rated movies",
      examples: ["Best movies", "Top rated"],
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Upcoming",
      description: "New releases soon",
      examples: ["Upcoming movies", "Latest releases"],
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Movie Search",
      description: "Find specific movies",
      examples: ["Search Avengers", "Find Inception"],
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personalized",
      description: "Based on your preferences",
      examples: ["For date night", "Family movies"],
    },
  ];

  // Quick suggestions
  const suggestions = [
    "Show me action movies",
    "What's trending?",
    "Best comedy movies",
    "Search for The Dark Knight",
    "Romantic movies for tonight",
    "Top rated sci-fi",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "Great choice! I'll help you find some amazing movies like that.",
        "I've got some fantastic recommendations for you!",
        "Let me find the perfect movies based on your request.",
        "Here are some movies you might enjoy...",
        "Based on what you're looking for, I suggest these movies.",
      ];

      const botMessage = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />

      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6"
          >
            <Bot className="w-16 h-16" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">Movie Buddy 🤖</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your AI-powered movie recommendation assistant. Discover, explore,
            and find your next favorite movie!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Chat */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              {/* Chat Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Chat with Movie Buddy</h2>
                  <p className="text-gray-400 text-sm">
                    Ask me anything about movies!
                  </p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto mb-6 space-y-4 pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-gray-700 text-gray-100 rounded-tl-none"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        {message.sender === "bot" ? (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span className="font-medium">Movie Buddy</span>
                          </>
                        ) : (
                          <span className="font-medium">You</span>
                        )}
                      </div>
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 rounded-2xl rounded-tl-none p-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                        <span className="text-gray-400">
                          Movie Buddy is thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">
                  Try asking:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-sm transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me about movies (e.g., 'Show me action movies')..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-full px-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center space-x-2"
                >
                  <span>Send</span>
                  <Zap className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>What I Can Do</span>
              </h3>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-700/50 rounded-xl p-4 hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{feature.title}</h4>
                        <p className="text-gray-400 text-sm mb-2">
                          {feature.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {feature.examples.map((example, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-800 rounded text-xs"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h4 className="font-bold mb-4">Movie Database</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">10K+</div>
                    <div className="text-sm text-gray-400">Movies</div>
                  </div>
                  <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">
                      20+
                    </div>
                    <div className="text-sm text-gray-400">Genres</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieChatbot;
