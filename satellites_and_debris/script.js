// Helper to get a trace from country data
function getTrace(data) {
    return [{
      x: Object.keys(data),
      y: Object.values(data),
      type: 'bar'
    }];
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const countryData = {
      labels: ["CIS", "US", "PRC", "FR", "JPN", "IND", "UK", "TBD", "ESA", "GER"],
      values: [24963, 23374, 8425, 1455, 863, 754, 751, 379, 178, 121]
    };
  
    const data = [{
      type: "pie",
      hole: 0.4,
      labels: countryData.labels,
      values: countryData.values,
      textinfo: "label+percent",
      hoverinfo: "label+value+percent"
    }];
  
    const layout = {
      title: "Top 10 Countries by Number of Satellites",
      showlegend: true
    };
  
    Plotly.newPlot("countryChart", data, layout);
  });
  

