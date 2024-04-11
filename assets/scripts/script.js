//------------FONCTION POUR RANDOMISER ET AFFICHER LES NOMS DES RECETTES--------------------//


$(document).ready(function(){
  fetch("assets/scripts/data.json")
  .then(response => response.json())
  .then(data => {
    const recettes = data.recettes;
    const cards = document.querySelectorAll(".card");

    let recettesSelectionnees = [];
      cards.forEach(card => {
  // Sélectionner une recette aléatoire
  const recetteAleatoire = recettes[Math.floor(Math.random() * recettes.length)];

  // Définir l'attribut src de l'image de la carte avec le chemin de l'image correspondante à partir de la recette aléatoire
  const img = card.querySelector(".activator");
  img.src = recetteAleatoire.img;

  // Déplacer la déclaration de la variable reveal à l'intérieur de la boucle forEach
  const reveal = card.querySelector(".card-reveal");
  reveal.querySelector(".card-title").textContent = recetteAleatoire.nom;

    // Créer une chaîne de caractères contenant les ingrédients
    let ingredientsHTML = "<ul>";
    recetteAleatoire.ingredients.forEach(ingredient => {
        ingredientsHTML += "<li>" + ingredient.nom + " - " + ingredient.quantite + "</li>";
    });
    ingredientsHTML += "</ul>";

    // Insérer les ingrédients dans le contenu HTML avec une liste à puces
    reveal.querySelector(".ingredients").innerHTML = ingredientsHTML;

    // Créer une chaîne de caractères contenant les étapes avec des retours à la ligne
    const etapesHTML = recetteAleatoire.etapes.join("<br>");

    // Insérer les étapes dans le contenu HTML avec des retours à la ligne
    reveal.querySelector("p").innerHTML = etapesHTML;

    const card = querySelector(".carte1")

    // Ajouter le temps de préparation
    reveal.querySelector(".temps-preparation").textContent = "Temps de préparation : " + recetteAleatoire.temps_preparation;
        cards.forEach(card => {
          let recetteAleatoire;

    // Sélectionner une recette aléatoire qui n'a pas encore été sélectionnée
    do {
      recetteAleatoire = recettes[Math.floor(Math.random() * recettes.length)];
    } while (recettesSelectionnees.includes(recetteAleatoire));

    recettesSelectionnees.push(recetteAleatoire); // Ajouter la recette sélectionnée à la liste des recettes sélectionnées

    // Définir l'attribut src de l'image de la carte avec le chemin de l'image correspondante à partir de la recette aléatoire
    const img = card.querySelector(".activator");
    img.src = recetteAleatoire.img;

    // Ajouter le titre de la recette à la balise <span> dans le contenu de la carte
    const title = card.querySelector(".card-title");
    const divRecettes = card.querySelector(".divRecettes");
    title.textContent = recetteAleatoire.nom;
    divRecettes.textContent = recetteAleatoire.nom;
  

    // Ajouter recette dans card reveal
    const reveal = card.querySelector(".card-reveal");
    reveal.querySelector(".card-title").textContent = recetteAleatoire.nom; // Définir le titre de la recette
    
    // Créer une chaîne de caractères contenant les étapes avec des retours à la ligne
    const etapesHTML = recetteAleatoire.etapes.join("<br>");

    // Insérer les étapes dans le contenu HTML avec des retours à la ligne
    reveal.querySelector("p").innerHTML = etapesHTML;
    });
  })
  .catch(error => console.error("Erreur lors du chargement du fichier JSON :", error));
});


//-----------------FONCTION POUR BOUTTON RESET--------------------//

$("#icone_reset").click(function(){
  fetch("assets/scripts/data.json")
  .then(response => response.json())
  .then(data => {
    const recettes = data.recettes;

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      // Sélectionner une recette aléatoire
      const recetteAleatoire = recettes[Math.floor(Math.random() * recettes.length)];

      // Définir l'attribut src de l'image de la carte avec le chemin de l'image correspondante à partir de la recette aléatoire
      const img = card.querySelector(".activator");
      img.src = recetteAleatoire.img;

      // Ajouter le titre de la recette à la balise <span> dans le contenu de la carte
      const title = card.querySelector(".card-title");
      const divRecettes = card.querySelector(".divRecettes");
      title.textContent = recetteAleatoire.nom;
      divRecettes.textContent = recetteAleatoire.nom;

      // Ajouter recette dans card reveal
      const reveal = card.querySelector(".card-reveal");
      reveal.querySelector(".card-title").textContent = recetteAleatoire.nom; // Définir le titre de la recette
      // Définir les ingrédients de la recette
      let ingredientsHTML = "<ul>";
      recetteAleatoire.ingredients.forEach(ingredient => {
        ingredientsHTML += "<li>" + ingredient.nom + " - " + ingredient.quantite + "</li>";
      });
      ingredientsHTML += "</ul>";
      reveal.querySelector(".ingredients").innerHTML = ingredientsHTML;

      // Définir les étapes de la recette sans virgule + revenir à la ligne
      const etapesHTML = recetteAleatoire.etapes.join("<br>");
      reveal.querySelector("p").innerHTML = etapesHTML;
    });
  })
  .catch(error => console.error("Erreur lors du chargement du fichier JSON :", error));
});




// $(document).ready(function() {
//   // Cachez la liste déroulante initialement
//   $('#search-results').hide();

//   $('#search').on('input', function() {
//     var searchTerm = $(this).val().toLowerCase();
//     var results = [];

//     // Effectuer la recherche dans les données JSON
//     $.getJSON('./assets/scripts/data.json', function(data) {
//       // Convertir data en tableau si ce n'est pas déjà le cas
//       var dataArray = Array.isArray(data) ? data : Object.values(data);
      
//       results = dataArray.filter(function(item) {
//         return item.name.toLowerCase().includes(searchTerm);
//       });

//       // Afficher les résultats dans la liste déroulante
//       var dropdown = $('#search-results');
//       dropdown.empty();
//       if (results.length > 0) {
//         results.forEach(function(item) {
//           dropdown.append('<li><a href="#">' + item.name + '</a></li>');
//         });
//         dropdown.show();
//       } else {
//         dropdown.hide();
//       }
//     });
//   });

//   // Gérer la sélection d'un élément dans la liste déroulante
//   $(document).on('click', '#search-results li', function() {
//     var selectedText = $(this).text();
//     $('#search').val(selectedText);
//     $('#search-results').hide();
//   });

//   // Cacher la liste déroulante si l'utilisateur clique en dehors de celle-ci
//   $(document).on('click', function(event) {
//     if (!$(event.target).closest('#search-results').length && !$(event.target).is('#search')) {
//       $('#search-results').hide();
//     }
//   });
// });

