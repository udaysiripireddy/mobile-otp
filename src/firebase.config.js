import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider } from 'firebase/auth';
 
const firebaseConfig = {
  apiKey: "AIzaSyCbFNb1_SGdzznp2Mye6riYnA0KiF6n_uU",
  authDomain: "mobile-otp-f8a47.firebaseapp.com",
  projectId: "mobile-otp-f8a47",
  storageBucket: "mobile-otp-f8a47.appspot.com",
  messagingSenderId: "79296454510",
  appId: "1:79296454510:web:0ee855df7a64b66fb8ab7f",
  measurementId: "G-HHYNGTD7YF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export { RecaptchaVerifier, signInWithPhoneNumber ,PhoneAuthProvider };