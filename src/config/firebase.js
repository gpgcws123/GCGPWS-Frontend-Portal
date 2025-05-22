import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1fakWkTJjsc0-nK-AiQtulBHauSgr8pY",
  authDomain: "gpgcws-eeedf.firebaseapp.com",
  projectId: "gpgcws-eeedf",
  storageBucket: "gpgcws-eeedf.firebasestorage.app",
  messagingSenderId: "797829480716",
  appId: "1:797829480716:web:200c404e9d581762238929",
  measurementId: "G-32DMDP3XW9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { db, analytics, storage };