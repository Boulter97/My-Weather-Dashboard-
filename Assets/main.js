fetch(`https;//api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}'&appid=${apiKey}`)

.then(response => response.json())
.then(data => {

})
.catch(error => console.log(error));
