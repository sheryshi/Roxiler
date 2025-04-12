
import React from "react";
import { Star } from "lucide-react";

interface RatingDisplayProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({ 
  rating, 
  maxRating = 5,
  size = "md" 
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7;
  const hasFullStar = rating % 1 > 0.7;
  
  const filledStars = fullStars + (hasFullStar ? 1 : 0);
  const halfStar = hasHalfStar ? 1 : 0;
  const emptyStars = maxRating - filledStars - halfStar;

  // Size configurations
  const sizeConfig = {
    sm: { starSize: 12, className: "gap-0.5" },
    md: { starSize: 16, className: "gap-1" },
    lg: { starSize: 20, className: "gap-1.5" }
  };

  const { starSize, className } = sizeConfig[size];

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(filledStars)].map((_, i) => (
        <Star
          key={`filled-${i}`}
          size={starSize}
          className="fill-yellow-400 text-yellow-400"
        />
      ))}
      
      {hasHalfStar && (
        <div className="relative">
          <Star
            size={starSize}
            className="text-gray-300"
          />
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
            <Star
              size={starSize}
              className="fill-yellow-400 text-yellow-400"
            />
          </div>
        </div>
      )}
      
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={starSize}
          className="text-gray-300"
        />
      ))}
      
      <span className="ml-1.5 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};
