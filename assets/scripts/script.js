

//------------FONCTION POUR RANDOMISER ET AFFICHER LES RECETTES--------------------//
$(document).ready(function(){
  fetch("assets/scripts/data.json")
  .then(response => response.json())
  .then(data => {
    const recettes = data.recettes;
    const cartes = document.querySelectorAll(".carte1"); // Sélectionnez toutes les cartes
    $(".dropdown-trigger").dropdown(); // activer dropdown de la navbar 
    let recettesSelectionnees = [];
    let indicesRecettesSelectionnees = [];

    cartes.forEach((carte, index) => { // Utilisez forEach pour itérer sur toutes les cartes
      let recetteAleatoire;
      do {
        recetteAleatoire = recettes[Math.floor(Math.random() * recettes.length)];
      } while (indicesRecettesSelectionnees.includes(recettes.indexOf(recetteAleatoire))); // Vérifiez si la recette aléatoire a déjà été sélectionnée

      indicesRecettesSelectionnees.push(recettes.indexOf(recetteAleatoire)); // Ajoutez l'indice de la recette à la liste des indices sélectionnés

      const img = carte.querySelector(".activator");
      img.src = recetteAleatoire.img;

      const title = carte.querySelector(".card-title");
      title.textContent = recetteAleatoire.nom;

      const divRecettes = carte.querySelector(".divRecettes");
      divRecettes.textContent = recetteAleatoire.nom;

      const categorie = carte.querySelector(".categorie");
      categorie.textContent = recetteAleatoire.categorie;

      const reveal = carte.querySelector(".card-reveal");
      reveal.querySelector(".card-title").textContent = recetteAleatoire.nom;
      let ingredientsHTML = "<ul>";
      recetteAleatoire.ingredients.forEach(ingredient => {
        ingredientsHTML += "<li>" + ingredient.nom + " - " + ingredient.quantite + "</li>";
      });
      ingredientsHTML += "</ul>";
      reveal.querySelector(".ingredients").innerHTML = ingredientsHTML;
      reveal.querySelector(".categorie").textContent = recetteAleatoire.categorie
      reveal.querySelector(".temps_preparation").textContent = "Temps de préparation : " + recetteAleatoire.temps_preparation ;
      
      let etapesHTML = recetteAleatoire.etapes;
      etapesHTML = etapesHTML.join("<br>");
      reveal.querySelector(".étapes").innerHTML = etapesHTML;

      // Ajoute un gestionnaire d'événements click à chaque élément <a> avec l'ID #ajouter
      document.querySelectorAll('#ajouter').forEach(function(element) {
        element.addEventListener('click', function() {
            // Récupère le nom de la recette associée à cet élément
            const nomRecette = this.closest('.carte1').querySelector('.card-title').textContent;
            
            // Stocke le nom de la recette dans le stockage local
            // Choisir une clé appropriée pour stocker le nom de la recette
            localStorage.setItem("Recettes favorites", nomRecette);
        });
      });
    });
  });
});      
     



//-----------------FONCTION POUR BOUTTON RESET--------------------//

$("#icone_reset").click(function(){
  fetch("assets/scripts/data.json")
  .then(response => response.json())
  .then(data => {
    
    const recettes = data.recettes;
    const cartes = document.querySelectorAll(".carte1"); // Sélectionnez toutes les cartes

    let recettesSelectionnees = [];
    let indicesRecettesSelectionnees = [];

    cartes.forEach((carte, index) => { // Utilisez forEach pour itérer sur toutes les cartes
      let recetteAleatoire;
      do {
        recetteAleatoire = recettes[Math.floor(Math.random() * recettes.length)];
      } while (indicesRecettesSelectionnees.includes(recettes.indexOf(recetteAleatoire))); // Vérifiez si la recette aléatoire a déjà été sélectionnée

      indicesRecettesSelectionnees.push(recettes.indexOf(recetteAleatoire)); // Ajoutez l'indice de la recette à la liste des indices sélectionnés

      const img = carte.querySelector(".activator");
      img.src = recetteAleatoire.img;

      const title = carte.querySelector(".card-title");
      title.textContent = recetteAleatoire.nom;

      const divRecettes = carte.querySelector(".divRecettes");
      divRecettes.textContent = recetteAleatoire.nom;

      const categorie = carte.querySelector(".categorie");
      categorie.textContent = recetteAleatoire.categorie;

      const reveal = carte.querySelector(".card-reveal");
      reveal.querySelector(".card-title").textContent = recetteAleatoire.nom;
      let ingredientsHTML = "<ul>";
      recetteAleatoire.ingredients.forEach(ingredient => {
        ingredientsHTML += "<li>" + ingredient.nom + " - " + ingredient.quantite + "</li>";
      });
      ingredientsHTML += "</ul>";
      reveal.querySelector(".ingredients").innerHTML = ingredientsHTML;
      reveal.querySelector(".categorie").textContent = recetteAleatoire.categorie
      reveal.querySelector(".temps_preparation").textContent = "Temps de préparation : " + recetteAleatoire.temps_preparation ;
      
      let etapesHTML = recetteAleatoire.etapes;
      etapesHTML = etapesHTML.join("<br>");
      reveal.querySelector(".étapes").innerHTML = etapesHTML;
    });
  });
});      

//-----------------FONCTION POUR BARRE DE RECHERCHE--------------------//
document.getElementById('search').addEventListener('input', rechercher);
document.getElementById('search-button').addEventListener('click', rechercher);

function rechercher() {
  const termeRecherche = document.getElementById('search').value.toLowerCase();
  const elementResultatsRecherche = document.getElementById('search-results');

  // Si la valeur de l'input est vide, effacer la liste de résultats
  if (termeRecherche.trim() === '') {
      elementResultatsRecherche.innerHTML = '';
      return; // Sortir de la fonction, pas besoin de poursuivre
  }

  // Fetch 
  fetch('assets/scripts/data.json')
      .then(response => response.json())
      .then(data => {
          // Filtrer
          const donneesFiltrees = data.recettes.filter(item => {
              // Vérifier si le nom de la recette correspond
              const correspondanceNom = item.nom.toLowerCase().includes(termeRecherche);
              // Vérifier si l'un des ingrédients correspond
              const correspondanceIngredient = item.ingredients.some(ingredient => {
                  // Vérifier si le nom de l'ingrédient existe avant d'appeler toLowerCase()
                  return ingredient.nom && ingredient.nom.toLowerCase().includes(termeRecherche);
              });
              return correspondanceNom || correspondanceIngredient;
          });
          
          afficherResultats(donneesFiltrees);
      })
      .catch(error => console.error('Erreur lors de la récupération des données :', error));
}

// FONCTION POUR AFFICHER LES RESULTATS

function afficherResultats(resultats) {
  const elementResultatsRecherche = document.getElementById('search-results');
  elementResultatsRecherche.innerHTML = '';

  if (resultats.length === 0) {
    elementResultatsRecherche.innerHTML = 'Aucun résultat trouvé.';
  } else {
    const listeResultats = document.createElement('ul');
    resultats.forEach(resultat => {
      const elementListe = document.createElement('li');
      const elementNom = document.createElement('span');
      elementNom.innerHTML = resultat.nom;
      elementListe.appendChild(elementNom);
      listeResultats.appendChild(elementListe);
      // Ajouter une balise <br> après chaque élément de la liste
      listeResultats.appendChild(document.createElement('br'));

      // Afficher les ingrédients
    });
    elementResultatsRecherche.appendChild(listeResultats);
  }
}


