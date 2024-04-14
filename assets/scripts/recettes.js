// Initialisation des variables
let ingredients = [];
let favoris = [];

// Attente du chargement complet du document HTML
$(document).ready(function(){
    // Requête fetch pour récupérer les données du fichier JSON
    fetch('../scripts/data.json')
    .then(response => response.json())
    .then(data => {
        // Récupération des recettes depuis les données JSON
        const recettes = data.recettes;

        // Construction du HTML pour afficher les recettes
        let listeRecettesHtml = '';
        let i = 0;
        recettes.forEach((recette, index) => {
            i++;
            let recetteIngredients = recette.ingredients;
            let ingredientsHtml = '';
            recetteIngredients.forEach(ingredient => {
                // Construction de la liste des ingrédients pour chaque recette
                ingredientsHtml += '<li class="ingredients">'+'<p>'+ingredient.nom+'</p>'+'<p>'+ingredient.quantite+'</p><button class="addButton">+</button></li>';
            });
            let pageIndex = 'page'+((index/3)+1)+'';
            if (index % 3 === 0) {
                listeRecettesHtml += '<div name="cartes" id="'+pageIndex+'">';
            }

            // Construction de la carte pour chaque recette
            listeRecettesHtml += '<div class="card"><div class="card-image"><img src="'+recette.img+'"><span class="card-title">'+recette.nom+'</span><a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#recette'+i+'"><i class="material-icons">add</i></a></div><div class="card-content"><ul>'+ingredientsHtml+'</ul></div></div><div id="recette'+i+'" class="modal"><div class="modal-content"><section><div><h4>'+recette.nom+'</h4><img src="'+recette.img+'"></div><div><h5>Catégorie</h5>'+recette.categorie+'</div><div><h5>Ingrédients</h5><div class="ingredientsModal">'+'<ul>'+ingredientsHtml+'</ul></div></div></section><h5>Temps de préparation</h5>'+recette.temps_preparation+'<h5 class="etapes">Etapes:</h5><p>- '+recette.etapes.join('<br>- ')+'</p></div><div class="modal-footer"><button class="addFavs">⭐</button><button class="modal-close waves-effect waves-green btn">Fermer</button></div></div>';

            if ((index + 1) % 3 === 0 || index === recettes.length - 1) {
                listeRecettesHtml += '</div>';
            }
        });

        // Injection du HTML dans la boîte conteneur
        $('.box').html(listeRecettesHtml);

        // Configuration du bouton de fermeture des modales
        $('.modal-close').click(function(){
            let page = window.location.href;
            let longPage = page.length;
            let prevPage = page.slice(0, 48);
            window.location.href=prevPage;
        });

        // Configuration du bouton d'ajout aux favoris pour chaque modal
        $('.addFavs').click(function(){
            let modal = $(this).closest('.modal');
            let title = modal.find('h4').text();
            // Récupération des données déjà présentes dans le localStorage favoris
            let localFavs = localStorage.getItem('favs');
            if(localFavs === null || localFavs === undefined || localFavs === ''){
                localStorage.setItem('favs', title);
            }
            else{
                // Ajout au tableau de favoris
                favoris.push(localFavs);
                // Si la recette n'est pas déjà dans les favoris
                if (localFavs.includes(title)){
                    alert('❌Cette recette fait déjà partie vos favoris!');
                    return false;
                }
                else{
                    // Ajout de la nouvelle recette aux favoris
                    favoris.push(title);
                    // Mise à jour du localStorage avec les nouveaux favoris
                    localStorage.setItem('favs', favoris);
                    alert('La recette a bien été ajouté à vos favoris!👌');
                }
            }
        });

        // Forcer le visiteur à atterrir sur la page 1 et n'afficher que 3 cartes
        $('#page1').siblings('div').hide();
        $('#page1-btn').parent().addClass('active');

        // Afficher 3 cartes en fonction de la page et masquer les autres
        // Page précédente
        $('#prev-btn').click(function(){
            if (window.location.hash > "#page1"){
                let Loc = window.location.href;
                let page = parseInt(Loc.slice(53, 54));
                let prevPage = 'page'+(page-1)+'';
                window.location.href='#'+prevPage+'';
            }
            else{
                window.location.href="#page5";
            }
        });
        // Page suivante
        $('#next-btn').click(function(){
            if (window.location.hash < "#page5"){
                let Loc = window.location.href;
                let page = parseInt(Loc.slice(53, 54));
                let nextPage = 'page'+(page+1)+'';
                window.location.href='#'+nextPage+'';
            }
            else{
                window.location.href="#page1";
            }        
        });

        // Au changement d'URL, récupérer l'ID cible et afficher la div correspondante
        $(window).on('hashchange', function(){
            let Loc = window.location.hash;
            let numPage = Loc.slice(5, 6);
            let page = '#page'+numPage+'-btn';
            $('li').removeClass('active');
            $(page).parent().addClass('active');
            $(Loc).css('display', 'flex');
            $(Loc).siblings('div').hide();
        });

        // Activer le dropdown
        $('.dropdown-trigger').dropdown();

        // Configuration de l'ouverture d'une modal lorsque son adresse est spécifiée
        let idRecette = window.location.hash;
        $(idRecette).parent('div').css('display', 'flex');
        $(idRecette).css('display', 'flex');

        // Configuration de l'ajout des ingrédients au localStorage
        $('.addButton').click(function(){
            let ingredientP = $(this).parent().children('p:first').text();
            // Récupération du localStorage des ingrédients
            localIngredients = localStorage.getItem('panier');
            if (localIngredients === null || localIngredients === undefined || localIngredients === ''){
                localStorage.setItem('panier', ingredientP);
                alert('L\'ingrédient a bien été ajouté à votre panier!👌');
            }
            else{
                // Ajout au tableau d'ingrédients
                ingredients.push(localIngredients);
                // Si l'ingrédient n'est pas déjà dans le panier
                if (localIngredients.includes(ingredientP)){
                    alert('❌Cet ingrédient fait déjà partie votre panier!');
                    return false;
                }
                else{
                    // Ajout de l'ingrédient au panier
                    ingredients.push(ingredientP);
                    // Mise à jour du localStorage avec les nouveaux ingrédients
                    localStorage.setItem('panier', ingredients);
                    alert('L\'ingrédient a bien été ajouté à votre panier!👌');
                }
            }
        });
    });
});
