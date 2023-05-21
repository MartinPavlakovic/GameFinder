import { db, doc, getDoc } from "./firebase.js";

const docRef = doc(db, "games", localStorage.id);
const docSnap = await getDoc(docRef);
const game = docSnap.data();

const html = `
    <div class="item">
      <div class="picture-video">
        <img src="${game.Slika1}">
        <iframe width="560" height="315" src="${game.Video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <div>
        <h1>${game.Naslov}</h2> 
        <h2>Žanr</h2>
        <p class="description">${game.Žanr}</p> 
        <h2>Developer</h2>
        <p class="description">${game.Developer}</p> 
        <h2>Izdavač</h2>
        <p class="description">${game.Izdavač}</p> 
        <h2>Datum Izlaska</h2>
        <p class="description">${game.DatumIzlaska}</p> 
        <h2>Cijena</h2>
        <p class="description">${game.Cijena}</p> 
        <h2>Opis</h2>
        <p class="description" id="description">${game.Opis}</p> 
        <h2>Poveznica</h2>
        <a href="${game.Poveznica}"><p class="description" id="description">${game.Poveznica}</p></a>
      </div>
    </div>
    `;

document.querySelector("#item").insertAdjacentHTML("afterbegin", html);
