import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBt3OxogEv1HWoTnn7Gn9ciDVsxQZN1Ev8",
  authDomain: "diplomka-4181f.firebaseapp.com",
  projectId: "diplomka-4181f",
  storageBucket: "diplomka-4181f.firebasestorage.app",
  messagingSenderId: "439550919677",
  appId: "1:439550919677:web:91dc4dacbba9d946e00f94"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
