console.log('you are at poll.html');


/*$(document).ready(function() {
  $.getJSON("/api/data", function (data) {

    /*var list = document.getElementById("pollList");

    for (let i=0; i<data.length; i++) {
      var name = data[i].name;
      list.innerHTML += '<a href="/poll/' + name + '">' + name + '<br></a>';
    }*/

    var labels = data[0].labels;

    var values = data[0].values;


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
*/
