// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyA3H54hNEkuBczNeD-o41rmgsyY-zAZP_w",
  // authDomain: "sunflower-101be.firebaseapp.com",
  // projectId: "sunflower-101be",
  // storageBucket: "sunflower-101be.firebasestorage.app",
  // messagingSenderId: "834220927749",
  // appId: "1:834220927749:web:b1598efdc7132cd66f256c"

  apiKey:import.meta.env.VITE_apiKey, 
  authDomain:import.meta.env.VITE_authDomain,
  projectId:import.meta.env.VITE_projectId,
  storageBucket:import.meta.env.VITE_storageBucket,
  messagingSenderId:import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth