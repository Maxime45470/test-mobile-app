const Weather = function () {
    const openweatherKey = '8d36a93339fa6f7c3207276794505a08';
    const openweatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';
    const openstreetUrl = 'https://nominatim.openstreetmap.org/reverse';
    const loadingMsg = 'Chargement...';
    const myLocation = {
        lat: 50.8503,
        lon: 4.3517
    };
	
    const init = function () {
        $('.progress').show();
        $('#weather').empty().hide();
        navigator.geolocation.getCurrentPosition(_geolocationSuccess, _geolocationError, {
            timeout: 5000,
            enableHighAccuracy: true
        });
    };
	
	const _geolocationSuccess = function (position) {
        console.log(position);
        myLocation.lat = position.coords.latitude;
        myLocation.lon = position.coords.longitude;
        console.log(`latitude: ${myLocation.lat} \nlongitude: ${myLocation.lon}`);
        _getWeather();
        _getCity();

    };
    const _geolocationError = function (error) {
        console.log(error);
        alert(`code: ${error.code}
            message: ${error.message}
            Please turn on your GPS`);
        _getWeather();
        _getCity();
	};

    const _getWeather = function (lat, lon) {
        // Create a object literal with all the query parameters
        const pars = {
            lat: myLocation.lat,
            lon: myLocation.lon,
            lang: 'fr',  // or en
            units: 'metric',
            exclude: 'minutely,hourly',
            appid: openweatherKey
        }
        console.log('API call:', `${openweatherUrl}?${$.param(pars)}`);
        
         // $.getJSON(url, [queryParameters], [successCallback]).done().fail().always()
    $.getJSON(openweatherUrl, pars, function (data) {
        console.log('weather', data);
        console.log('description', data.current.weather[0].description);
        try {
            const forecast = data.daily;
            $.each(forecast, function (index) {
                    const description = this.weather[0].description;
                    const temp = Math.round(this.temp.day);
                    const icon = this.weather[0].icon;
                    const iconId = this.weather[0].id;
                    const day = new Date(this.dt * 1000).getDay();
                    const clouds = this.clouds;
                    const dayArray = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
                    // const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const min = Math.round(this.temp.min);
                    const max = Math.round(this.temp.max);
                    const humidity = this.humidity;
                    const wind = this.wind_speed;
                    const gust = this.wind_gust;
                    const pressure = this.pressure;
                    const currentTime = new Date().getHours();
                    $('#day').append(
                        $("#day").html(dayArray[day]),
                    );
                    $('#meteo').append(
                        $("#meteo").html(temp + "°C"),
                    );
                    $('#icon').append(
                        $("#icon").html(`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="">`),
                    );
                    $('#temp').append(
                        $("#min").html(min + "°C"),
                    );
                    $('#tempm').append(
                        $("#max").html(max + "°C"),
                    );
                    $('#coord').append(
                        $("#coord").html('Lat : '+ myLocation.lat + ' Lon : '+ myLocation.lon),
                    );
                    $('clouds').append(
                        $("#clouds").html('La couverture nuageuse est de : ' + clouds + " %"),
                    );
                    $('humidity').append(
                        $("#humidity").html('L\'humidité est de : ' + humidity + " %"),
                    );
                    $('wind').append(
                        $("#wind").html('La vitesse du vent est de : ' + wind + " km/h"),
                    );
                    $('gust').append(
                        $("#gust").html('La rafale de vent est de : ' + gust + " km/h"),
                    );
                    $('pressure').append(
                        $("#pressure").html('La pression atmosphérique est de : ' + pressure + " hPa"),
                    );
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
            );
        } catch (err) {
            console.error(err.message);
            $('#city').text(err.message);
        }
    }).done(function () {
        // successCallback is over: show the weather forecast
        $('#weather').show();
    }).fail(function (jqxhr, textStatus, error) {
        // Something went wrong: successCallback and done() were not executed
        console.error(error);
        $('#city').text(error);
    }).always(function () {
        // After successCallback, done() or fail(): hide preloader
        $('.progress').hide();
    })
    };


    const _getCity = function () {
            const pars = {
                format: 'json',
                lat: myLocation.lat,
                lon: myLocation.lon
            };
            $.getJSON(openstreetUrl, pars, function (data) {
                console.log(data);
                const location = data.address.municipality || data.address.village || data.address.city_district || data.address.city || data.address.town || data.address.state;
                $('#city').html(location);
            });
        };

    return {
        loadingMsg: loadingMsg,     // public property
        init: init                  // public methode
    };
}();

