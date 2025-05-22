'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { StarRating } from '@/components/Rating/StarRating';
import { addComment } from '@/services/ratingService';

interface CommentFormProps {
  projectId: string;
  onCommentAdded?: () => void;
}

export const CommentForm = ({ projectId, onCommentAdded }: CommentFormProps) => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    
    if (comment.trim() === '') {
      setError('Please enter a comment');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      await addComment(
        projectId,
        user.id,
        user.name,
        user.avatar || null,
        comment,
        rating
      );
      
      setComment('');
      setRating(5);
      
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (err) {
      setError('Failed to add comment. Please try again.');
      console.error('Error adding comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-bold mb-3">Leave a Review</h3>
      
      {showLoginPrompt && !user ? (
        <div className="bg-blue-50 text-blue-700 p-3 rounded-md mb-4">
          <p>Please sign in to leave a review.</p>
          <button 
            className="mt-2 text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-md transition-colors"
            onClick={() => setShowLoginPrompt(false)}
          >
            Sign In
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <StarRating 
              initialRating={rating} 
              onChange={setRating} 
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <textarea
              id="comment"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this app..."
              disabled={isSubmitting}
            />
          </div>
          
          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  );
}; 