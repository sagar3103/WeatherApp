const iconElement = document.querySelector('.weather-icon');
const locationIcon = document.querySelector('.location-icon');
const tempElement = document.querySelector('.temprature-value p');
const descElement = document.querySelector('.temprature-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

var input = document.getElementById('search');
let city = '';
let latitude = 0.0;
let longitude = 0.0;

input.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        city = input.value;
        console.log(city);
        getWeatherByCity(city);
    }
});

const weather = {};
weather.temprature = {
    unit: "celsius"
};

const KELVIN = 273;
const key = 'b3aaa0b3323c0baab93aff38f75b44cb';

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = '<p>Browser doesn\'t support location</p>';
}

function setPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p>${error.message}</p>`;
} 

locationIcon.addEventListener('click', function(event) {
    console.log('clicked');
    getWeather(latitude, longitude);
});

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
    fetch(api)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('weatherData', JSON.stringify(data));
            window.location.href = 'weather.html';
        });
}

function getWeatherByCity(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    fetch(api)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('weatherData', JSON.stringify(data));
            window.location.href = 'weather.html';
        });
}
