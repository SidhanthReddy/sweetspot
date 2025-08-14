// src/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  RecaptchaVerifier
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDY6x1_HV4CrhYlwXtCpASlptkApHSiPyI",
  authDomain: "sweetspot-be8f3.firebaseapp.com",
  projectId: "sweetspot-be8f3",
  storageBucket: "sweetspot-be8f3.appspot.com",
  messagingSenderId: "150493765281",
  appId: "1:150493765281:web:81e8d8a135a9739b6b1ae0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Authentication providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

// Configure providers
googleProvider.setCustomParameters({ prompt: 'select_account' });
facebookProvider.setCustomParameters({ display: 'popup' });

export { 
  auth, 
  googleProvider, 
  facebookProvider,
  appleProvider,
  RecaptchaVerifier
}; 