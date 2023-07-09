var apiKey = "93d4c98435c33eae6a138803f52421ec";
var searchHistory = [];

function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            saveSearchHistory(city);
        })
        .catch(error => console.log(error));
}

function displayCurrentWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('current-date').textContent = new Date(data.dt * 1000).toLocaleDateString();
    document.getElementById('current-temperature').textContent = data.main.temp;
    document.getElementById('current-humidity').textContent = data.main.humidity;
    document.getElementById('current-wind-speed').textContent = data.wind.speed;
  
    var iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    var iconImg = document.createElement('img');
    iconImg.src = iconUrl;
    document.getElementById('current-icon').innerHTML = '';
    document.getElementById('current-icon').appendChild(iconImg);
  }
  
function saveSearchHistory(city) {
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    displaySearchHistory();
}

function displaySearchHistory() {
    var searchHistoryList = document.getElementById('search-history-list');
    searchHistoryList.innerHTML = '';
    searchHistory.forEach(city => {
        var li = document.createElement('li');
        li.textContent = city;
        li.addEventListener('click', function() {
            fetchWeatherData(city);
        });
        searchHistoryList.appendChild(li);
    });
}

document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var city = document.getElementById('city-input').value;
    fetchWeatherData(city);
});

window.addEventListener('DOMContentLoaded', function() {
    var storedSearchHistory = localStorage.getItem('searchHistory');
    if (storedSearchHistory) {
        searchHistory = JSON.parse(storedSearchHistory);
        displaySearchHistory();
    }
});
