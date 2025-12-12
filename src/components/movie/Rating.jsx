import { Star } from "lucide-react";

const Rating = ({ rating = 0, max = 10, showNumber = true, size = "sm" }) => {
  // Calculate percentage based on max rating
  const percentage = (rating / max) * 100;

  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div
      className="flex items-center space-x-2"
      aria-label={`Rating: ${rating} out of ${max}`}
    >
      {/* Stars container */}
      <div className="relative flex items-center">
        {/* Background stars (gray) */}
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={`bg-${star}`}
              className={`${sizes[size]} text-gray-500`}
              fill="currentColor"
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Foreground stars (yellow) */}
        <div
          className="absolute top-0 left-0 overflow-hidden"
          style={{ width: `${percentage}%` }}
        >
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={`fg-${star}`}
                className={`${sizes[size]} text-yellow-400`}
                fill="currentColor"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Numeric rating */}
      {showNumber && (
        <span className="text-white font-medium text-sm">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;
