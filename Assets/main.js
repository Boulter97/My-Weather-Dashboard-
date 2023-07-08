var apiKey = "efbd3a3b69266572a5be3ec2308f31e";

function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
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
