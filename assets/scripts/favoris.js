// Déclaration d'un tableau pour stocker toutes les recettes
let allRecettes = [];

// Attente du chargement complet du document HTML
$(document).ready(function(){
    // Requête fetch pour récupérer les données du fichier JSON
    fetch ('../scripts/data.json')
    .then (response => response.json()) // Convertit la réponse en JSON
    .then (data => {
        // Récupération des recettes du fichier JSON
        const recettes = data.recettes;
        // Ajout des recettes récupérées dans le tableau allRecettes
        recettes.forEach(recette => {
            allRecettes.push(recette)
        });

        // Récupération de la liste des favoris depuis le stockage local (localStorage)
        let favListe = localStorage.getItem('favs');
        let favListeIndex = localStorage.getItem('Recettes favorites:')
        console.log(favListeIndex)
        // Conversion de la chaîne en tableau en utilisant la virgule comme séparateur
        favListe = favListe.split(',');
        console.log(favListe)
        
        // Vérification si la liste des favoris est vide
        if (favListe == '' && favListeIndex == ''){
            $('.collection').html("Vous n'avez ajouté aucun favori pour l'instant")
        }

        // Parcours de la liste des favoris
        $(favListe).each(function(index, favName){
            // Vérification si le favori existe dans la liste des recettes
            let favoriExiste = allRecettes.some(recette => recette.nom === favName);
            if (favoriExiste){
                // Récupération de la recette correspondante
                let recette = allRecettes.find(recette => recette.nom === favName);
                // Construction de l'élément HTML pour afficher le favori
                let favHtml = '<li class="collection-item"><p>'+recette.nom+'</p><button class="supItem"><img src="../img/bin.png"></button><button class="voir">Voir la recette</button></li>';
                // Ajout de l'élément HTML à la liste des favoris
                $('.collection').append(favHtml);
            }
        });

        // Parcours de la liste des favoris
        $(favListeIndex).each(function(index, favName){
            // Vérification si le favori existe dans la liste des recettes
            let favoriExiste = allRecettes.some(recette => recette.nom === favName);
            if (favoriExiste){
                // Récupération de la recette correspondante
                let recette = allRecettes.find(recette => recette.nom === favName);
                // Construction de l'élément HTML pour afficher le favori
                let favHtml = '<li class="collection-item"><p>'+recette.nom+'</p><button class="supItem"><img src="../img/bin.png"></button><button class="voir">Voir la recette</button></li>';
                // Ajout de l'élément HTML à la liste des favoris
                $('.collection').append(favHtml);
            }
        });

        // Gestion du clic sur le bouton de suppression d'un favori
        $('.supItem').click(function(){
            // Suppression de l'élément de la liste des favoris
            $(this).parent().remove()
            // Mise à jour du stockage local après la suppression du favori
            let recette = $(this).siblings('p').text()
            let index = favListe.indexOf(recette)
            favListe.splice(index, 1)
            localStorage.setItem('favs', favListe)
            // Affichage d'un message si la liste des favoris est vide après la suppression
            if (favListe == ''){
                $('.collection').html("Votre liste de favoris est vide!")
            }
        })

        // Activation du plugin dropdown de Materialize pour les menus déroulants
        $('.dropdown-trigger').dropdown();

        // Gestion du clic sur le bouton "Voir la recette"
        $('.voir').click(function(){
            // Récupération de l'identifiant de la recette correspondante
            let idRecette;
            let recetteNom = $(this).siblings('p').text();
            for (clé in allRecettes){
                let objet = allRecettes[clé]
                let objetNom = objet.nom
                if (recetteNom == objetNom){
                    idRecette = parseInt(clé) + 1
                    window.location.href="recettes.html#recette"+idRecette+""
                }
            }
        })
    });
})
