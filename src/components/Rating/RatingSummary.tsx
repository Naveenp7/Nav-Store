'use client';

import { StarRating } from './StarRating';

interface RatingSummaryProps {
  averageRating: number;
  totalRatings: number;
}

export const RatingSummary = ({ averageRating, totalRatings }: RatingSummaryProps) => {
  // Round to one decimal place
  const roundedRating = Math.round(averageRating * 10) / 10;
  
  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <h3 className="text-lg font-bold mb-2">User Rating</h3>
      
      <div className="flex items-center mb-2">
        <span className="text-3xl font-bold mr-2">{roundedRating}</span>
        <span className="text-gray-500">/ 5</span>
      </div>
      
      <div className="mb-2">
        <StarRating initialRating={roundedRating} readOnly />
      </div>
      
      <p className="text-sm text-gray-500">
        Based on {totalRatings} {totalRatings === 1 ? 'review' : 'reviews'}
      </p>
    </div>
  );
}; 