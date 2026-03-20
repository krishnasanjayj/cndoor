import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgRnYs66vfgtal_L3BHMIaeeUjrgXU_fM",
  authDomain: "cndoor.firebaseapp.com",
  projectId: "cndoor",
  storageBucket: "cndoor.firebasestorage.app",
  messagingSenderId: "49262880132",
  appId: "1:49262880132:web:113becdf78a90ffbcda9d1",
  measurementId: "G-NL22V8STKD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
