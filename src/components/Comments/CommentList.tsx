'use client';

import { useEffect, useState } from 'react';
import { Comment } from '@/types';
import { listenToComments } from '@/services/ratingService';
import { StarRating } from '@/components/Rating/StarRating';
import { FaUserCircle } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

interface CommentListProps {
  projectId: string;
}

export const CommentList = ({ projectId }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToComments(projectId, (newComments) => {
      setComments(newComments);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No reviews yet. Be the first to review this app!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-start">
            <div className="mr-3">
              {comment.userAvatar ? (
                <img 
                  src={comment.userAvatar} 
                  alt={comment.userName} 
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                <h4 className="font-medium text-gray-800">{comment.userName}</h4>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
              </div>
              <div className="mb-2">
                <StarRating initialRating={comment.rating} readOnly size={16} />
              </div>
              <p className="text-gray-600 text-sm">{comment.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 