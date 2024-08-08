// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEPzAfdi4sGsOtoHvAB7N9unCmCBu21og",
  authDomain: "whatsapp-chat-clone-227a1.firebaseapp.com",
  projectId: "whatsapp-chat-clone-227a1",
  storageBucket: "whatsapp-chat-clone-227a1.appspot.com",
  messagingSenderId: "174966914427",
  appId: "1:174966914427:web:6941178dbaedd6392611de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore()
export const storage = getStorage()