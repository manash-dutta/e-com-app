// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRrQ7-hcq5rZfLg6thJYCgH9hYs2WKK1Y",
  authDomain: "e-com-app-buy-busy.firebaseapp.com",
  projectId: "e-com-app-buy-busy",
  storageBucket: "e-com-app-buy-busy.firebasestorage.app",
  messagingSenderId: "864808295323",
  appId: "1:864808295323:web:1c7b12c08591211e901f3e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
