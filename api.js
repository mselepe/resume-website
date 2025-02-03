var locationEndpoint = 'http://ip-api.com/json/?fields=status,country,countryCode,city,lat,lon,timezone';

var latitude;
var longitude;
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var response = JSON.parse(this.responseText);
		if(response.status !== 'success') {
            console.log('query failed: ' + response.message);
			return
		}
        
        latitude = response.lat;
        longitude= response.lon;
        document.getElementById("location").innerHTML = response.city + ", " + response.country;

        var apikey = "9019764efdde88f9a7ad6ade03f90716";
        var weatherEndpoint = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+apikey

        // function getWeather() {
        fetch(weatherEndpoint, {
            "method": "GET",
            })
            .then(response => {
            return response.json();
            })
            .then(data => {
                document.getElementById("weather").innerHTML = "Weather conditions:\n";
                document.getElementById("temperature").innerHTML =  data.weather[0].description + ",\n" + (data.main.temp-273.15).toFixed(1) +"°C";
                console.log(data.main);
            })
            .catch(err => {
            console.error(err);
            });

	}
};
xhr.open('GET', locationEndpoint, true);
xhr.send();
console.log(latitude);

