$(document).ready(function(){
    fetch('../scripts/data.json')
    .then(response => response.json())
    .then(data => {
        const recettes = data.recettes;
        console.log(recettes);

        // Construire une chaîne HTML contenant toutes les recettes et les étapes
        let dropdownList = '';
        recettes.forEach(recette => {
            localStorage.setItem(recette.nom, recette.img);
            dropdownList += '<li><a>'+recette.nom+'</a></li>'
        });

        $('#dropdown1').html(dropdownList)

        // Initialiser le dropdown après la construction du contenu HTML
        $('.dropdown-trigger').dropdown();

        // Ajout de l'événement click pour les boutons "Choose"
        $('#dropdown1 a').click(function(){
            let repasPending = $(this).text();
            localStorage.setItem("repasPending", repasPending);
        });

        //Ici on conserve les données de notre tableau en revenant sur la page ou en rechargeant
        //en récupérant leur données dans localStorage
        let tableIds = []
        $('table td').each(function(){
            let cellId = $(this).attr('id')
            let idStorage = localStorage.getItem(cellId)
            $(this).html(idStorage)
        })


        // Ajout de l'événement click pour les éléments 'td'
        $('td').click(function(){
            if ($(this).text()){
                localStorage.removeItem('repasPending')
                $(this).empty()
                tdId = $(this).attr('id')
                localStorage.removeItem(tdId)
            }
            //on récupère le repas cliqué dans le localStorage
            let repas = localStorage.getItem('repasPending');
            if (repas !== null){
               //on récupère l'image de chaque plat
                let image = localStorage.getItem(repas)
                console.log(image)
                //on ajoute le repas cliqué au tableau
                let newCell = '<div class="tabData"><img src="'+image+'"><p>'+repas+'</p></div>'
                $(this).html(newCell);
                //on met à jour le localStorage avec la nouvelle valeur
                let cellId = $(this).attr('id')
                localStorage.setItem(cellId, newCell) 
            }
            else{
                return false
            }
        });
    });
});

//Ici on configure le bouton de reset du tableau
$('.resetMenu').click(function(){
    $('table td').each(function(){
        tdId = $(this).attr('id')
        localStorage.removeItem(tdId)
        $(this).empty()
    })
})



  









