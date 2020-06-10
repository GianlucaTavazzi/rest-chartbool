$(document).ready(function () {
    $.ajax({
        'url': 'http://157.230.17.132:4030/sales',
        'method': 'GET',
        'success': function(data) {
            var dati = data.results;
            console.log(dati);
        },
        'error': function() {
            console.log('errore');
        }
    });
})
