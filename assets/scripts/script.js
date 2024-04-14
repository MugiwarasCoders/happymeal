
let allRecettes = []
//------------FONCTION POUR RANDOMISER ET AFFICHER LES RECETTES--------------------//
$(document).ready(function(){
  fetch("assets/scripts/data.json")
  .then(response => response.json())
  .then(data => {
    const recettes = data.recettes;
    const cartes = document.querySelectorAll(".carte1"); // Sélectionne toutes les cartes
    $(".dropdown-trigger").dropdown(); // activer dropdown de la navbar 
    let recettesSelectionnees = [];
    let indicesRecettesSelectionnees = [];

    cartes.forEach((carte, index) => { // Utilise forEach pour itérer sur toutes les cartes
      let recetteAleatoire;
      do {
        recetteAleatoire = recettes[Math.floor(Math.random() * recettes.length)];
      } while (indicesRecettesSelectionnees.includes(recettes.indexOf(recetteAleatoire))); // Vérifie si la recette aléatoire a déjà été sélectionnée

      indicesRecettesSelectionnees.push(recettes.indexOf(recetteAleatoire)); // Ajoute l'indice de la recette à la liste des indices sélectionnés

      
//-----------------AJOUTER VARIABLES JSON--------------------//
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
        ingredientsHTML += "<li>" + ingredient.nom + " - " + ingredient.quantite + "<button class='bouton_ajouter' id='ajouter_ingredient'></button></li>";

      });
      ingredientsHTML += "</ul>";
      reveal.querySelector(".ingredients").innerHTML = ingredientsHTML;
      reveal.querySelector(".categorie").textContent = recetteAleatoire.categorie
      reveal.querySelector(".temps_preparation").textContent = "Temps de préparation : " + recetteAleatoire.temps_preparation ;
      
      let etapesHTML = recetteAleatoire.etapes;
      etapesHTML = etapesHTML.join("<br>");
      reveal.querySelector(".étapes").innerHTML = etapesHTML;


//-----------------FONCTION POUR AJOUTER LES RECETTES AUX FAVORIS--------------------//
document.querySelectorAll('#ajouter').forEach(function(element) {
  element.addEventListener('click', function() {
      // Récupère le nom de la recette associée à cet élément
      const nomRecette = this.closest('.carte1').querySelector('.card-title').textContent;

      // Récupère le tableau existant de recettes dans le localStorage, ou créez un nouveau tableau si aucun n'existe
      let recettesStockees = JSON.parse(localStorage.getItem('Recettes favorites:')) || [];

      // Vérifie si la recette existe déjà dans le tableau
      const indexRecette = recettesStockees.indexOf(nomRecette);
      if (indexRecette === -1) {
          // Si la recette n'existe pas, elle est ajoutée au tableau
          recettesStockees.push(nomRecette);
          console.log('Recette ajoutée avec succès !');

          // Modifie l'image du bouton pour indiquer qu'elle est maintenant dans la liste
          this.querySelector('img').src = "assets/img/icone_favoris_confirme.png";
      } else {
          // Si la recette existe déjà, elle est retirée du tableau
          recettesStockees.splice(indexRecette, 1);
          console.log('Recette retirée de la liste.');
          // Modifie l'image du bouton pour indiquer qu'elle n'est plus dans la liste
          this.querySelector('img').src = "assets/img/icone_favoris.png";
      }
      // Stocke le tableau mis à jour dans le localStorage
      localStorage.setItem('Recettes favorites:', JSON.stringify(recettesStockees));

  })
});

//-----------------FONCTION POUR AJOUTER LES INGREDIENTS AUX FAVORIS--------------------//
      // Récupère les ingrédients stockés dans le localStorage
      let ingredientsStockees = JSON.parse(localStorage.getItem('Ingrédients favoris:')) || [];

      // Sélectionne tous les boutons d'ajout d'ingrédient
      document.querySelectorAll('#ajouter_ingredient').forEach(function(element) {
          // Récupère le nom de l'ingrédient associé à cet élément
          const nomIngredient = element.parentElement.textContent.trim().split(" - ")[0];

          // Vérifie si l'ingrédient est dans le tableau des ingrédients stockés
          if (ingredientsStockees.includes(nomIngredient)) {
              // Si l'ingrédient est dans le tableau, change le texte du bouton à "-"
              element.textContent = "-";
          } else {
              // Sinon, laisse le texte du bouton à "+"
              element.textContent = "+";
          }

          // Ajoute un écouteur d'événement pour le clic sur le bouton
          element.addEventListener('click', function() {
              // Met à jour l'état de tous les boutons correspondants au même ingrédient
              document.querySelectorAll('#ajouter_ingredient').forEach(function(button) {
                  const ingredientName = button.parentElement.textContent.trim().split(" - ")[0];
                  if (ingredientName === nomIngredient) {
                      button.textContent = (button.textContent === "+") ? "-" : "+";
                  }
              });
            });

        });

//-----------------FONCTION POUR MODIFIER BOUTTON INGREDIENTS FAVORIS--------------------//

      document.querySelectorAll('#ajouter_ingredient').forEach(function(element) {
        element.addEventListener('click', function() {
          // Récupère le nom de l'ingrédient associé à cet élément
          const nomIngredient = this.parentElement.textContent.trim().split(" - ")[0];
  
          let ingredientsStockees = JSON.parse(localStorage.getItem('Ingrédients favoris:')) || [];
  
          // Vérifie si l'ingrédient existe déjà dans le tableau
          const indexIngredient = ingredientsStockees.indexOf(nomIngredient);
          if (indexIngredient === -1) {
              // Si l'ingrédient n'existe pas, il est ajouté au tableau
              ingredientsStockees.push(nomIngredient);
              console.log('Ingrédient ajouté avec succès !');
              // Modifie le texte du bouton pour indiquer qu'il est maintenant dans la liste
              this.textContent = "-";
          } else {
              // Si l'ingrédient existe déjà, il est retiré du tableau
              ingredientsStockees.splice(indexIngredient, 1);
              console.log('Ingrédient retiré de la liste.');
              // Modifie le texte du bouton pour indiquer qu'il n'est plus dans la liste
              this.textContent = "+";
          }
  
          // Stocke le tableau mis à jour dans le localStorage
          localStorage.setItem('Ingrédients favoris:', JSON.stringify(ingredientsStockees));
        });
      });
    });
  });
  
});      
//----------------------------------------------------------------------------------------------------------------------

