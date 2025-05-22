'use client';

import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  initialRating?: number;
  totalStars?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
}

export const StarRating = ({
  initialRating = 0,
  totalStars = 5,
  onChange,
  readOnly = false,
  size = 24,
  activeColor = '#ff8a00',
  inactiveColor = '#e4e5e9'
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleClick = (selectedRating: number) => {
    if (readOnly) return;
    
    setRating(selectedRating);
    if (onChange) {
      onChange(selectedRating);
    }
  };

  const handleMouseEnter = (starIndex: number) => {
    if (readOnly) return;
    setHover(starIndex);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHover(null);
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isActive = (hover !== null ? starValue <= hover : starValue <= rating);
        
        return (
          <span
            key={index}
            className={`cursor-${readOnly ? 'default' : 'pointer'} transition-colors duration-200 mr-1`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            style={{ color: isActive ? activeColor : inactiveColor }}
          >
            <FaStar size={size} />
          </span>
        );
      })}
    </div>
  );
}; 