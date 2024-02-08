import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOKtISDz0s13JtzjGMw3F_Dy86yI3OF9k",
  authDomain: "post-job-1bbe7.firebaseapp.com",
  projectId: "post-job-1bbe7",
  storageBucket: "post-job-1bbe7.appspot.com",
  messagingSenderId: "1076640797554",
  appId: "1:1076640797554:web:f61155c1752e4a236f03eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
