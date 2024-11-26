function fetchWeather() {
    const selectedCity = document.getElementById('city-select').value;
    const API_KEY = "d8141703bbdf421fb0825733242604";
    const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${selectedCity}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const temperature = data.current.temp_c;
            const humidity = data.current.humidity;
            const pressure = data.current.pressure_mb;

            const weatherInfo = document.querySelector('.weather-info');
            weatherInfo.innerHTML = `
                <p>Temperature: ${temperature} °C</p>
                <p>Humidity: ${humidity} %</p>
                <p>Pressure: ${pressure} hPa</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const weatherInfo = document.querySelector('.weather-info');
            weatherInfo.innerHTML = `<p>Error fetching weather data.</p>`;
        });
}


document.addEventListener('DOMContentLoaded', () => {
    const addCityForm = document.getElementById('add-city-form');
    addCityForm.addEventListener('submit', event => {
        event.preventDefault();
        const newCityInput = document.getElementById('new-city');
        const newCity = newCityInput.value.trim();
        if (newCity !== '') {
            const citySelect = document.getElementById('city-select');
            const newOption = document.createElement('option');
            newOption.value = newCity;
            newOption.textContent = newCity;
            citySelect.appendChild(newOption);
            fetchWeather(newCity);
        }
        newCityInput.value = '';
    });
});

// Function to handle refresh button click
function handleRefresh() {
    const selectedCity = document.getElementById('city-select').value;
    fetchWeather(selectedCity);
}

// Attach event listener to refresh button
const refreshButton = document.querySelector('button');
refreshButton.addEventListener('click', handleRefresh);
