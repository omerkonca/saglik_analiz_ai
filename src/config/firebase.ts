import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQ7bqXOFfpDiEXWWeHjWfKyfRQL7LG6YM",
  authDomain: "saglik-analiz-ai.firebaseapp.com",
  projectId: "saglik-analiz-ai",
  storageBucket: "saglik-analiz-ai.appspot.com",
  messagingSenderId: "551302278873",
  appId: "1:551302278873:web:8d9b9b9b9b9b9b9b9b9b9b"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth ve Firestore servislerini al
export const auth = getAuth(app);
export const db = getFirestore(app);
