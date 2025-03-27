// Define scales (outside the updateChart function)
const x = d3.scaleBand().range([0, width]).padding(0.1);
const y = d3.scaleLinear().range([height, 0]); // y-scale is linear, we'll set the domain in updateChart()

// Function to update the bar chart based on the selected year
function updateChart() {
    // Find the data for the selected year (ensure 'selectedYear' exists and is properly set)
    const yearData = data.find(d => d.year === selectedYear);

    // Set domain for the x and y scales
    x.domain(Object.keys(yearData).filter(key => key !== 'year')); // Exclude 'year' from x-axis
    y.domain([0.2, 35]); // Explicitly set y-scale from 0.2B (200 million) to 25B (25 billion)

    // Remove existing bars and axes before drawing new ones
    chartGroup.selectAll(".bar").remove();
    chartGroup.selectAll(".x-axis").remove();
    chartGroup.selectAll(".y-axis").remove();

    // Draw bars
    const bars = chartGroup.selectAll(".bar")
      .data(Object.entries(yearData).filter(([key, value]) => key !== 'year')); // Filter out the year key

    bars.enter().append("rect")
      .merge(bars)
      .attr("class", "bar")
      .attr("x", d => x(d[0])) // Position bars on the x-axis
      .attr("y", d => y(d[1])) // Position bars on the y-axis
      .attr("width", x.bandwidth()) // Set width for each bar
      .attr("height", d => height - y(d[1])) // Set height based on value
      .attr("fill", "steelblue");

    // Draw x-axis
    chartGroup.append("g")
      .attr("transform", `translate(0,${height})`) // Move to the bottom of the chart
      .call(d3.axisBottom(x)) // Add x-axis with the appropriate domain
      .attr("class", "x-axis");

    // Draw y-axis with formatting for billions (e.g., 1.2B, 25B)
    chartGroup.append("g")
      .call(d3.axisLeft(y).tickFormat(d => d3.format(".1f")(d) + "B")) // Format y-axis labels in billions
      .attr("class", "y-axis");
}


   