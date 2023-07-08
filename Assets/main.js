var apiKey = "f50913ffe5c0b70bd3897bb81bfef586";
function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
.then(response => response.json())
.then(data => {

})
.catch(error => console.log(error));
}

function displayCurrentWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('current-date').textContent = new Date(data.dt * 1000).toLocaleDateString();
    document.getElementById('current-temperature').textContent = data.main.temp;
    document.getElementById('current-humidity').textContent = data.main.humidity;
    document.getElementById('current-wind-speed').textContent = data.wind.speed;
}

document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var city = document.getElementById('city-input').value;
    fetchWeatherData(city);
});