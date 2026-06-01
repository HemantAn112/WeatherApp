document.getElementById("search").addEventListener("click", function () {
    const city = document.getElementById("city").value.trim();

    if (!city) {
        alert("Pehle city ka naam daalo!");
        return;
    }

    const url = `https://wttr.in/${city}?format=j1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const current = data.current_condition[0];
            const area = data.nearest_area[0];

            document.getElementById("city-name").textContent = "City: " + area.areaName[0].value;
            document.getElementById("temperature").textContent = "Temperature: " + current.temp_C + " °C";
            document.getElementById("description").textContent = "Description: " + current.weatherDesc[0].value;
            document.getElementById("humidity").textContent = "Humidity: " + current.humidity + " %";
            document.getElementById("wind-speed").textContent = "Wind Speed: " + current.windspeedKmph + " km/h";
            document.getElementById("feels-like").textContent = "Feels Like: " + current.FeelsLikeC + " °C";
        })
        .catch(error => {
            alert("City nahi mili, dobara try karo!");
        });
});