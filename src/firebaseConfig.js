// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMwQiZE-fGUwzp0QpxHUAcEc-wZ0n-C7A",
  authDomain: "carbon-footprint-d768b.firebaseapp.com",
  projectId: "carbon-footprint-d768b",
  storageBucket: "carbon-footprint-d768b.appspot.com", // Fixed incorrect storageBucket URL
  messagingSenderId: "413217554573",
  appId: "1:413217554573:web:28d3e61ee9176c0f2de2c4",
  measurementId: "G-PKNR2QN5L3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Added Firebase Auth
const analytics = getAnalytics(app);

// ✅ Export Firebase Auth
export { auth, app };
