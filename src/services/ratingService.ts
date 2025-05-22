import { db } from '@/utils/firebase';
import { collection, addDoc, doc, updateDoc, getDoc, getDocs, query, where, orderBy, deleteDoc, onSnapshot, Timestamp, serverTimestamp } from 'firebase/firestore';
import { Comment } from '@/types';

// Add a new comment and rating
export const addComment = async (
  projectId: string,
  userId: string,
  userName: string,
  userAvatar: string | null,
  text: string,
  rating: number
): Promise<string> => {
  try {
    // Create comment document
    const commentsCollection = collection(db, 'projects', projectId, 'comments');
    const commentData = {
      userId,
      userName,
      userAvatar: userAvatar || null,
      text,
      rating,
      createdAt: serverTimestamp()
    };
    
    const commentRef = await addDoc(commentsCollection, commentData);
    
    // Update project's average rating
    await updateProjectRating(projectId);
    
    return commentRef.id;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// Update a comment
export const updateComment = async (
  projectId: string,
  commentId: string,
  text: string,
  rating: number
): Promise<void> => {
  try {
    const commentRef = doc(db, 'projects', projectId, 'comments', commentId);
    await updateDoc(commentRef, {
      text,
      rating,
      updatedAt: serverTimestamp()
    });
    
    // Update project's average rating
    await updateProjectRating(projectId);
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (
  projectId: string,
  commentId: string
): Promise<void> => {
  try {
    const commentRef = doc(db, 'projects', projectId, 'comments', commentId);
    await deleteDoc(commentRef);
    
    // Update project's average rating
    await updateProjectRating(projectId);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

// Get all comments for a project
export const getComments = async (projectId: string): Promise<Comment[]> => {
  try {
    const commentsCollection = collection(db, 'projects', projectId, 'comments');
    const commentsQuery = query(commentsCollection, orderBy('createdAt', 'desc'));
    const commentsSnapshot = await getDocs(commentsQuery);
    
    return commentsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        userName: data.userName,
        userAvatar: data.userAvatar,
        text: data.text,
        rating: data.rating,
        createdAt: data.createdAt?.toDate?.() 
          ? data.createdAt.toDate().toISOString() 
          : new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.() 
          ? data.updatedAt.toDate().toISOString() 
          : undefined
      } as Comment;
    });
  } catch (error) {
    console.error('Error getting comments:', error);
    return [];
  }
};

// Listen to comments for a project in real-time
export const listenToComments = (
  projectId: string,
  callback: (comments: Comment[]) => void
) => {
  try {
    const commentsCollection = collection(db, 'projects', projectId, 'comments');
    const commentsQuery = query(commentsCollection, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(
      commentsQuery,
      (snapshot) => {
        const comments = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: data.userId,
            userName: data.userName,
            userAvatar: data.userAvatar,
            text: data.text,
            rating: data.rating,
            createdAt: data.createdAt?.toDate?.() 
              ? data.createdAt.toDate().toISOString() 
              : new Date().toISOString(),
            updatedAt: data.updatedAt?.toDate?.() 
              ? data.updatedAt.toDate().toISOString() 
              : undefined
          } as Comment;
        });
        
        callback(comments);
      },
      (error) => {
        console.error('Error in comments listener:', error);
        callback([]);
      }
    );
    
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up comments listener:', error);
    return () => {};
  }
};

// Update project's average rating based on all comments
export const updateProjectRating = async (projectId: string): Promise<void> => {
  try {
    const commentsCollection = collection(db, 'projects', projectId, 'comments');
    const commentsSnapshot = await getDocs(commentsCollection);
    
    let totalRating = 0;
    const totalComments = commentsSnapshot.size;
    
    // Calculate total rating
    commentsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      totalRating += data.rating || 0;
    });
    
    // Calculate average rating
    const averageRating = totalComments > 0 ? totalRating / totalComments : 0;
    
    // Update project document with new rating data
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, {
      averageRating,
      totalRatings: totalComments,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating project rating:', error);
    throw error;
  }
}; 