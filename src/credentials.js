// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfHwYGosLWs0q6r0goKr-DhdIrLJySu8Y",
  authDomain: "ambiencemusic-smirlian.firebaseapp.com",
  projectId: "ambiencemusic-smirlian",
  storageBucket: "ambiencemusic-smirlian.appspot.com",
  messagingSenderId: "363544517376",
  appId: "1:363544517376:web:cf990733d200358d2e31e5"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);