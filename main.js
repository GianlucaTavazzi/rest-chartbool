$(document).ready(function () {
    $.ajax({
        'url': 'http://157.230.17.132:4030/sales',
        'method': 'GET',
        'success': function(data) {
            monthrevenue(data);
            percentagerevenue(data);
        },
        'error': function() {
            console.log('errore');
        }
    });

    function monthrevenue(data) {
        var vendite_mensili = {
        'January': 0,
        'February': 0,
        'March': 0,
        'April': 0,
        'May': 0,
        'June': 0,
        'July': 0,
        'August': 0,
        'September': 0,
        'October': 0,
        'November': 0,
        'December': 0,
    };

        for (var i = 0; i < data.length; i++) {
            var dati = data[i];
            var month_data = dati.date;
            var amount = dati.amount;

            var mese = moment(month_data, "DD-MM-YYYY");

            if(!vendite_mensili.hasOwnProperty(mese.format('MMMM'))) {
                vendite_mensili[mese.format('MMMM')] = amount;
            } else {
                vendite_mensili[mese.format('MMMM')] += amount;
            }
        }

        console.log(vendite_mensili);
        var chiavi = Object.keys(vendite_mensili);
        var valori = Object.values(vendite_mensili)

        var ctx = $('#myChartuno')[0].getContext('2d')
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chiavi,
                datasets: [{
                    label: 'Vendite Mensili',
                    data: valori,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    function percentagerevenue(data) {
        var vendite_percentuali = {};
        var totale = 0;
        for (var i = 0; i < data.length; i++) {
            var dati = data[i];
            var totale = totale + dati.amount;
        }

        for (var i = 0; i < data.length; i++) {
            var dati = data[i];
            var salesman_data = dati.salesman;
            var amount = dati.amount;

            if(!vendite_percentuali.hasOwnProperty(salesman_data)) {
                vendite_percentuali[salesman_data] = amount*100/totale;
            } else {
                vendite_percentuali[salesman_data] += amount*100/totale;
            }
        }

        for (const salesman_data in vendite_percentuali) {
            var numero = (vendite_percentuali[salesman_data]).toFixed(2);
            vendite_percentuali[salesman_data] = numero;
        }

        console.log(totale);

        console.log(vendite_percentuali);

        var chiavi = Object.keys(vendite_percentuali);
        var valori = Object.values(vendite_percentuali);

        var ctx = $('#myChartdue')[0].getContext('2d')
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: chiavi,
                datasets: [{
                    label: 'Vendite Percentuali',
                    data: valori,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(145, 61, 136, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(145, 61, 136, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {}
        });
    }

})
