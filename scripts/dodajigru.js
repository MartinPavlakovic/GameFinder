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
    Opis: createForm["Opis"].value,
    Video: createForm["Video"].value,
    Poveznica: createForm["Poveznica"].value,
    Slika: createForm["NaslovnaSlika"].value,
    Slika1: createForm["GlavnaSlika"].value,
  };

  await addDoc(collection(db, "games"), gameData).then(() => {
    alert("Igrica je uspješno dodana.");
    createForm.reset();
  });
});
