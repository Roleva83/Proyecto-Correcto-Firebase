// main.tsx - Punto de entrada de la aplicación
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC04VBuPFf47I5_wfJij-XM28eEShsQsXc",
  authDomain: "lola-ai-j1cmn.firebaseapp.com",
  projectId: "lola-ai-j1cmn",
  storageBucket: "lola-ai-j1cmn.firebasestorage.app",
  messagingSenderId: "996350649746",
  appId: "1:996350649746:web:33371287f654955dc84d4b",
  measurementId: "G-NZD96WHJN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);