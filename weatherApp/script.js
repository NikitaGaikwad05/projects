function getWeather() {
    const location = document.getElementById("locationInput").value;

    if (location === "") {
        alert("Please enter a location");
        return;
    }

    const apiKey = "a856f2e33073481eb22191554260602";
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const weatherResult = document.getElementById("weatherResult");

            if (data.error) {
                weatherResult.innerHTML = `<p>❌ Location not found</p>`;
            } else {
                weatherResult.innerHTML = `
                    <p><strong>📍 Location:</strong> ${data.location.name}, ${data.location.country}</p>
                    <p><strong>🌡 Temperature:</strong> ${data.current.temp_c} °C</p>
                    <p><strong>☁ Condition:</strong> ${data.current.condition.text}</p>
                `;
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            document.getElementById("weatherResult").innerHTML =
                `<p>⚠ Error fetching data</p>`;
        });
}
