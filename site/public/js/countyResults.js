function getElections() {
    $('#elections').empty()
    $.get('/api/get-elections', function(data) {
        data.forEach(function(year) {
            $('#elections').append(
                $('<option>')
                    .text(year)
            )
        })
    })
}

function getStates() {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var states = JSON.parse(xhr.responseText);
            var el = document.getElementById("states")
            for (var i = 0; i < states.length; i ++) {
                var option = document.createElement("option");
                var node = document.createTextNode(states[i]);
                option.appendChild(node);
                el.appendChild(option);                                  
            }
            getCounties()
        }
    };
    xhr.open("GET", "/api/get-states", true);
    xhr.send();        
};    

function getCounties() {        
    var stateSel = document.getElementById("states")
    var state = stateSel.options[stateSel.selectedIndex].text;
    while (counties.hasChildNodes()) {
        counties.removeChild(counties.lastChild)
    }
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var countiesEl = document.getElementById("counties");
            var counties = JSON.parse(xhr.responseText);
            for (var i = 0; i < counties.length; i++) {
                var option = document.createElement("option");
                var node = document.createTextNode(counties[i][1]);
                option.appendChild(node);
                countiesEl.appendChild(option);
            }            
        }
    }
    xhr.open("GET", "/api/get-counties?state=" + encodeURI(state), true);
    xhr.send();
};

function getCountyResultsByState() {
    var stateSel = document.getElementById("states");
    var state = stateSel.options[stateSel.selectedIndex].text;

    var electionsSel = document.getElementById("elections");
    var election = electionsSel.options[electionsSel.selectedIndex].text;
    while (chart.hasChildNodes()) {
        chart.removeChild(chart.lastChild)
    }
    var xhr = new XMLHttpRequest()
    var url = "/api/get-state-results-by-county";
    var params = "state=" + encodeURI(state) + "&election=" + encodeURI(election);
    xhr.onreadystatechange = function() {            
        if (this.readyState == 4 && this.status == 200) {
            headerData = ['County', 'Democrat', 'Republican', 'Other']

            /* Creates table */
            tableDiv = document.getElementById('chart');
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