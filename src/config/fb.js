// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut,} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-UTN53HUCiOzs-BfCBcJNWMWsC7Y-tF4",
    authDomain: "dev-tesis.firebaseapp.com",
    projectId: "dev-tesis",
    storageBucket: "dev-tesis.appspot.com",
    messagingSenderId: "231627155537",
    appId: "1:231627155537:web:48822b24e11e22c8c3b070"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


