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
                listeRecettesHtml += '<div name="cartes" id="'+pageIndex+'">';
            }
            listeRecettesHtml += '<div class="card"><div class="card-image"><img src="'+recette.img+'"><span class="card-title">'+recette.nom+'</span><a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a></div><div class="card-content"><ul>'+ingredientsHtml+'</ul><ul>'+quantiteHtml+'</ul></div></div>';
            if ((index + 1) % 3 === 0 || index === recettes.length - 1) {
                listeRecettesHtml += '</div>';
            }
        });
        $('.box').html(listeRecettesHtml);
        //On force le visiteur a atterir sur la page 1 et à n'afficher que 3 cartes
        window.location.href="#page1"
        $('#page1').siblings('div').hide()
        $('#page1-btn').parent().addClass('active')


        //Ici on fait apparaître 3 cartes en fonction de la page et on fait disparaître les autres
        //previous
        $('#prev-btn').click(function(){
            if (window.location.hash > "#page1"){
                let Loc = window.location.href
                let page = parseInt(Loc.slice(53, 54))
                let prevPage = 'page'+(page-1)+''
                window.location.href='#'+prevPage+''
            }
            else{
                window.location.href="#page5"
            }
            
        })
        //next
            $('#next-btn').click(function(){
                if (window.location.hash < "#page5"){
                    let Loc = window.location.href
                    let page = parseInt(Loc.slice(53, 54))
                    let nextPage = 'page'+(page+1)+''
                    window.location.href='#'+nextPage+''
                }
                else{
                    window.location.href="#page1"
                }        
            })

        //Au changement d'url on récupère l'id target et on affiche la div correspondante
        $(window).on('hashchange', function(){
            let Loc = window.location.hash
            let numPage = Loc.slice(5, 6)
            let page = '#page'+numPage+'-btn'
            $('li').removeClass('active')
            $(page).parent().addClass('active')
            $(Loc).css('display', 'flex')
            $(Loc).siblings('div').hide()
        })
    });
});




