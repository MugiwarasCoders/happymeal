

//------------FONCTION POUR RANDOMISER ET AFFICHER LES RECETTES--------------------//
$(document).ready(function(){
  fetch("assets/scripts/data.json")
  .then(response => response.json())
  .then(data => {
    const recettes = data.recettes;
    const cartes = document.querySelectorAll(".carte1"); // Sélectionnez toutes les cartes
    $(".dropdown-trigger").dropdown();
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
document.getElementById('search').addEventListener('input', search);
document.getElementById('search-button').addEventListener('click', search);

function search() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const searchResultsElement = document.getElementById('search-results');

    // Si la valeur de l'input est vide, effacer la liste de résultats
    if (searchTerm.trim() === '') {
        searchResultsElement.innerHTML = '';
        return; // Sortir de la fonction, pas besoin de poursuivre
    }
  
    // Fetch the JSON file
    fetch('assets/scripts/data.json')
        .then(response => response.json())
        .then(data => {
            // Filter data based on search term
            const filteredData = data.recettes.filter(item => {
                return item.nom.toLowerCase().includes(searchTerm);
            });
            
            // Display search results
            displayResults(filteredData);
        })
        .catch(error => console.error('Error fetching data:', error));
}



//FONCTION POUR AFFICHER LES RESULTATS

function displayResults(results) {
  const searchResultsElement = document.getElementById('search-results');
  searchResultsElement.innerHTML = '';

  if (results.length === 0) {
      searchResultsElement.innerHTML = 'Aucun résultat trouvé.';
  } else {
      const resultList = document.createElement('ul');
      results.forEach(result => {
          const listItem = document.createElement('li');
          const nomElement = document.createElement('span');
          nomElement.innerHTML = result.nom;
        
          listItem.appendChild(nomElement);
          resultList.appendChild(listItem);
          // Ajouter une balise <br> après chaque élément de la liste
          resultList.appendChild(document.createElement('br'));
      });
      searchResultsElement.appendChild(resultList);
  }
}


