 async function loadWeather() {
            const apiKey = "1b24da646ac949cd8e545018250312";
            const city = "Chennai";
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                const location = data.location.name;
                const region = data.location.region;
                const country = data.location.country;
                const temperature = data.current.temp_c;
                const condition = data.current.condition.text;
                const icon = data.current.condition.icon;
                const humidity = data.current.humidity;
                const windSpeed = data.current.wind_kph;
                const feelsLike = data.current.feelslike_c;
                const pressure = data.current.pressure_mb;
                const visibility = data.current.visibility_km;
                const weatherHTML = `
                    <p>
                        <strong>City:</strong> 
                        <span>${location}, ${region}, ${country}</span>
                    </p>
                    <p>
                        <strong> Temperature:</strong> 
                        <span>${temperature}°C</span>
                    </p>
                    <p>
                        <strong> Condition:</strong> 
                        <span>${condition}</span>
                    </p>
                    <p>
                        <strong> Humidity:</strong> 
                        <span>${humidity}%</span>
                    </p>
                    <p>
                        <strong> Wind Speed:</strong> 
                        <span>${windSpeed} km/h</span>
                    </p>
                    <p>
                        <strong> Feels Like:</strong> 
                        <span>${feelsLike}°C</span>
                    </p>
                  
                   
                `;
                document.getElementById("weather-widget").innerHTML = weatherHTML;
            } catch (error) {
                console.error("❌ Weather fetch error:", error);
                document.getElementById("weather-widget").innerHTML = `
                    <div class="error-msg">
                        <strong>❌ Error Loading Weather</strong><br>
                        ${error.message}<br>
                        <small>Please check your internet connection or API key.</small>
                    </div>
                `;
            }
        }
        function initMap() {
            const chennaiLat = 13.0827;
            const chennaiLng = 80.2707;
            const iitLat = 13.0194;
            const iitLng = 80.2624;
            const map = L.map("map").setView([chennaiLat, chennaiLng], 12);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: "© OpenStreetMap contributors",
                opacity: 0.95
            }).addTo(map);
            const iitMarker = L.marker([iitLat, iitLng], {
                title: "IIT Madras Campus"
            }).addTo(map);
            iitMarker.bindPopup(
                "<strong> IIT Madras</strong><br>"
            ).openPopup();
        }
        document.addEventListener("DOMContentLoaded", function () {
            loadWeather();
            initMap();
            setInterval(loadWeather, 30 * 60 * 1000);
        });