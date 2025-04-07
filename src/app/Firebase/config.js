import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3uC9CXmcYl0L8Qeh5hYYsQZWsymLWFBw",
  authDomain: "youtub-1946e.firebaseapp.com",
  databaseURL: "https://youtub-1946e-default-rtdb.firebaseio.com",
  projectId: "youtub-1946e",
  storageBucket: "youtub-1946e.firebasestorage.app",
  messagingSenderId: "619241648818",
  appId: "1:619241648818:web:178d23fa604f90e6ff4fab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
export { db };
export const database = getDatabase(app);








