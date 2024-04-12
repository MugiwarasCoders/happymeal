let ingredients;
let favoris = [];

$(document).ready(function(){
    fetch('../scripts/data.json')
    .then(response => response.json())
    .then(data => {
        const recettes = data.recettes;

        let listeRecettesHtml = '';
        let i = 0
        recettes.forEach((recette, index) => {
            i++
            console.log(i)
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

            listeRecettesHtml += '<div class="card"><div class="card-image"><img src="'+recette.img+'"><span class="card-title">'+recette.nom+'</span><a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#recette'+i+'"><i class="material-icons">add</i></a></div><div class="card-content"><ul>'+ingredientsHtml+'</ul><ul>'+quantiteHtml+'</ul></div></div><div id="recette'+i+'" class="modal"><div class="modal-content"><section><div><h4>'+recette.nom+'</h4><img src="'+recette.img+'"></div><div><h5>Ingrédients</h5><p>'+ingredientsHtml+'</p></div></section><h5 class="etapes">Etapes:</h5><p>- '+recette.etapes.join('<br>- ')+'</p></div><div class="modal-footer"><button class="addFavs">Fav</button><button class="modal-close waves-effect waves-green btn">Fermer</button></div></div>';

            if ((index + 1) % 3 === 0 || index === recettes.length - 1) {
                listeRecettesHtml += '</div>';
            }
        });

        $('.box').html(listeRecettesHtml);

        //Ici on configure le bouton de retour de nos modals
        $('.modal-close').click(function(){
            let page = window.location.href
            let longPage = page.length
            let prevPage = page.slice(0, 48)
            window.location.href=prevPage
        })

        //Ici on configure le bouton d'ajout aux favoris de chaque modal
        $('.addFavs').click(function(){
            let modal = $(this).closest('.modal')
            let title = modal.find('h4').text()
            //On récupère les données déjà inscrites dans le localstorage favoris
            let localFavs = localStorage.getItem('favs')
            console.log(localFavs)
            if(localFavs === null || localFavs === undefined || localFavs === ''){
                localStorage.setItem('favs', title)
            }
            else{
                //on les ajoute au tableau favoris
                favoris.push(localFavs)
                //si les favoris ne contiennent pas déjà cette recette
                if (localFavs.includes(title)){
                    return false
                }
                else{
                //on ajoute les nouveaux favs au tableau favoris
                favoris.push(title)
                //et on push le tableau dans le localStorage favs
                localStorage.setItem('favs', favoris)
                //Enfin on ajoute les favoris à la page favoris
                }
            }        
        })

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
        // On active le dropdown
        $('.dropdown-trigger').dropdown();
    });
});









