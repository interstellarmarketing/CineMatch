// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxWV2ORJlKSln8aB10m-uPaz5Yk_O_CCc",
  authDomain: "filmnest-gpt.firebaseapp.com",
  projectId: "filmnest-gpt",
  storageBucket: "filmnest-gpt.appspot.com",
  messagingSenderId: "343046538829",
  appId: "1:343046538829:web:7b501919856a186f2e7e04",
  measurementId: "G-01EFPZP1HD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();