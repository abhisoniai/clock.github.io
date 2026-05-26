// Weather module JavaScript

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';
const STORAGE_KEY = 'chronos_city';

const weatherDisplay = document.getElementById('weather-value');
const refreshBtn = document.getElementById('refresh-weather');
const searchBtn = document.getElementById('search-weather');
const cityInput = document.getElementById('city-input');

let currentCity = 'London'; // Default city

function getWeatherCondition(code) {
    if (code === 0) return 'Clear';
    if (code >= 1 && code <= 3) return 'Cloudy';
    if (code === 45 || code === 48) return 'Foggy';
    if (code >= 51 && code <= 67) return 'Rainy';
    if (code >= 71 && code <= 77) return 'Snowy';
    if (code >= 80 && code <= 82) return 'Rainy';
    if (code >= 85 && code <= 86) return 'Snowy';
    if (code >= 95) return 'Thunderstorm';
    return 'Unknown';
}

function updateWeatherDisplay(data) {
    const condition = getWeatherCondition(data.weathercode);
    const temp = Math.round(data.temperature);
    weatherDisplay.textContent = `${condition}, ${temp}°C`;
}

function showError(message) {
    weatherDisplay.textContent = message;
}

function fetchWeather(lat, lon) {
    const url = `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current_weather=true`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather API error');
            }
            return response.json();
        })
        .then(data => {
            if (data.current_weather) {
                updateWeatherDisplay(data.current_weather);
            } else {
                throw new Error('No weather data available');
            }
        })
        .catch(error => {
            console.error('Weather fetch error:', error);
            showError('Unable to fetch weather. Try again.');
        });
}

function searchCity(city) {
    if (!city || city.trim() === '') return;

    weatherDisplay.textContent = 'Searching...';

    const url = `${GEOCODING_API}?name=${encodeURIComponent(city)}&count=5&language=en&format=json`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Geocoding API error');
            }
            return response.json();
        })
        .then(data => {
            if (data.results && data.results.length > 0) {
                // Find the best match or use top result
                const result = data.results[0];
                if (result.latitude && result.longitude) {
                    currentCity = result.name;
                    localStorage.setItem(STORAGE_KEY, currentCity);
                    fetchWeather(result.latitude, result.longitude);
                }
            } else {
                showError('City not found. Try another name.');
            }
        })
        .catch(error => {
            console.error('Geocoding error:', error);
            showError('Could not find city. Check spelling.');
        });
}

function refreshWeather() {
    // Search for the current city to get fresh weather
    searchCity(currentCity);
}

function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        searchCity(city);
        cityInput.value = '';
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    if (cityInput) {
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshWeather);
    }

    // Load saved city or use default
    const savedCity = localStorage.getItem(STORAGE_KEY);
    if (savedCity) {
        currentCity = savedCity;
    }

    // Fetch weather for the initial city
    searchCity(currentCity);
});
