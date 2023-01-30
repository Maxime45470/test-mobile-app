$(function () {
    document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady() {
    console.log('Device is ready');

    $('#renew')
        .click(function () {
            $('#city').text(Weather.loadingMsg);
            Weather.init();
        })
        .click();   // trigger click event on a#renew



    /* On surveille les cliques sur les liens du menu */
    jQuery(".tab-nav a").click(function (e) {
        /* On désactive l'action par défaut des liens */
        e.preventDefault();

        /* On récupère la valeur de l'onglet à activer */
        var tab = jQuery(this).data("tab");

        /* On masque tous les contenus */
        jQuery(".tab").removeClass("tab-active");

        /* On affiche le contenu qui doit l'être */
        jQuery("#" + tab).addClass("tab-active");

        /* On désactive tous les onglets */
        jQuery(".tab-nav a").removeClass("tab-nav-active");

        /* On active l'onglet qui a été cliqué */
        jQuery(this).addClass("tab-nav-active");
        $(selector).trigger('tap');

    });
}

function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('time').innerHTML =
        +h + ":" + m;
    let t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
startTime();


function nuage() {
    const currentTime = new Date().getHours();
    const clouds = this.clouds;
    if (currentTime >= 6 && currentTime <= 18) {
        if (clouds >= 0 && clouds <= 20) {
            $("#clouds").html("La couverture nuageuse est de : " + clouds + " %");
            $("body").css("background-image", "url('https://www.h24info.ma/wp-content/uploads/2017/12/CIEL-1.jpg'");

        }
        else if (clouds >= 21 && clouds <= 50) {
            $("#clouds").html("La couverture nuageuse est de : " + clouds + " %");
            $("body").css("background-image", "url('https://quid.ma/uploads/articles/large/5c0e40e4f41a2.jpg'");
        }
        else if (clouds >= 51 && clouds <= 100) {
            $("#clouds").html("La couverture nuageuse est de : " + clouds + " %");
            $("body").css("background-image", "url('https://media.istockphoto.com/photos/clouds-in-the-sky-picture-id893092946?k=20&m=893092946&s=612x612&w=0&h=bfvkiwKlWg41XQRQYXc_nbLsHWvAxygWP43t7vhdc0w=')");

        }
    }
    else {
        if (clouds >= 0 && clouds <= 20) {
            $("#clouds").html("La couverture nuageuse est de : " + clouds + " %");
            $("body").css("background-image", "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0nPqaDuSVajGmgRt_5TGa8cr_v_wFDchXeQ&usqp=CAU'");
        }
        else if (clouds >= 21 && clouds <= 50) {
            $("#clouds").html("La couverture nuageuse est de : " + clouds + " %");
            $("body").css("background-image", "url('https://c8.alamy.com/zoomsfr/9/b6373772ff7940d1b55d38ed053587dd/pry0rp.jpg'");
        }
        else if (clouds >= 51 && clouds <= 100) {
            $("#clouds").html("La couverture nuageuse est de : " + clouds + " %");
            $("body").css("background-image", "url('https://a-static.besthdwallpaper.com/lune-dans-la-nuit-nuageuse-fond-d-ecran-2048x768-84515_85.jpg'");
        }
    }
}
nuage();

