import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpvX2uVjpFeF29Fk8NgBDCL9FPwZsTTWM",
  authDomain: "advanced-virtual-interns-90e2e.firebaseapp.com",
  projectId: "advanced-virtual-interns-90e2e",
  storageBucket: "advanced-virtual-interns-90e2e.firebasestorage.app",
  messagingSenderId: "747937310275",
  appId: "1:747937310275:web:d2a5b097a12a85b43196f6",
  measurementId: "G-GRQE0XCZDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();