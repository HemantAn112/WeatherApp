document.getElementById("search").addEventListener("click", function () {
    const city = document.getElementById("city").value.trim();

    if (!city) {
        alert("Pehle city ka naam daalo!");
        return;
    }

    const API_KEY = "37efdddbd13956e5703b2e48b50b9e73";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            document.getElementById("city-name").textContent = "City: " + data.name + ", " + data.sys.country;
            document.getElementById("temperature").textContent = "Temperature: " + Math.round(data.main.temp) + " °C";
            document.getElementById("description").textContent = "Description: " + data.weather[0].description;
            document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity + " %";
            document.getElementById("wind-speed").textContent = "Wind Speed: " + Math.round(data.wind.speed * 3.6) + " km/h";
            document.getElementById("feels-like").textContent = "Feels Like: " + Math.round(data.main.feels_like) + " °C";
        })
        .catch(error => {
            alert("City nahi mili, dobara try karo!");
        });
});