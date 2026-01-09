import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// NR Collection Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOQjbLiHL8vjjzJ_gMWbFN9Vp10mQb7rk",
    authDomain: "nr-collection.firebaseapp.com",
    projectId: "nr-collection",
    storageBucket: "nr-collection.firebasestorage.app",
    messagingSenderId: "1020441527294",
    appId: "1:1020441527294:web:e2e348ecbd69a11f0076af",
    measurementId: "G-BMS2QKB8YN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Analytics (optional)
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { db, analytics };
