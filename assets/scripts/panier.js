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
        let panierListe = localStorage.getItem('panier');
        console.log(panierListe)
        // Conversion de la chaîne en tableau en utilisant la virgule comme séparateur
        if (!panierListe == '' || !panierListe === null || !panierListe === undefined){
            panierListe = panierListe.split(',');
            console.log(panierListe)
        }
        else{
            $('.collection').html("Vous n'avez ajouté aucun ingrédient pour l'instant")
        }

        // Parcours de la liste des ingredients
        $(panierListe).each(function(index, ingredient){
            // Construction de l'élément HTML pour afficher l'ingredient
            let panierHtml = '<li class="collection-item"><p>'+ingredient+'</p><button class="supItem"><img src="../img/bin.png"></button></li>';
            // Ajout de l'élément HTML à la liste des ingredients
            $('.collection').append(panierHtml)
        });


        // Gestion du clic sur le bouton de suppression d'un ingrédient
        $('.supItem').click(function(){
            // Suppression de l'élément de la liste des ingrédients
            $(this).parent().remove()
            // Mise à jour du stockage local après la suppression du favori
            let ingrédient = $(this).siblings('p').text()
            let index = panierListe.indexOf(ingrédient)
            panierListe.splice(index, 1)
            localStorage.setItem('panier', panierListe)
            // Affichage d'un message si la liste des favoris est vide après la suppression
            if (panierListe == ''){
                $('.collection').html("Votre panier est vide!")
            }
        })

        // Activation du plugin dropdown de Materialize pour les menus déroulants
        $('.dropdown-trigger').dropdown();


        $('#download').click(function(){
            // Générer le contenu du fichier texte
            let content = "Liste de courses :\n";
            $('.collection-item p').each(function(index, element) {
                content += "- " + $(element).text() + "\n";
            });
        
            // Créer un objet Blob avec le contenu texte
            let blob = new Blob([content], { type: 'text/plain' });
        
            // Créer un objet URL à partir du Blob
            let url = URL.createObjectURL(blob);
        
            // Créer un élément <a> pour le téléchargement du fichier
            let link = document.createElement('a');
            link.href = url;
            link.download = 'liste_de_courses.txt';
        
            // Ajouter l'élément <a> à la page et déclencher le téléchargement
            document.body.appendChild(link);
            link.click();
        
            // Nettoyer après le téléchargement
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }); 
    });
})
