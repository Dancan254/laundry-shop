// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from"firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNeGPnIG3A1zuN6plXBjdWzR6ZcQHr0sU",
  authDomain: "laundry-shop-2f4cb.firebaseapp.com",
  projectId: "laundry-shop-2f4cb",
  storageBucket: "laundry-shop-2f4cb.appspot.com",
  messagingSenderId: "495302952805",
  appId: "1:495302952805:web:f1274f1fb99be4f822c38c",
  measurementId: "G-KW07N7H6DR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();

export {auth, db};

