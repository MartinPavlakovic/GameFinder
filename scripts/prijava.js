import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { auth } from "./firebase.js";

// From login to registration and back
document.getElementById("reg-btn").addEventListener("click", function () {
  document.getElementById("register-div").style.display = "inline";
  document.getElementById("login-div").style.display = "none";
});

document.getElementById("log-btn").addEventListener("click", function () {
  document.getElementById("register-div").style.display = "none";
  document.getElementById("login-div").style.display = "inline";
});

// Login
document.getElementById("login-btn").addEventListener("click", function () {
  const loginEmail = document.getElementById("login-email").value;
  const loginPassword = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      document.getElementById("result-box").style.display = "inline";
      document.getElementById("login-div").style.display = "none";
      document.getElementById("result").innerHTML =
        "Dobrodošli!<br>" +
        userCredential.user.email +
        "  je uspješno logiran.";
    })
    .catch((error) => {
      alert("Krivo korisničko ime ili lozinka.");
      console.log(error);
    });
});

// Registration
document.getElementById("register-btn").addEventListener("click", function () {
  const registerEmail = document.getElementById("register-email").value;
  const registerPassword = document.getElementById("register-password").value;

  createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    .then((userCredential) => {
      document.getElementById("result-box").style.display = "inline";
      document.getElementById("register-div").style.display = "none";
      document.getElementById("result").innerHTML =
        "Dobrodošli<br>" + registerEmail + " je uspješno registriran.";
    })
    .catch((error) => {
      alert("Lozinka mora sadržavati najmanje 6 znakova.");
      console.log(error);
    });
});
