const Weather = function () {
    const openweatherKey = '8d36a93339fa6f7c3207276794505a08';
    const openweatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';
    const openstreetUrl = 'https://nominatim.openstreetmap.org/reverse';
    const loadingMsg = 'Loading forecast...';
    const myLocation = ' ';
	
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
                    const icon = this.weather[0].icon;
                    const iconId = this.weather[0].id;
                    const day = new Date(this.dt * 1000).getDay();
                    const dayArray = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
                    // const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const min = Math.round(this.temp.min);
                    const max = Math.round(this.temp.max);
                    $('#meteo').append(
                        `<div class="card horizontal">
                                    <div class="card-image">
                                    <img src="https://openweathermap.org/img/w/${icon}.png" alt="">
                                    <p><span>${min}&#176;</span>-<span>${max}&#176;</span></p>
                                    </div>
                                    <div class="card-stacked">
                                       <div class="card-content">
                                          <h5>${dayArray[day]}</h5>
                                          <p>${description}</p>
                                       </div>
                                    </div>
                                </div>`
                    );
                }
            );
        } catch (err) {
            console.error(err.message);
            $('#city').text(err.message);
        }
    }).done(function () {
        // successCallback is over: show the weather forecast
        $('#meteo').show();
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

