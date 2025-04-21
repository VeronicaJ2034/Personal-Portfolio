//Regular JS (Line 2)
const ctx = document.getElementById('fruitChart').getContext('2d'); //Provides the context for the chart
    const fruitChart = new Chart(ctx, { //Creates a new chart
 // Chart.js Format
      type: 'bar', // Sets tyope of chart to bar
      data: { // Lists all the chart data
        labels: ['Apple', 'Banana', 'Cherry', 'Mango', 'Grapes'], //Provides labels
        datasets: [{
          label: 'Votes', //Provides the label for the chart
          data: [1, 5, 3, 2, 4], //Provides the data for the chart
          backgroundColor: [ //Provides the color for the chart
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(75, 192, 192, 0.6)'
          ],
          borderColor: [ //Provides the border color for the chart
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1 //Provides the border width for the chart
        }]
      },
      options: { //Provides the options for the chart
        scales: {  //Provides the scales for the chart
          y: { beginAtZero: true } 
        }
      }
    });