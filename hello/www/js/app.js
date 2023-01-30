$(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady() {
    console.log('Device is ready');
   
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
        
    
        $('#renew').on('click', function () {
            var valeur = $('#city').val();
            var url2 = "https://api.openweathermap.org/data/2.5/weather?q=" + valeur + "&APPID=8d36a93339fa6f7c3207276794505a08&units=metric&lang=fr";
    
    
            $.ajax({
                url: url2,
    
                //L'URL de la requête 
    
    
                //La méthode d'envoi (type de requête)
                method: "GET",
    
                //Le format de réponse attendu
                dataType: "json",
            })
                //Ce code sera exécuté en cas de succès - La réponse du serveur est passée à done()
                /*On peut par exemple convertir cette réponse en chaine JSON et insérer
                 * cette chaine dans un div id="res"*/
                .done(function (response) {
                    let data1 = JSON.parse(response.main.temp);
                    $("#meteo").html(data1 + "°C");
                    $("#icon").html(" <img src=" + "http://openweathermap.org/img/wn/" + response.weather[0]['icon'] + "@2x.png" + " > ");
                    let data2 = JSON.parse(response.main.temp_min);
                    $("#min").html(data2 + "°C min");
                    let data3 = JSON.parse(response.main.temp_max);
                    $("#max").html(data3 + "°C max");
                    let data4 = JSON.parse(response.main.humidity);
                    $("#humidity, #humidity2").html("Le taux d'humidité est de :" + " " + data4 + " " + "%");
                    let data5 = JSON.parse(response.wind.speed);
                    $("#wind, #wind2").html("La vitesse du vent est de : " + data5 + "km/h");
                    let data6 = JSON.parse(response.main.pressure);
                    $("#pressure, #pressure2").html("La pression est de : " + data6 + "hPa");
    
                    let data7 = JSON.parse(response.coord.lat);
                    let data8 = JSON.parse(response.coord.lon);
                    $("#coord, #coord2").html("Latitude ="+ " " + data7 + " ° " + " / " + " Longitude ="+ " " + data8 + " ° ");
                    let data9 = JSON.parse(response.wind.gust); 
                    $("#gust, #gust2").html("Rafal de vent à : " + data9 + "km/h");
                    let data10 = JSON.parse(response.wind.deg);
                    $("#deg, #deg2").html(data10 + "°");
    
                    function nuage() {
                        var currentTime = new Date().getHours();
                        var nuage = JSON.parse(response.clouds.all);
                        if (currentTime >= 6 && currentTime <= 18) {
                            if (nuage >= 0 && nuage <= 20) {
                                $("#clouds").html("La couverture nuageuse est de : " + nuage + " %");
                                $("body").css("background-image", "url('https://www.h24info.ma/wp-content/uploads/2017/12/CIEL-1.jpg'");
                             
                            }
                            else if (nuage >= 21 && nuage <= 50) {
                                $("#clouds").html("La couverture nuageuse est de : " + nuage + " %");
                                $("body").css("background-image", "url('https://quid.ma/uploads/articles/large/5c0e40e4f41a2.jpg'");
                            }
                            else if (nuage >= 51 && nuage <= 100) {
                                $("#clouds").html("La couverture nuageuse est de : " + nuage + " %");
                                $("body").css("background-image", "url('https://media.istockphoto.com/photos/clouds-in-the-sky-picture-id893092946?k=20&m=893092946&s=612x612&w=0&h=bfvkiwKlWg41XQRQYXc_nbLsHWvAxygWP43t7vhdc0w=')");
                              
                            }
                        }
                        else {
                            if (nuage >= 0 && nuage <= 20) {
                                $("#clouds").html("La couverture nuageuse est de : " + nuage + " %");
                                $("body").css("background-image", "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0nPqaDuSVajGmgRt_5TGa8cr_v_wFDchXeQ&usqp=CAU'");
                            }
                            else if (nuage >= 21 && nuage <= 50) {
                                $("#clouds").html("La couverture nuageuse est de : " + nuage + " %");
                                $("body").css("background-image", "url('https://c8.alamy.com/zoomsfr/9/b6373772ff7940d1b55d38ed053587dd/pry0rp.jpg'");
                            }
                            else if (nuage >= 51 && nuage <= 100) {
                                $("#clouds").html("La couverture nuageuse est de : " + nuage + " %");
                                $("body").css("background-image", "url('https://a-static.besthdwallpaper.com/lune-dans-la-nuit-nuageuse-fond-d-ecran-2048x768-84515_85.jpg'");
                            }
                        }
                    }
                    nuage();
                })
    
        });
    };
    
    
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
    
    

