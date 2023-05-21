import { collection, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { db, auth } from "./firebase.js";

// Displaying games
const games = [];
const querySnapshot = await getDocs(collection(db, "games"));
querySnapshot.forEach((doc) => {
  games.push({ id: doc.id, ...doc.data() });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    if(user.email === 'martin.pavlakovic1@gmail.com') {
      const gameList = games.map((game) => {
          return `
          <div class="box">
            <img src="${game?.Slika}">
            <div class="p">
              <h2 class="title">${game?.Naslov}  <button class="round-btn delete-game" onclick="deleteGame('${game?.id}')">X</button></h2>
              <p class="genre">${game?.Žanr}</p>
              <div class="price">
                <button class="more-btn ${game?.id}">Učitaj Više</button>
                <p class="price">${game?.Cijena}</p>
              </div>
            </div>
          </div>
          `;
        })
        .join("");
      document.querySelector("#list").insertAdjacentHTML("afterbegin", gameList);
    } else {
      const gameList = games.map((game) => {
        return `
        <div class="box">
          <img src="${game?.Slika}">
          <div class="p">
            <h2 class="title">${game?.Naslov}</h2>
            <p class="genre">${game?.Žanr}</p>
            <div class="price">
              <button class="more-btn ${game?.id}">Učitaj Više</button>
              <p class="price">${game?.Cijena}</p>
            </div>
          </div>
        </div>
        `;
      })
      .join("");
    document.querySelector("#list").insertAdjacentHTML("afterbegin", gameList);
    }
  } else {
    document.querySelector("#list").insertAdjacentHTML("afterbegin", '');
  }
});

const allButtons = [...document.querySelectorAll("button.more-btn")];
allButtons.forEach((el) => {
  el.addEventListener("click", (el) => {
    const divId = el.target.classList[1];
    games.find((el) => {
      if (el.id === divId) {
        window.localStorage.setItem("id", el.id);
      }
    });
    window.location.href = "./detaljnije.html";
  });
});

// Search engine by game title and genre
const searchInput = document.querySelector(".name-filter");
const genreInput = document.querySelector('.genre-filter');
const list = document.querySelector("#list");

searchInput.addEventListener("input", updateList);
genreInput.addEventListener("input", updateList);

function updateList() {
  const nameSearchTerm = searchInput.value.trim().toLowerCase();
  const genreSearchTerm = genreInput.value.trim().toLowerCase();
  
  const filteredGames = games.filter(game => {
    const nameMatch = game.Naslov.toLowerCase().includes(nameSearchTerm);
    const genreMatch = game.Žanr.toLowerCase().includes(genreSearchTerm);
    return nameMatch && genreMatch;
  });
  
  setList(filteredGames);
}

function setList(results) {
  list.innerHTML = results.map(game => `
    <div class="box result-item">
      <img src="${game?.Slika}" alt="${game?.Naslov}">
      <div class="p">
        <h2 class="title">${game?.Naslov} <button class="round-btn delete-game" onclick="deleteGame('${game?.id}')">X</button></h2>
        <p class="genre">${game?.Žanr}</p>
        <div class="price">
          <button class="more-btn ${game?.id}">Read more</button>
          <p class="price">${game?.Cijena}</p>
        </div>
      </div>
    </div>
  `).join("");
  
  list.querySelectorAll(".more-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.classList[1];
      window.localStorage.setItem("id", id);
      window.location.href = "./detaljnije.html";
    });
  });
  
  if (results.length === 0) {
    noResults();
  }
}

window.deleteGame = function(gameId) {
  const gameRef = doc(db, 'games', gameId);
  deleteDoc(gameRef)
    .then(() => {
      alert("Igrica je uspješno uklonjena.")
    })
    .catch((error) => {
      alert('Igrica nije mogla biti uspješno uklonjena');
    });
};