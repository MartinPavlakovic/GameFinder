import { onAuthStateChanged, signOut, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { auth } from "./firebase.js";


const accountDetails = document.querySelector('.account-details');
const loggedInElements = document.querySelectorAll('.logged-in');
const loggedOutElements = document.querySelectorAll('.logged-out');
const deleteGame = document.querySelectorAll('.delete-game');

onAuthStateChanged(auth, (user) => {

  if (user) {
    loggedInElements.forEach(element => element.style.display = 'inline');
    loggedOutElements.forEach(element => element.style.display = 'none');
    if(window.location.pathname === '/GameFinder/profil.html') {
      const messageToUser = `
        <div>Prijavljen si kao ${user?.email}</div>
      `;
      accountDetails.innerHTML = messageToUser;
    }
    
    if(user.email === 'martin.pavlakovic1@gmail.com') {
      document.getElementById("add-game").style.display ="inline";
      deleteGame.forEach(element => element.style.display = 'inline');
    } else {
      document.getElementById("add-game").style.display ="none";
      deleteGame.forEach(element => element.style.display = 'none');
    }


  } else {
    if(window.location.pathname === '/GameFinder/profil.html') {
      accountDetails.innerHTML = '';
    }
    loggedInElements.forEach(element => element.style.display = 'none');
    loggedOutElements.forEach(element => element.style.display = 'inline');
  }
});
// Logout
document.getElementById("log-out-btn").addEventListener("click", function () {
  alert("Uspješno ste odjavljeni.");
  signOut(auth);
});
