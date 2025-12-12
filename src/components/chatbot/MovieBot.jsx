import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Film,
  Clock,
  Star,
  Globe,
  ThumbsUp,
  TrendingUp,
  Sparkles,
  Search,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MovieBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        text: "🎬 Hi! I'm your Movie Buddy! I can help you discover amazing movies. What kind of movies are you looking for?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Quick reply options
  const quickReplies = [
    { text: "🎭 Action movies", emoji: "💥" },
    { text: "😂 Comedy movies", emoji: "😄" },
    { text: "💖 Romantic movies", emoji: "❤️" },
    { text: "🔍 Thriller movies", emoji: "😱" },
    { text: "🧠 Sci-Fi movies", emoji: "👽" },
    { text: "🎪 Drama movies", emoji: "🎭" },
    { text: "Trending now", emoji: "🔥" },
    { text: "Top rated", emoji: "⭐" },
  ];

  // Movie genre mapping
  const genreMap = {
    action: 28,
    comedy: 35,
    romantic: 10749,
    romance: 10749,
    thriller: 53,
    scifi: 878,
    "science fiction": 878,
    drama: 18,
    horror: 27,
    adventure: 12,
    animation: 16,
    fantasy: 14,
    mystery: 9648,
    crime: 80,
    documentary: 99,
  };

  // Simulate typing delay
  const simulateTyping = async (callback) => {
    setIsTyping(true);
    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 500)
    );
    setIsTyping(false);
    callback();
  };

  // Process user input and generate response
  const processInput = async (userInput) => {
    const lowerInput = userInput.toLowerCase();

    let response = {
      text: "",
      action: null,
      data: null,
    };

    // Check for greetings
    if (/(hi|hello|hey|greetings)/.test(lowerInput)) {
      response.text = "Hello there! 👋 Ready to explore some amazing movies?";
    }
    // Check for genre requests
    else if (
      /(action|comedy|romantic|thriller|scifi|drama|horror|adventure)/.test(
        lowerInput
      )
    ) {
      const matchedGenres = Object.keys(genreMap).filter((genre) =>
        lowerInput.includes(genre)
      );

      if (matchedGenres.length > 0) {
        const genre = matchedGenres[0];
        const genreId = genreMap[genre];
        const genreName = genre.charAt(0).toUpperCase() + genre.slice(1);

        response.text = `Great choice! 🎬 I'll show you some awesome ${genreName} movies.`;
        response.action = "navigate";
        response.data = {
          type: "genre",
          genreId,
          genreName,
          path: `/genre/${genreId}`,
        };
      }
    }
    // Check for trending/trending now
    else if (/(trending|popular|hot)/.test(lowerInput)) {
      response.text =
        "🔥 Here are the trending movies everyone's watching right now!";
      response.action = "navigate";
      response.data = {
        type: "category",
        category: "trending",
        path: "/?category=trending",
      };
    }
    // Check for top rated
    else if (/(top rated|best|highest rated)/.test(lowerInput)) {
      response.text = "⭐ These are the highest rated movies of all time!";
      response.action = "navigate";
      response.data = {
        type: "category",
        category: "top_rated",
        path: "/?category=top_rated",
      };
    }
    // Check for new/upcoming
    else if (/(new|upcoming|latest|recent)/.test(lowerInput)) {
      response.text =
        "🎉 Check out these upcoming movies that will be released soon!";
      response.action = "navigate";
      response.data = {
        type: "category",
        category: "upcoming",
        path: "/?category=upcoming",
      };
    }
    // Check for search
    else if (/(search|find|look for)/.test(lowerInput)) {
      const searchQuery = userInput
        .replace(/(search|find|look for)/i, "")
        .trim();
      if (searchQuery) {
        response.text = `🔍 Searching for movies related to "${searchQuery}"...`;
        response.action = "search";
        response.data = { query: searchQuery };
      } else {
        response.text = "What movie would you like me to search for?";
      }
    }
    // Check for help
    else if (/(help|what can you do|how to use)/.test(lowerInput)) {
      response.text =
        "I can help you:\n\n🎭 Find movies by genre (action, comedy, romance, etc.)\n🔥 Discover trending movies\n⭐ Show top rated movies\n🎉 Find upcoming releases\n🔍 Search for specific movies\n\nJust tell me what you're looking for!";
    }
    // Default fallback
    else {
      response.text =
        "I can help you find great movies! Try asking for:\n• Action movies 🎬\n• Comedy movies 😂\n• Trending movies 🔥\n• Top rated movies ⭐\n• Or search for a specific movie!";
    }

    return response;
  };

  // Handle send message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");

    // Process and get bot response
    simulateTyping(async () => {
      const botResponse = await processInput(userInput);

      const botMessage = {
        id: messages.length + 2,
        text: botResponse.text,
        sender: "bot",
        timestamp: new Date(),
        action: botResponse.action,
        data: botResponse.data,
      };

      setMessages((prev) => [...prev, botMessage]);

      // Handle actions
      if (botResponse.action === "navigate") {
        setTimeout(() => {
          navigate(botResponse.data.path);
          setIsOpen(false);
        }, 1500);
      } else if (botResponse.action === "search") {
        setTimeout(() => {
          navigate(`/search?q=${encodeURIComponent(botResponse.data.query)}`);
          setIsOpen(false);
        }, 1500);
      }
    });
  };

  // Handle quick reply click
  const handleQuickReply = (text) => {
    setInput(text);
    setTimeout(() => handleSend(), 100);
  };

  // Handle enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          💬
        </span>
      </motion.button>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-700 to-purple-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-full">
                      <Bot className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        Movie Buddy
                      </h3>
                      <p className="text-blue-200 text-sm">
                        Your personal movie guide
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-900">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-gray-800 text-gray-100 rounded-tl-none"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === "bot" ? (
                          <Bot className="w-4 h-4" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                        <span className="text-xs opacity-75">
                          {message.sender === "bot" ? "Movie Buddy" : "You"}
                        </span>
                      </div>
                      <p className="whitespace-pre-line">{message.text}</p>

                      {/* Show loading indicator for bot messages with actions */}
                      {message.sender === "bot" && message.action && (
                        <div className="mt-2 flex items-center space-x-2 text-xs text-blue-300">
                          <Sparkles className="w-3 h-3 animate-spin" />
                          <span>Taking you there...</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 rounded-2xl rounded-tl-none p-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">
                          Movie Buddy is typing...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-4 pb-3">
                <div className="flex flex-wrap gap-2 mb-3">
                  {quickReplies.slice(0, 4).map((reply, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickReply(reply.text)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm rounded-full border border-gray-700 transition-colors flex items-center space-x-1"
                    >
                      <span>{reply.emoji}</span>
                      <span>{reply.text.split(" ")[0]}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-800 bg-gray-900">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about movies (e.g., 'Show me action movies')..."
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>

                {/* Tips */}
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Try: "trending movies" • "comedy" • "search for Inception"
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MovieBot;
