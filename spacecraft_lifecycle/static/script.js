document.addEventListener("DOMContentLoaded", function () {
    const chartSelect = document.getElementById("charSelect");
    const ctx1 = document.getElementById("chartCanvas").getContext("2d");
    const ctx2 = document.getElementById("chartCanvas2").getContext("2d");
    const description1 = document.getElementById("chartDescription1");

    let chartInstance1 = null;
    let chartInstance2 = null;

    // Fetching Data based on chart type
    function fetchData(chartType) {
        let endpoint = "/rockets";
        const showLongevity = chartType === "reusability" || chartType === "expendable";
    
        if (chartType === "reusability") {
            endpoint = "/rockets/reusable";
        } else if (chartType === "expendable") {
            endpoint = "/rockets/expendable";
        } else if (chartType === "missions") {
            fetchMissionsPerYear();
            document.getElementById("chartCanvas2").style.display = "block";
        }
        
        // Chart 2 for Rocket Longevity Data
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                updateChart(data, chartType);
    
                if (showLongevity) {
                    document.getElementById("chartCanvas2").style.display = "block";
                    updateLongevityChart(data);
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    }
    
    // Function to allow charts to update via dropdown
    function updateChart(data, chartType) {
        
        // Tooltip Data Pull
        const sharedTooltipConfig = {
            callbacks: {
                label: function (context) {
                    const index = context.dataIndex;
                    const dataset = context.dataset;
                    const rocketData = dataset.meta?.[index];
                    
                    
                    if (!rocketData) return context.formattedValue;
                    
                    return [
                        `${rocketData.rocket}`,
                        `Company: ${rocketData.company}`,
                        `Status: ${rocketData.rocketstatus}`,
                        `Reusability: ${rocketData.reusability}`,
                        `Total Missions: ${rocketData.total_missions}`,
                        `First Mission: ${rocketData.first_mission.split(" ")[0]}`,
                        `Last Mission: ${rocketData.last_mission.split(" ")[0]}`
                    ];
                }
            }
        };
        
        if (chartInstance1) chartInstance1.destroy();
    
        let labels = data.map(r => r.rocket);
        
        // Default Charts
        if (chartType === "missions") {
            const activeData = data.map(r => r.rocketstatus === "Active" ? r.total_missions : 0);
            const retiredData = data.map(r => r.rocketstatus === "Retired" ? r.total_missions : 0);
    
            chartInstance1 = new Chart(ctx1, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Active Rockets",
                            data: activeData,
                            backgroundColor: "rgba(0, 123, 255, 0.5)",
                            borderColor: "rgba(0, 123, 255, 1)",
                            borderWidth: 1,
                            grouped: false,
                            meta: data
                        },
                        {
                            label: "Retired Rockets",
                            data: retiredData,
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                            grouped: false,
                            meta: data
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: sharedTooltipConfig
                    },
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
            
            // Narrative Text 
            description1.innerHTML = `
                <b>Trends from Mission and Spacecraft Data</b><br>
                <ul>
                    <li><b>What’s the most flown rocket?</b><br>
                    Falcon 9 Block 5 (SpaceX, Active, Reusable) leads the pack with 111 missions since its first launch in 2018.<br>
                    This highlights how SpaceX’s reusable design has enabled rapid mission cadence and modern launch dominance.</li>
                    <br>
                    <li><b>Do legacy rockets still leave an impact?</b><br>
                     Delta II 7925 (Boeing, Retired, Expendable) holds second place with 56 missions, despite retiring in 2006.<br>
                    NASA’s Space Shuttle Discovery, Atlantis, and Columbia also remain among the top, showing that older programs had long, consistent histories beginning in the 1980s.</li>
                    <br>
                    <li><b>What can we tell from Active vs. Retired?</b><br>
                    Active rockets (blue) dominate in mission totals despite being fewer in number, while many retired rockets (red) flew less than 10 missions.</li>
                    <br>
                    <li><b>How does reusability affect usage?</b><br>
                    Reusable rockets tend to have longer lifetimes and more missions. Expendables are often short-lived with fewer flights.</li>
                </ul>
            `;
        
        }
        
        // Reusability Chart
        else if (chartType === "reusability") {
            const dataset = data.map(r => r.total_missions);
    
            chartInstance1 = new Chart(ctx1, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Reusable Rockets",
                        data: dataset,
                        backgroundColor: "rgba(40, 167, 69, 0.5)",
                        borderColor: "rgba(40, 167, 69, 1)",
                        borderWidth: 1,
                        meta: data
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: sharedTooltipConfig
                    },
                    scales: {
                        x: {
                            title: { display: true, text: 'Rocket' },
                            ticks: {
                                autoSkip: false,
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
    
            description1.innerHTML = `
                <b>Quick Notes on Reusable Rockets</b><br>
                <ul>
                    <li>Falcon 9 Block 5 stands out with over 100 missions—more than all other reusable rockets combined.<br>
                    While SpaceX dominates recent usage, NASA's Space Shuttle fleet paved the way with dozens of reusable missions starting in the 1980s.</li>
                </ul>
            `;

        }
        
        // Expendable Chart
        else if (chartType === "expendable") {
            const dataset = data.map(r => r.total_missions);
    
            chartInstance1 = new Chart(ctx1, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Expendable Rockets",
                        data: dataset,
                        backgroundColor: "rgba(255, 193, 7, 0.5)",
                        borderColor: "rgba(255, 193, 7, 1)",
                        borderWidth: 1,
                        meta: data
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: sharedTooltipConfig
                    },
                    scales: {
                        x: {
                            title: { display: true, text: 'Rocket' },
                            ticks: {
                                autoSkip: false,
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
    
            description1.innerHTML = `
                <b>Quick Notes on Expendable Rockets</b><br>
                <ul>
                    <li>Delta II 7925 leads with 56 missions, followed by Atlas V 401—showing NASA and DoD reliance on legacy workhorses.
                    <br>
                    Very few rockets surpassed 10 missions. Most expendable rockets flew only a handful of times, highlighting their single-use nature and short life cycles.</li>
                </ul>
            `;
        
        }
    }
    
    // Missions over Time (Chart 2)
    async function fetchMissionsPerYear() {
        const response = await fetch('/missions-per-year');
        const data = await response.json();

        const labels = data.map(entry => entry.year);
        const missionCounts = data.map(entry => entry.mission_count);

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
                    }
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

    // Longevity Chart (Chart 2)
    function updateLongevityChart(data) {
        if (chartInstance2) chartInstance2.destroy();
    
        // Sort rockets by operation_days descending
        const sortedData = [...data].sort((a, b) => b.operation_days - a.operation_days);
    
        const labels = sortedData.map(r => r.rocket);
        const days = sortedData.map(r => r.operation_days);
    
        chartInstance2 = new Chart(ctx2, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Operational Days",
                        data: days,
                        backgroundColor: "rgba(100, 149, 237, 0.5)",
                        borderColor: "rgba(100, 149, 237, 1)",
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: { display: true, text: "Rocket" },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 90,
                            minRotation: 90
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: "Operational Days" }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const rocket = sortedData[context.dataIndex];
                                return [
                                    `${rocket.rocket}`,
                                    `Company: ${rocket.company}`,
                                    `Status: ${rocket.rocketstatus}`,
                                    `Reusability: ${rocket.reusability}`,
                                    `First Mission: ${rocket.first_mission.split(" ")[0]}`,
                                    `Last Mission: ${rocket.last_mission.split(" ")[0]}`,
                                    `Total Days Active: ${rocket.operation_days}`
                                ];
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Default Chart
    fetchData("missions");

    // Dropdown Chart Change
    chartSelect.addEventListener("change", function () {
        fetchData(chartSelect.value);
    });
});
