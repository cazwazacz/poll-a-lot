var pathname = window.location.pathname;
pathname = pathname.split('/');
pathname = pathname[pathname.length - 1];
console.log(pathname);
console.log(pathname);
$(document).ready(function () {
  var url = '/api/poll/' + pathname;

  $.getJSON(url, function(data){
    var labels = data.labels;
    var values = data.values;

    console.log(labels);
    console.log(values);

    const CHART = document.getElementById("lineChart");

    let lineChart = new Chart(CHART, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Poll",
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            data: values,
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              suggestedMin: 0
            }
          }]
        }
      }
    });
  });
});
