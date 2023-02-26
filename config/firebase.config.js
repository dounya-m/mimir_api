// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbsee-evtzHyu6PVL0OSN5oJw8Avk1Ybo",
  authDomain: "mimir-178fa.firebaseapp.com",
  projectId: "mimir-178fa",
  storageBucket: "mimir-178fa.appspot.com",
  messagingSenderId: "8113362884",
  appId: "1:8113362884:web:b298483c7a979e8b1eb691",
  measurementId: "G-6BX8ZNWLV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);