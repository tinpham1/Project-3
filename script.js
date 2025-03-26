fetch("http://127.0.0.1:5000/get_debris")  // Make a request to Flask server
    .then(response => response.json())
    .then(data => {
        console.log("Fetched data:", data);  // Log the full data structure

        // Initialize the Leaflet map
        const map = L.map('map').setView([0, 0], 1);  // Set default view (world map)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        // Function to filter data by satellite type and date
        function filterData() {
            const selectedType = document.getElementById("satelliteType").value;
            const selectedYear = document.getElementById("dateRange").value;

            const filteredData = data.filter(item => {
                const matchesType = selectedType === "all" || item.type === selectedType;
                const matchesDate = item.launchDate <= selectedYear;
                return matchesType && matchesDate;
            });

            updateMap(filteredData);
        }

        // Function to update map markers
        function updateMap(filteredData) {
            // Clear existing markers (if any)
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Add filtered markers to map
            filteredData.forEach(debris => {
                L.marker([debris.lat, debris.lon])
                    .addTo(map)
                    .bindPopup(`<b>${debris.name}</b><br>Type: ${debris.type}<br>Lat: ${debris.lat}<br>Lon: ${debris.lon}`);
            });
        }

        // Add an event listener to filter the data when the user changes the dropdown or slider
        document.getElementById("satelliteType").addEventListener("change", filterData);
        document.getElementById("dateRange").addEventListener("input", filterData);

        // Initial map load with all data
        updateMap(data);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
