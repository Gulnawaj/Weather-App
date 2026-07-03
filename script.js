const apiKey = "899ac8486b1fcf2c95063192f0e8c2f6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {

    try {

        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;

        document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";

        document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";

        document.querySelector(".wind").innerHTML =
            Math.round(data.wind.speed * 3.6) + " km/h";

        const weatherMain = data.weather[0].main;

        if (weatherMain === "Clouds") {
            weatherIcon.src = "Images/clouds.png";
        }
        else if (weatherMain === "Clear") {
            weatherIcon.src = "Images/clear.png";
        }
        else if (weatherMain === "Rain") {
            weatherIcon.src = "Images/rain.png";
        }
        else if (weatherMain === "Drizzle") {
            weatherIcon.src = "Images/drizzle.png";
        }
        else if (weatherMain === "Mist") {
            weatherIcon.src = "Images/mist.png";
        }
        else if (weatherMain === "Snow") {
            weatherIcon.src = "Images/snow.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }

    catch (error) {

        console.log(error);

        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";

    }

}

searchBtn.addEventListener("click", () => {

    const city = searchBox.value.trim();

    if (city !== "") {
        checkWeather(city);
    }

});