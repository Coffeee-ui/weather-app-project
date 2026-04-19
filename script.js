// 1. Setup variables and paste your key here
const apiKey = "PASTE_YOUR_API_KEY_HERE";
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