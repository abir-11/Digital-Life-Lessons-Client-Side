// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtA9hhxcDjy3rqNMoyL6ue2fZPTQxZQos",
  authDomain: "digital-life-lessons-145b8.firebaseapp.com",
  projectId: "digital-life-lessons-145b8",
  storageBucket: "digital-life-lessons-145b8.firebasestorage.app",
  messagingSenderId: "389820103082",
  appId: "1:389820103082:web:9aed017273a7478a3ed3d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);