import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1fakWkTJjsc0-nK-AiQtulBHauSgr8pY",
  authDomain: "gpgcws-eeedf.firebaseapp.com",
  projectId: "gpgcws-eeedf",
  storageBucket: "gpgcws-eeedf.firebasestorage.app",
  messagingSenderId: "797829480716",
  appId: "1:797829480716:web:200c404e9d581762238929",
  measurementId: "G-32DMDP3XW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, analytics, storage, auth };