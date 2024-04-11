let allRecettes = [];
let test = ''


$(document).ready(function(){
    fetch ('../scripts/data.json')
    .then (response => response.json())
    .then (data => {
        const recettes = data.recettes;
        recettes.forEach(recette => {
            let recetteIngredients = recette.ingredients
            let ingredientsHtml = ''
            let quantiteHtml = ''
            recetteIngredients.forEach(ingredient => {
                ingredientsHtml += '<li>'+ingredient.nom+'</li>'
                quantiteHtml += '<li>'+ingredient.quantite+'</li>'
                test += ingredientsHtml
            })
            allRecettes.push(recette)
            console.log(recetteIngredients)
        });

        //Ici on récupère les favoris ajoutés dans le localStorage et on les place dans un tableau
        let favListe = localStorage.getItem('favs');
        favListe = favListe.split(',');
        console.log(favListe)

        //Puis on les ajoute à notre code html
        $(favListe).each(function(index, favName){
            let favoriExiste = allRecettes.some(recette => recette.nom === favName);
            if (favoriExiste){
                let recette = allRecettes.find(recette => recette.nom === favName);
                let favHtml = '<a class="collection-item">'+recette.nom+'</a>';
                $('.collection').append(favHtml);
            }
        });
        // On active le dropdown
        $('.dropdown-trigger').dropdown();
    });
});



