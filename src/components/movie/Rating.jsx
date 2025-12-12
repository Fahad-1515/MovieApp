import { Star } from "lucide-react";

const Rating = ({ rating = 0, max = 10, showNumber = true, size = "sm" }) => {
  // Calculate percentage based on max rating
  const percentage = (rating / max) * 100;
  
  // Calculate how many full stars and partial star
  const fullStars = Math.floor(percentage / 20);
  const partialStar = (percentage % 20) / 20;

  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div
      className="flex items-center space-x-2"
      aria-label={`Rating: ${rating.toFixed(1)} out of ${max}`}
    >
      {/* Stars container */}
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          // Determine if star is full, partial, or empty
          let fillPercentage = 0;
          if (starIndex <= fullStars) {
            fillPercentage = 100; // Full star
          } else if (starIndex === fullStars + 1 && partialStar > 0) {
            fillPercentage = partialStar * 100; // Partial star
          }

          return (
            <div key={starIndex} className="relative">
              {/* Background star (gray) */}
              <Star
                className={`${sizes[size]} text-gray-500`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              
              {/* Foreground star (yellow) - clipped based on fill percentage */}
              {fillPercentage > 0 && (
                <div 
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${fillPercentage}%` }}
                >
                  <Star
                    className={`${sizes[size]} text-yellow-400`}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          );
        })}
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
