import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCLLKP-tQEAtLew8DxZkGYa7vTr4JkMCYo",
  authDomain: "auth-skillbridge.firebaseapp.com",
  projectId: "auth-skillbridge",
  storageBucket: "auth-skillbridge.appspot.com",
  messagingSenderId: "343557030387",
  appId: "1:343557030387:web:7291fee2d8635b848bd286",
  measurementId: "G-GRGXYC27GM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Set auth persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth, db, storage, analytics, app };