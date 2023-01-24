var apiKey = "f50913ffe5c0b70bd3897bb81bfef586";

fetch(`https;//api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}'&appid=${apiKey}`)

.then(response => response.json())
.then(data => {

})
.catch(error => console.log(error));
