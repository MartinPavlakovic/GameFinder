import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, doc, getDoc, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAn_jaUGEdY_rH2cNeZamULB9Pf28oFdsI",
  authDomain: "form-login-2c72b.firebaseapp.com",
  projectId: "form-login-2c72b",
  storageBucket: "form-login-2c72b.appspot.com",
  messagingSenderId: "600916118040",
  appId: "1:600916118040:web:9d6d4eadf2232e862cd16d",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export { auth, db, doc, getDoc };
