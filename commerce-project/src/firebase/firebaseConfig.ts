import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoQQ2J963Mh-ZyCqZXtQr_C3-6pP8zPQQ",
  authDomain: "commerce-2b18a.firebaseapp.com",
  projectId: "commerce-2b18a",
  storageBucket: "commerce-2b18a.firebasestorage.app",
  messagingSenderId: "657474924881",
  appId: "1:657474924881:web:8f03aaa6285e1340856370",
  measurementId: "G-WQQ0S46PSM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
