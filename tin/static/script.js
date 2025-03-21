document.addEventListener("DOMContentLoaded", function () {
    const chartSelect = document.getElementById("charSelect");
    const ctx1 = document.getElementById("chartCanvas").getContext("2d");
    const ctx2 = document.getElementById("chartCanvas2").getContext("2d");

    let chartInstance1 = null;
    let chartInstance2 = null;

    function fetchData(chartType) {
        let endpoint = "/rockets";

        if (chartType === "reusability") {
            endpoint = "/rockets/reusable";
            document.getElementById("chartCanvas2").style.display = "none";
        } else if (chartType === "expendable") {
            endpoint = "/rockets/expendable";
            document.getElementById("chartCanvas2").style.display = "none";
        } else if (chartType === "missions") {
            fetchMissionsPerYear();
            document.getElementById("chartCanvas2").style.display = "block";
        }

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                updateChart(data, chartType);
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function updateChart(data, chartType) {
        if (chartInstance1) chartInstance1.destroy();

        let labels, dataset, chartLabel, chartTypeOption;

        if (chartType === "missions") {
            labels = data.map(r => r.rocket);
            dataset = data.map(r => r.total_missions);
            chartLabel = "Total Missions per Rocket";
            chartTypeOption = "bar";
        } else if (chartType === "reusability") {
            labels = data.map(r => r.rocket);
            dataset = data.map(r => r.total_missions);
            chartLabel = "Reusable Rockets";
            chartTypeOption = "bar";
        } else if (chartType === "expendable") {
            labels = data.map(r => r.rocket);
            dataset = data.map(r => r.total_missions);
            chartLabel = "Expendable Rockets";
            chartTypeOption = "bar";
        }

        chartInstance1 = new Chart(ctx1, {
            type: chartTypeOption,
            data: {
                labels: labels,
                datasets: [{
                    label: chartLabel,
                    data: dataset,
                    backgroundColor: "rgba(0, 123, 255, 0.5)",
                    borderColor: "rgba(0, 123, 255, 1)",
                    borderWidth: 1,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: { display: true, text: 'Rocket' },
                        ticks: {
                            autoSkip: false,
                            maxTicksLimit: labels.length,
                            maxRotation: 90,
                            minRotation: 90
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Total Missions' }
                    }
                }
            }
        });
    }

    async function fetchMissionsPerYear() {
        const response = await fetch('/missions-per-year');
        const data = await response.json();

        const labels = data.map(entry => entry.year);
        const missionCounts = data.map(entry => entry.mission_count);
        const govtMissions = data.map(entry => entry.govt_missions);
        const privateMissions = data.map(entry => entry.private_missions);

        if (chartInstance2) chartInstance2.destroy();

        chartInstance2 = new Chart(ctx2, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Total Missions",
                        data: missionCounts,
                        borderColor: "blue",
                        backgroundColor: "rgba(0, 0, 255, 0.2)",
                        borderWidth: 2,
                        tension: 0.3
                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: { display: true, text: "Year" }
                    },
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: "Number of Missions" }
                    }
                }
            }
        });
    }

    fetchData("missions");

    chartSelect.addEventListener("change", function () {
        fetchData(chartSelect.value);
    });
});
