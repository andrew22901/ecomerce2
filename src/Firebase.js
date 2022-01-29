// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBKburYRO-rnyeMVr3BLnRcHeORL3HseXM",
  authDomain: "streetwear-13121.firebaseapp.com",
  projectId: "streetwear-13121",
  storageBucket: "streetwear-13121.appspot.com",
  messagingSenderId: "193085662205",
  appId: "1:193085662205:web:ab87cfe4da562551f2ef94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;