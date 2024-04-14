let allRecettes = [];

$(document).ready(function(){
    fetch ('../scripts/data.json')
    .then (response => response.json())
    .then (data => {
        const recettes = data.recettes;
        recettes.forEach(recette => {
            allRecettes.push(recette)
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
                let favHtml = '<li class="collection-item"><p>'+recette.nom+'</p><button class="supItem"><img src="../img/bin.png"></button><button class="voir">Voir la recette</button></li>';
                $('.collection').append(favHtml);
            }
        });

        //On configure le bouton supprimer de chaque élément de la liste
        $('.supItem').click(function(){
            $(this).parent().remove()
            //Ensuite on met a jour le localStorage
            let recette = $(this).siblings('p').text()
            let index = favListe.indexOf(recette)
            favListe.splice(index, 1)
            localStorage.setItem('favs', favListe)
        })
        // On active le dropdown
        $('.dropdown-trigger').dropdown();

        //Ici au clic du bouton on récupère l'id de chaque recette et on redirige vers sa page
        $('.voir').click(function(){
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