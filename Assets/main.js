const apiKey = '58120be6fb5432a91d6e5a8554033674';
const searchHistory = [];

document.getElementById('search-button').addEventListener('click', clearPreviousSearch);

function clearPreviousSearch() {
  const currentCityElement = document.getElementById('current-city');
  if (currentCityElement) {
    currentCityElement.textContent = '';
  }

  const temperatureElement = document.getElementById('temperature');
  if (temperatureElement) {
    temperatureElement.textContent = '';
  }

  const humidityElement = document.getElementById('humidity');
  if (humidityElement) {
    humidityElement.textContent = '';
  }

  const windSpeedElement = document.getElementById('wind-speed');
  if (windSpeedElement) {
    windSpeedElement.textContent = '';
  }

  const currentImgElement = document.getElementById('currentImg');
  if (currentImgElement) {
    currentImgElement.innerHTML = '';
  }

  fetchAPI();
}

function fetchAPI() {
  const inputElement = document.getElementById('city-search');
  if (!inputElement) {
    console.error('Input element with id "city-search" not found.');
    return;
  }

  const citySearch = inputElement.value;
  if (citySearch === '') {
    document.getElementById('error-message').textContent = 'Please enter a city';
    return;
  }

  inputElement.value = '';

  const latLonUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&limit=5&appid=${apiKey}`;

  fetch(latLonUrl)
    .then(response => response.json())
    .then(geocodeData => {
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-primary', 'm-2');
      button.innerHTML = citySearch;

      button.addEventListener('click', function() {
        const theCity = citySearch;
        const inputBox = document.querySelector('#city-search');
        inputBox.value = theCity;
        clearPreviousSearch();
      });

      document.querySelector('#previous-searches').appendChild(button);

      const cities = citySearch;
      const citiesJSON = JSON.stringify(cities);
      localStorage.setItem('searchedCities', citiesJSON);
      const citiesFromLS = localStorage.getItem('searchedCities');
      const citiesAsJS = JSON.parse(citiesJSON);
      const newCity = cities;
      button.innerHTML = citiesAsJS;

      const latitude = geocodeData[0].lat;
      const longitude = geocodeData[0].lon;
      const fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      fetch(fiveDayURL)
        .then(response => response.json())
        .then(fiveDayData => {
          const fiveDayArray = fiveDayData.list;

          const img = document.createElement('img');
          img.src = `http://openweathermap.org/img/wn/${fiveDayArray[0].weather[0].icon}.png`;
          document.getElementById('currentImg').appendChild(img);
          document.getElementById('current-city').textContent = geocodeData[0].local_names.en;
          document.getElementById('temperature').textContent = `${(fiveDayArray[0].main.temp - 273.15).toFixed(2)}°C`;
          document.getElementById('humidity').textContent = `${fiveDayArray[0].main.humidity}%`;
          document.getElementById('wind-speed').textContent = `${fiveDayArray[0].wind.speed} MPH`;

          const futureDays = [
            { index: 8, dateId: 'futureDate0', imgId: 'futureImg0', tempId: 'futureTemp0', humidityId: 'futureHumidity0' },
            { index: 16, dateId: 'futureDate1', imgId: 'futureImg1', tempId: 'futureTemp1', humidityId: 'futureHumidity1' },
            { index: 24, dateId: 'futureDate2', imgId: 'futureImg2', tempId: 'futureTemp2', humidityId: 'futureHumidity2' },
            { index: 32, dateId: 'futureDate3', imgId: 'futureImg3', tempId: 'futureTemp3', humidityId: 'futureHumidity3' },
            { index: 39, dateId: 'futureDate4', imgId: 'futureImg4', tempId: 'futureTemp4', humidityId: 'futureHumidity4' }
          ];
          
    

          futureDays.forEach(day => {
            const dateElement = document.getElementById(day.dateId);
            const imgElement = document.getElementById(day.imgId);
            const tempElement = document.getElementById(day.tempId);
            const humidityElement = document.getElementById(day.humidityId);

            if (dateElement) {
              dateElement.textContent = fiveDayArray[day.index].dt_txt;
            }
            if (imgElement) {
              const img = document.createElement('img');
              img.src = `http://openweathermap.org/img/wn/${fiveDayArray[day.index].weather[0].icon}.png`;
              imgElement.appendChild(img);
            }
            if (tempElement) {
              tempElement.textContent = `${(fiveDayArray[day.index].main.temp - 273.15).toFixed(2)}°C`;
            }
            if (humidityElement) {
              humidityElement.textContent = `${fiveDayArray[day.index].main.humidity}%`;
            }
          });
        })
        .catch(error => {
          console.error('Error fetching forecast data:', error);
        });
    });
}

