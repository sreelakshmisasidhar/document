import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  
    apiKey: "AIzaSyDB0Ve5NbZdc1s7C0u--4LA1VDMfBSVj9I",
    authDomain: "doc-75e08.firebaseapp.com",
    projectId: "doc-75e08",
    storageBucket: "doc-75e08.appspot.com",
    messagingSenderId: "1070639871482",
    appId: "1:1070639871482:web:8b30c752bbf07575e46043"
  };


export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)