//-----------------FONCTION POUR BOUTTON RESET--------------------//

$("#icone_reset").click(function(){
    fetch("assets/scripts/data.json")
    .then(response => response.json())
    .then(data => {
      const recettes = data.recettes;
      const cartes = document.querySelectorAll(".carte1"); // Sélectionne toutes les cartes
      $(".dropdown-trigger").dropdown(); // activer dropdown de la navbar 
      let recettesSelectionnees = [];
      let indicesRecettesSelectionnees = [];
  
      cartes.forEach((carte, index) => { // Utilise forEach pour itérer sur toutes les cartes
        let recetteAleatoire;
        do {
          recetteAleatoire = recettes[Math.floor(Math.random() * recettes.length)];
        } while (indicesRecettesSelectionnees.includes(recettes.indexOf(recetteAleatoire))); // Vérifie si la recette aléatoire a déjà été sélectionnée
  
        indicesRecettesSelectionnees.push(recettes.indexOf(recetteAleatoire)); // Ajoute l'indice de la recette à la liste des indices sélectionnés
  
  //-----------------AJOUTER VARIABLES JSON--------------------//
  
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
          ingredientsHTML += "<li>" + ingredient.nom + " - " + ingredient.quantite + "<button class='bouton_ajouter' id='ajouter_ingredient'></button></li>";
  
        });
        ingredientsHTML += "</ul>";
        reveal.querySelector(".ingredients").innerHTML = ingredientsHTML;
        reveal.querySelector(".categorie").textContent = recetteAleatoire.categorie
        reveal.querySelector(".temps_preparation").textContent = "Temps de préparation : " + recetteAleatoire.temps_preparation ;
        
        let etapesHTML = recetteAleatoire.etapes;
        etapesHTML = etapesHTML.join("<br>");
        reveal.querySelector(".étapes").innerHTML = etapesHTML;
  
  
  //-----------------FONCTION POUR AJOUTER LES RECETTES AUX FAVORIS--------------------//
        // Ajoute un gestionnaire d'événements click à chaque élément <a> avec l'ID #ajouter
        document.querySelectorAll('#ajouter').forEach(function(element) {
          element.addEventListener('click', function() {
              // Récupère le nom de la recette associée à cet élément
              const nomRecette = this.closest('.carte1').querySelector('.card-title').textContent;
              
              // Récupère le tableau existant de recettes dans le localStorage, ou créez un nouveau tableau si aucun n'existe
              let recettesStockees = JSON.parse(localStorage.getItem('Recettes favorites:')) || [];
      
              // Vérifie si la recette existe déjà dans le tableau
              const indexRecette = recettesStockees.indexOf(nomRecette);
              if (indexRecette === -1) {
                  // Si la recette n'existe pas, elle est ajoutée au tableau
                  recettesStockees.push(nomRecette);
                  console.log('Recette ajoutée avec succès !');
  
  
  //-----------------FONCTION POUR MODIFIER BOUTTON RECETTES FAVORITES--------------------//
  
                  // Modifie l'image du bouton pour indiquer qu'elle est maintenant dans la liste
                  this.querySelector('img').src = "assets/img/icone_favoris_confirme.png"; // Remplacez "chemin/vers/image/recette_presente.png" par le chemin de votre image
              } else {
                  // Si la recette existe déjà, elle est retirée du tableau
                  recettesStockees.splice(indexRecette, 1);
                  console.log('Recette retirée de la liste.');
                  // Modifie l'image du bouton pour indiquer qu'elle n'est plus dans la liste
                  this.querySelector('img').src = "assets/img/icone_favoris.png"; // Remplacez "chemin/vers/image/recette_absente.png" par le chemin de votre image
              }
              // Stocke le tableau mis à jour dans le localStorage
              localStorage.setItem('Recettes favorites:', JSON.stringify(recettesStockees));
          }) 
        });
  
  //-----------------FONCTION POUR AJOUTER LES INGREDIENTS AUX FAVORIS--------------------//
        // Récupère les ingrédients stockés dans le localStorage
        let ingredientsStockees = JSON.parse(localStorage.getItem('Ingrédients favoris:')) || [];
  
        // Sélectionne tous les boutons d'ajout d'ingrédient
        document.querySelectorAll('#ajouter_ingredient').forEach(function(element) {
            // Récupère le nom de l'ingrédient associé à cet élément
            const nomIngredient = element.parentElement.textContent.trim().split(" - ")[0];
  
            // Vérifie si l'ingrédient est dans le tableau des ingrédients stockés
            if (ingredientsStockees.includes(nomIngredient)) {
                // Si l'ingrédient est dans le tableau, change le texte du bouton à "-"
                element.textContent = "-";
            } else {
                // Sinon, laisse le texte du bouton à "+"
                element.textContent = "+";
            }
  
            // Ajoute un écouteur d'événement pour le clic sur le bouton
            element.addEventListener('click', function() {
                // Met à jour l'état de tous les boutons correspondants au même ingrédient
                document.querySelectorAll('#ajouter_ingredient').forEach(function(button) {
                    const ingredientName = button.parentElement.textContent.trim().split(" - ")[0];
                    if (ingredientName === nomIngredient) {
                        button.textContent = (button.textContent === "+") ? "-" : "+";
                    }
                });
              });
          });
  
  //-----------------FONCTION POUR MODIFIER BOUTTON INGREDIENTS FAVORIS--------------------//
  
        document.querySelectorAll('#ajouter_ingredient').forEach(function(element) {
          element.addEventListener('click', function() {
            // Récupère le nom de l'ingrédient associé à cet élément
            const nomIngredient = this.parentElement.textContent.trim().split(" - ")[0];
    
            let ingredientsStockees = JSON.parse(localStorage.getItem('Ingrédients favoris:')) || [];
    
            // Vérifie si l'ingrédient existe déjà dans le tableau
            const indexIngredient = ingredientsStockees.indexOf(nomIngredient);
            if (indexIngredient === -1) {
                // Si l'ingrédient n'existe pas, il est ajouté au tableau
                ingredientsStockees.push(nomIngredient);
                console.log('Ingrédient ajouté avec succès !');
                // Modifie le texte du bouton pour indiquer qu'il est maintenant dans la liste
                this.textContent = "-";
            } else {
                // Si l'ingrédient existe déjà, il est retiré du tableau
                ingredientsStockees.splice(indexIngredient, 1);
                console.log('Ingrédient retiré de la liste.');
                // Modifie le texte du bouton pour indiquer qu'il n'est plus dans la liste
                this.textContent = "+";
            }
    
            // Stocke le tableau mis à jour dans le localStorage
            localStorage.setItem('Ingrédients favoris:', JSON.stringify(ingredientsStockees));
          });
        });
      });
    });
  });

//----------------------------------------------------------------------------------------------------------------------

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
      allRecettes.push(resultat);
      elementListe.appendChild(elementNom);
      listeResultats.appendChild(elementListe);
      // Ajouter une balise <br> après chaque élément de la liste
      listeResultats.appendChild(document.createElement('br'));

      // Afficher les ingrédients
    });
    console.log(allRecettes)
    elementResultatsRecherche.appendChild(listeResultats);
  }
}