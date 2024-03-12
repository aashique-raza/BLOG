


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-68c3f.firebaseapp.com",
  projectId: "blog-68c3f",
  storageBucket: "blog-68c3f.appspot.com",
  messagingSenderId: "133870705531",
  appId: "1:133870705531:web:3274dbdbce3a1fc58bbbde"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);