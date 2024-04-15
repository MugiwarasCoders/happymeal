// Attente du chargement complet du document HTML
$(document).ready(function(){
    // Requête fetch pour récupérer les données du fichier JSON
    fetch('../scripts/data.json')
    .then(response => response.json()) // Convertit la réponse en JSON
    .then(data => {
        // Extraction des recettes du fichier JSON
        const recettes = data.recettes;

        // Construction d'une chaîne HTML contenant les favoris récupérés depuis le stockage local
        let dropdownList = '';
        let favoris = localStorage.getItem('favs')
        favoris = favoris.split(',');
        console.log(favoris)
        favoris.forEach(favori => {
            dropdownList += '<li><a>'+favori+'</a></li>'
        })

        // Insertion de la liste des favoris dans le dropdown
        $('#dropdown2').html(dropdownList)

        // Initialisation du dropdown après la construction du contenu HTML
        $('.dropdown-trigger').dropdown();

        // Ajout d'un événement click pour les boutons "Choose" dans le dropdown
        $('#dropdown2 a').click(function(){
            let repasPending = $(this).text();
            localStorage.setItem("repasPending", repasPending);
        });

        // Conservation des données de la table en récupérant les valeurs depuis le localStorage
        let tableIds = []
        $('table td').each(function(){
            let cellId = $(this).attr('id')
            let idStorage = localStorage.getItem(cellId)
            $(this).html(idStorage)
        })

        // Ajout d'un événement click pour les cellules de la table
        $('td').click(function(){
            if ($(this).text()){
                localStorage.removeItem('repasPending')
                $(this).empty()
                tdId = $(this).attr('id')
                localStorage.removeItem(tdId)
            }
            let repas = localStorage.getItem('repasPending');
            if (repas !== null){
                let image = localStorage.getItem(repas)
                console.log(image)
                let newCell = '<div class="tabData"><img src="'+image+'"><p>'+repas+'</p></div>'
                $(this).html(newCell);
                let cellId = $(this).attr('id')
                localStorage.setItem(cellId, newCell) 
            }
            else{
                return false
            }
        });
    });
});

// Configuration du bouton de reset du tableau
$('.resetMenu').click(function(){
    $('table td').each(function(){
        tdId = $(this).attr('id')
        localStorage.removeItem(tdId)
        $(this).empty()
    })
})
