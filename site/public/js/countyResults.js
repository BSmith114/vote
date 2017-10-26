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

function getCountyResultsByStates() {
    var stateSel = document.getElementById("states");
    var state = stateSel.options[stateSel.selectedIndex].text;

    var electionsSel = document.getElementById("elections");
    var election = electionsSel.options[electionsSel.selectedIndex].text;
    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.lastChild)
    }
    var xhr = new XMLHttpRequest()
    var url = "/api/get-state-results-by-county";
    var params = "state=" + encodeURI(state) + "&election=" + encodeURI(election);
    xhr.onreadystatechange = function() {            
        if (this.readyState == 4 && this.status == 200) {
            headerData = ['County', 'Democrat', 'Republican', 'Other']

            /* Creates table */
            tableDiv = document.getElementById('tbl');
            tbl = document.createElement("table");
            tbl.setAttribute('class', 'table table-condensed');

            title = document.createElement('h2');
            title.setAttribute('class', 'text-center');
            title.innerText = 'Vote by County';
            tableDiv.appendChild(title);

            /* Creates header row cells */
            header = tbl.createTHead();
            headerRow = header.insertRow(0);
            headerRow.setAttribute("style", "font-weight: bold;")

            headerData.forEach(function(element, index) {
                cellHeader = headerRow.insertCell(index);
                cellText = document.createTextNode(element);
                cellHeader.appendChild(cellText);
            }, this);

            /* Inserts data from API call */
            var results = JSON.parse(xhr.responseText)
            
            for ( var i = 0; i < results.length; i++ ) {
                /* Creates and inserts new tr */
                row = tbl.insertRow(-1);
                
                /* Insert cell for each data point */
                cellCounty = row.insertCell(0);
                cellDem = row.insertCell(1);
                cellRep = row.insertCell(2);
                cellOth = row.insertCell(3);
                
                /* Creates text nodes */
                countyData = document.createTextNode(results[i].county);
                demData = document.createTextNode(results[i].dem_per);
                repData = document.createTextNode(results[i].rep_per);
                othData = document.createTextNode(results[i].oth_per);

                /* Appends nodes */
                cellCounty.appendChild(countyData);
                cellDem.appendChild(demData);
                cellRep.appendChild(repData);
                cellOth.appendChild(othData);
            }
            tableDiv.appendChild(tbl);
                        
        }        
    }
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params)
};

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
                .append($('<td>').text(parseInt(result.dem).toLocaleString()))
                .append($('<td>').text(parseInt(result.rep).toLocaleString()))
                .append($('<td>').text(parseInt(result.other).toLocaleString()))
                .append($('<td>').text(result.dem_per))
                .append($('<td>').text(result.rep_per))
                .append($('<td>').text(result.oth_per))
            $('#results-table > tbody').append(row)
        })
    })
}

