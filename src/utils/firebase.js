// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiRVfyoXVWp4u-oSD1LJOWylfckA4DY38",
  authDomain: "cinematch-2b345.firebaseapp.com",
  projectId: "cinematch-2b345",
  storageBucket: "cinematch-2b345.firebasestorage.app",
  messagingSenderId: "429166648472",
  appId: "1:429166648472:web:a9d08820597d058d7544ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();