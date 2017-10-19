window.addEventListener('load', function() {
        
    document.getElementById("states").addEventListener("change", function() { getCounties() });
    document.getElementById("states").addEventListener("change", function() { getCountyResultsByState() });
    document.getElementById("elections").addEventListener("change", function() { getCountyResultsByState() });
    getElections();
    getStates();
    // getCountyResultsByState()        
});