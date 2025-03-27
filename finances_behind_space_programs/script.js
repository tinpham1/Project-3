document.addEventListener("DOMContentLoaded", function () {
    // Fetch Space Agency Budget Data
    fetch("http://127.0.0.1:5000/budget")
        .then(response => response.json())
        .then(data => {
            console.log("General Budget Data:", data);
            renderChart("myChart", "Space Agency Budget", data);
        })
        .catch(error => console.error("Fetch error (Space Agency Budget):", error));

    // Fetch NASA Budget Data
    fetch("http://127.0.0.1:5000/nasa_budget")
        .then(response => response.json())
        .then(data => {
            console.log("NASA Budget Data:", data);
            renderChart("nasaChart", "NASA Budget Over Time", data);
        })
        .catch(error => console.error("Fetch error (NASA Budget):", error));

    function renderChart(canvasId, title, data) {
        const labels = data.map(d => d.year);
        const values = data.map(d => d.budget);

        const ctx = document.getElementById(canvasId).getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: values,
                    backgroundColor: "steelblue",
                    borderColor: "black",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});