// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //apiKey: process.env.NEXT_PUBLIC_API_KEY,
  apiKey: process.env.REACT_APP_API_KEY,
  //apiKey: "AIzaSyB4YXoTZD62MosEC6bz9SefJoXmteyzzFs",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);
//export default firebase.initializeApp(firebaseConfig);
export const firebaseInstance = getAuth();
export const authService = getAuth();
export const dbService = getFirestore(app);
export const storageService = getStorage(app);