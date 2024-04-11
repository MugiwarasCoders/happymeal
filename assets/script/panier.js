document.addEventListener("DOMContentLoaded", function () {
  fetch('data.json')
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      const ulElement = document.getElementById("ingredients-list");
      let ingredients = "data.json";
      console.log(ingredients);
    })
    .catch((error) => {
      console.error('Erreur lors du chargement des données :', error);
    });

})
// Initialisation de la liste d'ingrédients
const ulElement = document.getElementById("ingredients-list");
let ingredients = ('data.json');

// Fonction pour ajouter un ingrédient à la liste
function ajouterIngredient() {
  const nouvelIngredient = prompt("Entrez un nouvel ingrédient :");
  if (nouvelIngredient) {
    ingredients.push(nouvelIngredient);
    afficherIngredients();
  }
}

function afficherIngredients() {
  ulElement.innerHTML = "";
  ingredients.forEach((ingredient, index) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.textContent = "Supprimer";
    boutonSupprimer.onclick = () => supprimerIngredient(index);
    li.appendChild(boutonSupprimer);
    ulElement.appendChild(li);
  });
}

function supprimerIngredient(index) {
  ingredients.splice(index, 1);
  afficherIngredients();
}

function genererListe() {
  const listeComplete = ingredients.join("\n");
  const blob = new Blob([listeComplete], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "liste_de_courses.txt";
  a.click();
}

// Fonction pour supprimer la liste
function supprimerListe() {
  ingredients = [];
  afficherIngredients();
}