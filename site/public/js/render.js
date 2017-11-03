window.addEventListener('load', function() {
    $('#params').load('/snippets/params.html', function() {
        $('#states').change(function() {
            getCounties()
            getCountyResultsByState()
        });
        $('#elections').change(function() {
            getCountyResultsByState()
        })
        getElections();
        getStates();
    })
});