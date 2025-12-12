import { Star } from "lucide-react";

const Rating = ({ 
  rating = 0, 
  max = 10, 
  showNumber = true, 
  size = "sm",
  voteCount = null 
}) => {
  // Convert 0-10 rating to 0-5 stars
  const starRating = (rating / max) * 5;
  
  const sizes = {
    sm: { icon: "w-4 h-4", text: "text-sm" },
    md: { icon: "w-5 h-5", text: "text-base" },
    lg: { icon: "w-6 h-6", text: "text-lg" },
  };

  // Create array of 5 stars
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    let fillPercentage = 0;
    
    if (starRating >= starNumber) {
      fillPercentage = 100; // Fully filled
    } else if (starRating > starNumber - 1) {
      fillPercentage = (starRating - (starNumber - 1)) * 100; // Partially filled
    }
    
    return { id: index, fillPercentage };
  });

  return (
    <div className="flex items-center space-x-2">
      {/* Stars container */}
      <div className="flex" aria-label={`Rating: ${rating.toFixed(1)} out of ${max} stars`}>
        {stars.map((star) => (
          <div key={star.id} className="relative" style={{ width: sizes[size].icon, height: sizes[size].icon }}>
            {/* Background star (gray) */}
            <Star
              className={`absolute top-0 left-0 ${sizes[size].icon} text-gray-500`}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            />
            
            {/* Foreground star (yellow) - clipped based on fill percentage */}
            <div 
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${star.fillPercentage}%` }}
            >
              <Star
                className={`${sizes[size].icon} text-yellow-400`}
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1.5}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Numeric
