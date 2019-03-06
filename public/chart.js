/* global Chart */
function makeChart(d) {
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Comics", "Events", "Series", "Stories"],
          datasets: [{
              label: 'Count',
              data: [d.comics.available, d.events.available, d.series.available, d.stories.available],
              backgroundColor: 'rgba(220, 12, 0, .6)',
              borderColor: 'rgba(240, 17, 0, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
}