// Import Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration (from step 1)
const firebaseConfig = {
  apiKey: "AIzaSyCf6AHTDCKA44hFyCuoVsRiO102tBoSNYo",
  authDomain: "contact-app-2e92f.firebaseapp.com",
  projectId: "contact-app-2e92f",
  storageBucket: "contact-app-2e92f.firebasestorage.app",
  messagingSenderId: "1002142313939",
  appId: "1:1002142313939:web:c2dac56fa648d71e72d326",
  measurementId: "G-SZD6M7FZSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
