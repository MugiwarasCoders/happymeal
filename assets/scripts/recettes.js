let ingredients;

$(document).ready(function(){
    fetch('../scripts/data.json')
    .then(response => response.json())
    .then(data => {
        const recettes = data.recettes;

        let listeRecettesHtml = '';
        recettes.forEach((recette, index) => {
            let recetteIngredients = recette.ingredients
            let ingredientsHtml = ''
            let quantiteHtml = ''
            recetteIngredients.forEach(ingredient => {
                ingredientsHtml += '<li>'+ingredient.nom+'</li>'
                quantiteHtml += '<li>'+ingredient.quantite+'</li>'
            })
            let pageIndex = 'page'+((index/3)+1)+''
            if (index % 3 === 0) {
                listeRecettesHtml += '<div id="'+pageIndex+'">';
            }
            listeRecettesHtml += '<div><div><div class="card"><div class="card-image"><img src="'+recette.img+'"><span class="card-title">'+recette.nom+'</span><a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a></div><div class="card-content"><ul>'+ingredientsHtml+'</ul><ul>'+quantiteHtml+'</ul></div></div></div></div>';
            if ((index + 1) % 3 === 0 || index === recettes.length - 1) {
                listeRecettesHtml += '</div>';
            }
        });
        $('.box').html(listeRecettesHtml);
        //On force le visiteur a atterir sur la page 1 et à n'afficher que 3 cartes
        window.location.href="#page1"
        $('#page1').siblings('div').hide()


        //Ici on fait apparaître 3 cartes en fonction de la page et on fait disparaître les autres
        //p1
        $('#page1-btn').click(function(){
            $('#page1').css('display', 'flex')
            $('#page1').siblings('div').hide()
        })
        //p2
        $('#page2-btn').click(function(){
            $('#page2').css('display', 'flex')
            $('#page2').siblings('div').hide()
        })
        //p3
        $('#page3-btn').click(function(){
            $('#page3').css('display', 'flex')
            $('#page3').siblings('div').hide()
        })
        //p4
        $('#page4-btn').click(function(){
            $('#page4').css('display', 'flex')
            $('#page4').siblings('div').hide()
        })
        //p5
        $('#page5-btn').click(function(){
            $('#page5').css('display', 'flex')
            $('#page5').siblings('div').hide()
        })
    });
});

//On récupère les étapes de chaque recette
const etapes = []



