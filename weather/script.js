const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city");
const weatherInfo = document.getElementById("weather-info");
const locationElement = document.getElementById("location");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const errorMessage = document.getElementById("error-message");

const apiKey = '52414743edec5adf10d96a61fb9d3c79';

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log("Fetching weather data for:", city);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod === "404") {
                showError("City not found. Please check the name.");
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            showError("An error occurred while fetching the weather data.");
        });
}

function displayWeather(data) {
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    description.textContent = `Description: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherInfo.style.display = 'block';
    errorMessage.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    weatherInfo.style.display = 'none';
}

// Event listener for the search button click
searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        showError("Please enter a city name.");
    }
});

// Event listener for pressing the Enter key
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            showError("Please enter a city name.");
        }
    }
});
