// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZBSXUCSy2od4YMwDnj7pCoxvxSpaQ6VA",
  authDomain: "flashcard-saas-5d088.firebaseapp.com",
  projectId: "flashcard-saas-5d088",
  storageBucket: "flashcard-saas-5d088.appspot.com",
  messagingSenderId: "961681056071",
  appId: "1:961681056071:web:ec0fc3d444af3a21deec62",
  measurementId: "G-8FGRNCS954"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export {db}