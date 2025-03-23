const allData = data; // Keep a copy

// Populate year dropdown dynamically
const yearSet = new Set(allData.map(d => d.year));
yearSet.forEach(year => {
  d3.select("#year-filter").append("option").attr("value", year).text(year);
});

function updateChart() {
  const selectedAgency = d3.select("#agency-filter").node().value;
  const selectedYear = d3.select("#year-filter").node().value;

  const filtered = allData.filter(d => 
    (!selectedAgency || d.agency === selectedAgency) &&
    (!selectedYear || d.year == selectedYear)
  );

  // Redraw chart with `filtered` data
  // ...
}

d3.select("#agency-filter").on("change", updateChart);
d3.select("#year-filter").on("change", updateChart);
