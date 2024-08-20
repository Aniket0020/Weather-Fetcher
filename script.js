document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value.trim();
    const apiKey = 'f98552f9a0a3330d74b1ab1a9e9d0d01'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const weatherResult = document.getElementById('weatherResult');
    if (city === '') {
        weatherResult.innerHTML = '<p class="error">Please enter a city name.</p>';
        return;
    }

    // Show loading spinner
    weatherResult.innerHTML = '<div class="loading-spinner"></div>';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                weatherResult.innerHTML = `
                    <div class="weather-detail">
                        <h2>${data.name}</h2>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind Speed: ${data.wind.speed} m/s</p>
                        <p>Weather: ${data.weather[0].description}</p>
                        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
                    </div>
                `;
            } else {
                weatherResult.innerHTML = `<p class="error">Error: ${data.message}</p>`;
            }
        })
        .catch(error => {
            weatherResult.innerHTML = `<p class="error">Error fetching weather data: ${error.message}</p>`;
        });
});
