import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAdlEEONZ57OgPjxVgrcgohEwDbESI6088",
  authDomain: "facegram-22.firebaseapp.com",
  projectId: "facegram-22",
  storageBucket: "facegram-22.appspot.com",
  messagingSenderId: "847915840754",
  appId: "1:847915840754:web:c9fe5ede0a366e6f670c6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
