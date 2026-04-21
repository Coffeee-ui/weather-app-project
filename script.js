/*// 1. Setup variables and paste your key here
const apiKey = "ec86bdc0cde588903424cb73ef9fb672";
const btn = document.getElementById("search-btn");
const input = document.getElementById("city-input");

// 2. The Async function (The "Brain")
async function checkWeather() {
  const city = input.value;
  // The URL address where the weather data lives
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    // AWAIT: Stop and wait for the server to answer
    const response = await fetch(url);

    // AWAIT: Stop and wait for the data to be converted to JSON
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found! Check your spelling.");
      return;
    }

    // 3. Update the HTML elements with our data
    document.getElementById("weather-info").style.display = "block";
    document.getElementById("city").innerText = data.name;
    document.getElementById("temp").innerText =
      Math.round(data.main.temp) + "°C";
    document.getElementById("desc").innerText = data.weather[0].description;
  } catch (error) {
    console.log("Something went wrong!");
  }
}

// 4. Run the function when the button is clicked
btn.addEventListener("click", checkWeather);
*/

// 1. Setup variables
const btn = document.getElementById("search-btn");
const input = document.getElementById("city-input");

// Function to convert city → coordinates (needed for Open-Meteo)
async function getCoordinates(city) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

  const res = await fetch(geoUrl);
  const data = await res.json();

  if (!data.results) {
    return null;
  }

  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude,
    name: data.results[0].name
  };
}

// 2. Main weather function
async function checkWeather() {
  const city = input.value;

  try {
    const location = await getCoordinates(city);

    if (!location) {
      alert("City not found!");
      return;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`;

    const response = await fetch(url);
    const data = await response.json();

    const weather = data.current_weather;

    // 3. Update UI
    document.getElementById("weather-info").style.display = "block";
    document.getElementById("city").innerText = location.name;
    document.getElementById("temp").innerText =
      Math.round(weather.temperature) + "°C";
    document.getElementById("desc").innerText =
      `Wind: ${weather.windspeed} km/h`;
  } catch (error) {
    console.log("Something went wrong!", error);
  }
}

// 4. Button click
btn.addEventListener("click", checkWeather);