// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB7akrdII9YCGN9oG29SCCLKyFDYA_FuN0",

  authDomain: "shiki-no-journey.firebaseapp.com",

  projectId: "shiki-no-journey",

  storageBucket: "shiki-no-journey.appspot.com",

  messagingSenderId: "550419442068",

  appId: "1:550419442068:web:275165d26e02896a714781",

  measurementId: "G-EPGXNV9KCV",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

//Authentication setup
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
auth.useDeviceLanguage(); // set authentication language to user preference
