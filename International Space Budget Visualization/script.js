const data = {
    labels: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020], 
    datasets: [
      {
        label: 'NASA (USA)',
        data: [17.3, 17.74, 18.72, 18.45, 17.77, 16.87, 17.65, 18.01, 19.3, 19.51, 20.74, 21.5, 22.6],
        borderColor: 'rgba(255, 99, 132, 1)', 
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'CNSA (China)',
        data: [1.3, 1.3, 2.24, 2.4, 4.66, 6.11, 2.66, 3.23, 4.91, 5.37, 5.83, 11, 0],
        borderColor: 'rgba(54, 162, 235, 1)', 
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'Roscosmos (Russia)',
        data: [2.85, 2.4, 3.1, 3.8, 4.7, 5.6, 4.39, 3.27, 3.18, 3.68, 4.17, 4.17, 0],
        borderColor: 'rgba(75, 192, 192, 1)', 
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'CNES (France)',
        data: [2.43, 2.43, 2.5, 2.4, 2.5, 2.42, 2.17, 2.48, 2.79, 2.7, 3.16, 3.16, 0],
        borderColor: 'rgba(153, 102, 255, 1)', 
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'JAXA (Japan)',
        data: [1.71, 1.71, 2.46, 2.35, 2.19, 2.03, 1.76, 2.39, 3.02, 1.7, 3.06, 3.06, 0],
        borderColor: 'rgba(255, 159, 64, 1)',  
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'DLR (Germany)',
        data: [0.9, 0.9, 2, 1.97, 1.93, 1.89, 1.9, 2.5, 1.98, 4.27, 2.15, 2.15, 0],
        borderColor: 'rgba(255, 99, 255, 1)', 
        backgroundColor: 'rgba(255, 99, 255, 0.2)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'ASI (Italy)',
        data: [0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 0],
        borderColor: 'rgba(255, 205, 86, 1)',  
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'ISRO (India)',
        data: [0.3, 0.3, 0.4, 0.4, 0.62, 1.17, 1.19, 1.2, 1.3, 1.4, 1.41, 1.42, 0],
        borderColor: 'rgba(255, 159, 64, 1)',  
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'ESA (Europe)',
        data: [3, 3.9, 4.13, 4.72, 4.68, 4.77, 4.57, 5.2, 5.84, 6.4, 6.23, 6.37, 0],
        borderColor: 'rgba(75, 192, 192, 1)',  
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1
      }
    ]
  };
  
  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  };
  
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );