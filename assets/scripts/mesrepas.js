$(document).ready(function(){
    fetch('../scripts/data.json')
    .then(response => response.json())
    .then(data => {
        const recettes = data.recettes;
        console.log(recettes);

        // Construire une chaîne HTML contenant toutes les recettes et les étapes
        let repasListHTML = '';
        recettes.forEach(recette => {
            localStorage.setItem(recette.nom, "");
            repasListHTML += '<div class="cartes_latérales" ><img src="'+recette.img+'"><div><h2>'+recette.nom+'</h2><button class="btn btn-primary btn-lg">Choisir</button></div></div>'
        });

        // Mettre à jour le contenu HTML de la liste d'éléments repas une seule fois
        $('.repas').html(repasListHTML);

        // Ajout de l'événement click pour les boutons "Choose"
        $('.btn').click(function(){
            let repasPending = $(this).closest('.cartes_latérales').find('h2').text();
            localStorage.setItem("repasPending", repasPending);
        });

        //On récupère d'abord les éléments déjà existants du tableau
        //PETITS-DEJEUNERS
        //pd1
        let pd1 = localStorage.getItem('pd1')
        $('#pd1').html(pd1)
        //pd2
        let pd2 = localStorage.getItem('pd2')
        $('#pd2').html(pd2)
        //pd3
        let pd3 = localStorage.getItem('pd3')
        $('#pd3').html(pd3)
        //pd4
        let pd4 = localStorage.getItem('pd4')
        $('#pd4').html(pd4)
        //pd5
        let pd5 = localStorage.getItem('pd5')
        $('#pd5').html(pd5)
        //pd6
        let pd6 = localStorage.getItem('pd6')
        $('#pd6').html(pd6)
        //pd7
        let pd7 = localStorage.getItem('pd7')
        $('#pd7').html(pd7)

        //DEJEUNERS
        //dp1
        let dp1 = localStorage.getItem('dp1')
        $('#dp1').html(dp1)
        //dd1
        let dd1 = localStorage.getItem('dd1')
        $('#dd1').html(dd1)
        //dp2
        let dp2 = localStorage.getItem('dp2')
        $('#dp2').html(dp2)
        //dd2
        let dd2 = localStorage.getItem('dd2')
        $('#dd2').html(dd2)
        //dp3
        let dp3 = localStorage.getItem('dp3')
        $('#dp3').html(dp3)
        //dd3
        let dd3 = localStorage.getItem('dd3')
        $('#dd3').html(dd3)
        //dp4
        let dp4 = localStorage.getItem('dp4')
        $('#dp4').html(dp4)
        //dd4
        let dd4 = localStorage.getItem('dd4')
        $('#dd4').html(dd4)
        //dp5
        let dp5 = localStorage.getItem('dp5')
        $('#dp5').html(dp5)
        //dd5
        let dd5 = localStorage.getItem('dd5')
        $('#dd5').html(dd5)
        //dp6
        let dp6 = localStorage.getItem('dp6')
        $('#dp6').html(dp6)
        //dd6
        let dd6 = localStorage.getItem('dd6')
        $('#dd6').html(dd6)
        //dp7
        let dp7 = localStorage.getItem('dp7')
        $('#dp7').html(dp7)
        //dd7
        let dd7 = localStorage.getItem('dd7')
        $('#dd7').html(dd7)

        //DINERS
        //dip1
        let dip1 = localStorage.getItem('dip1')
        $('#dip1').html(dip1)
        //did1
        let did1 = localStorage.getItem('did1')
        $('#did1').html(did1)
        //dip2
        let dip2 = localStorage.getItem('dip2')
        $('#dip2').html(dip2)
        //did2
        let did2 = localStorage.getItem('did2')
        $('#did2').html(did2)
        //dip3
        let dip3 = localStorage.getItem('dip3')
        $('#dip3').html(dip3)
        //did3
        let did3 = localStorage.getItem('did3')
        $('#did3').html(did3)
        //dip4
        let dip4 = localStorage.getItem('dip4')
        $('#dip4').html(dip4)
        //did4
        let did4 = localStorage.getItem('did4')
        $('#did4').html(did4)
        //dip5
        let dip5 = localStorage.getItem('dip5')
        $('#dip5').html(dip5)
        //did5
        let did5 = localStorage.getItem('did5')
        $('#did5').html(did5)
        //dip6
        let dip6 = localStorage.getItem('dip6')
        $('#dip6').html(dip6)
        //did6
        let did6 = localStorage.getItem('did6')
        $('#did6').html(did6)
        //dip7
        let dip7 = localStorage.getItem('dip7')
        $('#dip7').html(dip7)
        //did7
        let did7 = localStorage.getItem('did7')
        $('#did7').html(did7)

        // Ajout de l'événement click pour les éléments 'td'
        $('td').click(function(){
            let repasPending = localStorage.getItem('repasPending');
            $(this).html('<p>'+repasPending+'</p>');
            let cellId = $(this).attr('id')
            localStorage.setItem(cellId, repasPending)
            $('#'+cellId+' p').html(repasPending)
        });
    });
});






