// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "coderspace-dec81.firebaseapp.com",
  projectId: "coderspace-dec81",
  storageBucket: "coderspace-dec81.appspot.com",
  messagingSenderId: "422794861381",
  appId: "1:422794861381:web:bcb6163ac9e69c31bcbc2c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

