// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkww01G-JDPVZuSjYUEHPKU0c43_3C_x4",
  authDomain: "mychat-d748d.firebaseapp.com",
  projectId: "mychat-d748d",
  storageBucket: "mychat-d748d.appspot.com",
  messagingSenderId: "75303534716",
  appId: "1:75303534716:web:6b1126e0c32e4ff8a889f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig