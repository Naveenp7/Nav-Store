import { auth, db } from '@/utils/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { User } from '@/types';

// Sign up with email and password
export const signUp = async (
  email: string, 
  password: string, 
  name: string
): Promise<User> => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Update profile with display name
    await updateProfile(firebaseUser, {
      displayName: name
    });
    
    // Create user document in Firestore
    const userData = {
      id: firebaseUser.uid,
      name: name,
      email: email,
      avatar: firebaseUser.photoURL || null,
      createdAt: serverTimestamp()
    };
    
    await setDoc(doc(db, 'users', firebaseUser.uid), userData);
    
    return {
      id: firebaseUser.uid,
      name: name,
      email: email,
      avatar: firebaseUser.photoURL || undefined,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        id: firebaseUser.uid,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        createdAt: userData.createdAt?.toDate?.() 
          ? userData.createdAt.toDate().toISOString() 
          : new Date().toISOString(),
        updatedAt: userData.updatedAt?.toDate?.() 
          ? userData.updatedAt.toDate().toISOString() 
          : undefined
      };
    } else {
      // Create user document if it doesn't exist
      const userData = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email || '',
        avatar: firebaseUser.photoURL || null,
        createdAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      
      return {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email || '',
        avatar: firebaseUser.photoURL || undefined,
        createdAt: new Date().toISOString()
      };
    }
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const firebaseUser = userCredential.user;
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    if (!userDoc.exists()) {
      // Create user document if it doesn't exist
      const userData = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'Google User',
        email: firebaseUser.email || '',
        avatar: firebaseUser.photoURL || null,
        createdAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
    }
    
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'Google User',
      email: firebaseUser.email || '',
      avatar: firebaseUser.photoURL || undefined,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  const firebaseUser = auth.currentUser;
  
  if (!firebaseUser) {
    return null;
  }
  
  try {
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        id: firebaseUser.uid,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        createdAt: userData.createdAt?.toDate?.() 
          ? userData.createdAt.toDate().toISOString() 
          : new Date().toISOString(),
        updatedAt: userData.updatedAt?.toDate?.() 
          ? userData.updatedAt.toDate().toISOString() 
          : undefined
      };
    } else {
      return {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email || '',
        avatar: firebaseUser.photoURL || undefined,
        createdAt: new Date().toISOString()
      };
    }
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void): (() => void) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          callback({
            id: firebaseUser.uid,
            name: userData.name,
            email: userData.email,
            avatar: userData.avatar,
            createdAt: userData.createdAt?.toDate?.() 
              ? userData.createdAt.toDate().toISOString() 
              : new Date().toISOString(),
            updatedAt: userData.updatedAt?.toDate?.() 
              ? userData.updatedAt.toDate().toISOString() 
              : undefined
          });
        } else {
          callback({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'User',
            email: firebaseUser.email || '',
            avatar: firebaseUser.photoURL || undefined,
            createdAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        callback(null);
      }
    } else {
      callback(null);
    }
  });
}; 