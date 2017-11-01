window.addEventListener('load', function() {
    
    $('#params').load('/snippets/params.html', function() {
        document.getElementById("states").addEventListener("change", function() { getCounties() });
        document.getElementById("states").addEventListener("change", function() { getCountyResultsByState() });
        document.getElementById("elections").addEventListener("change", function() { getCountyResultsByState() });
        getElections();
        getStates();
    })
    // getCountyResultsByState()        
});