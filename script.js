const API_KEY = "37efdddbd13956e5703b2e48b50b9e73";

const icons = {
    'clear sky': '☀️', 'few clouds': '🌤️', 'scattered clouds': '⛅',
    'broken clouds': '🌥️', 'overcast clouds': '☁️',
    'shower rain': '🌦️', 'rain': '🌧️', 'light rain': '🌧️',
    'moderate rain': '🌧️', 'thunderstorm': '⛈️', 'snow': '❄️', 'mist': '🌫️',
    'haze': '🌫️', 'fog': '🌫️', 'smoke': '🌫️', 'dust': '🌪️',
};

function getIcon(desc) {
    const d = desc.toLowerCase();
    for (const [k, v] of Object.entries(icons)) {
        if (d.includes(k)) return v;
    }
    return '🌡️';
}

async function fetchWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) return;

    const hero  = document.getElementById('hero');
    const error = document.getElementById('error');

    if (hero)  hero.innerHTML = '<p>Dhoondh raha hoon… ⏳</p>';
    if (error) error.textContent = '';

    ['temp', 'humidityy', 'wind', 'Description'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '–';
    });

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const res  = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) throw new Error(data.message || 'Shehar nahi mila');

        const { name, main, wind, weather } = data;
        const desc = weather[0].description;
        const icon = getIcon(desc);

        if (hero) {
            hero.innerHTML = `
                <div>${icon}</div>
                <h2>${name}</h2>
                <h1>${Math.round(main.temp)}°C</h1>
                <p>${desc}</p>
            `;
        }

        const temp        = document.getElementById('temp');
        const humidityy   = document.getElementById('humidityy');
        const windEl      = document.getElementById('wind');
        const descEl      = document.getElementById('Description');

        if (temp)      temp.textContent      = `${Math.round(main.temp)} °C`;
        if (humidityy) humidityy.textContent  = `${main.humidity}%`;
        if (windEl)    windEl.textContent     = `${wind.speed} m/s`;
        if (descEl)    descEl.textContent     = desc;

    } catch (err) {
        if (hero)  hero.innerHTML    = '<p>Kuch galat hua 😔</p>';
        if (error) error.textContent = `⚠️ ${err.message}`;
    }
}

document.getElementById('search').addEventListener('click', fetchWeather);
document.getElementById('city').addEventListener('keydown', e => {
    if (e.key === 'Enter') fetchWeather();
});