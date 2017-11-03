function getElections() {
    let elections = $('#elections')
    elections.empty()
    $.get('/api/get-elections', function(data) {
        data.forEach(function(year) {
            elections.append($('<option>').text(year))
        })
    })
}  

function getStates() {
    let states = $('#states')
    states.empty()
    $.get('/api/get-states', function(data) {
        data.forEach(function(state) {
            states.append($('<option>').text(state))
        })
        getCounties()
    })
}

function getCounties() {
    let stateSel = $('#states')
    let counties = $('#counties')
    let state = $('#states option:selected').text()
    counties.empty()
    $.get('/api/get-counties?state=' + encodeURI(state), function(data) {
        data.forEach(function(county) {
            counties.append($('<option>').text(county[1]))
        })
    })
}

function getResultsByState() {
    // get values from selections for params
    let election = $('#elections option:selected').text()
    
    // load html results table snippet 
    $('#tbl').load('/snippets/results-table.html')

    // empties the table 
    let tbl = $('#results-table > tbody')
    tbl.empty()

    // posts data
    $.post('/api/get-state-results-by-county', {state: state, election: election}, function(data) {
        data.forEach(function(result) {
            let row = $('<tr>')
                .append($('<td>').text(result.county))
                .append($('<td>').text(parseInt(result.dem).toLocaleString() + '\n' + result.dem_per + '%'))
                .append($('<td>').text(parseInt(result.rep).toLocaleString() + '\n' + result.rep_per + '%'))
                .append($('<td>').text(parseInt(result.other).toLocaleString()+ '\n' + result.oth_per + '%'))
            $('#results-table > tbody').append(row)
        })
    })
}

function getCountyResultsByState() {
    // get values from selections for params
    let election = $('#elections option:selected').text()
    let state = $('#states option:selected').text()
    
    // load html results table snippet 
    $('#tbl').load('/snippets/results-table.html')

    // empties the table 
    let tbl = $('#results-table > tbody')
    tbl.empty()

    // posts data
    $.post('/api/get-state-results-by-county', {state: state, election: election}, function(data) {
        data.forEach(function(result) {
            let row = $('<tr>')
                .append($('<td>').text(result.county))
                .append($('<td>').text(parseInt(result.dem).toLocaleString() + '\n' + result.dem_per + '%'))
                .append($('<td>').text(parseInt(result.rep).toLocaleString() + '\n' + result.rep_per + '%'))
                .append($('<td>').text(parseInt(result.other).toLocaleString()+ '\n' + result.oth_per + '%'))
            $('#results-table > tbody').append(row)
        })
    })
}

