
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDhKNpY7T9ks51iqF1JRizq0x92G2bkgsU",
  authDomain: "ecobreathdatabase.firebaseapp.com",
  projectId: "ecobreathdatabase",
  storageBucket: "ecobreathdatabase.firebasestorage.app",
  messagingSenderId: "441862536106",
  appId: "1:441862536106:web:0c09f7560aab54b54289d3",
  measurementId: "G-KC56S187ME"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {auth};