import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { db } from "./firebase.js";

const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const gameData = {
    Naslov: createForm["Naslov"].value,
    Žanr: createForm["Žanr"].value,
    Developer: createForm["Developer"].value,
    Izdavač: createForm["Izdavač"].value,
    DatumIzlaska: createForm["DatumIzlaska"].value,
    Cijena: createForm["Cijena"].value,
    Opis: createForm["Poveznica"].value,
    Poveznica: createForm["Video"].value,
    Video: createForm["Opis"].value,
    Slika1: createForm["GlavnaSlika"].value,
    Slika: createForm["NaslovnaSlika"].value,
  };

  await addDoc(collection(db, "games"), gameData).then(() => {
    alert("Igrica je uspješno dodana.");
    createForm.reset();
  });
});
