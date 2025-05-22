// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_t1j461ArBZIAyoXxhjfrAU2-kXc_Io0",
  authDomain: "nav-store-69fdb.firebaseapp.com",
  projectId: "nav-store-69fdb",
  storageBucket: "nav-store-69fdb.appspot.com",
  messagingSenderId: "186908465473",
  appId: "1:186908465473:web:917d8bab5e217af7c3a9c0",
  measurementId: "G-ZH4B8NKSX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Initialize Analytics conditionally (only in browser)
const initializeAnalytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export { app, db, auth, storage, initializeAnalytics }; 