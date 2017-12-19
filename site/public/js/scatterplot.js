(function () {

    // change a function that takes param dataset

    var w = 550;
    var h = 550;
    padding = 50;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ;

    var dataset = [];

    for (var i = 0; i < 20; i++) {
        var xNumber = (Math.random() * 200) - 100;
        var yNumber = (Math.random() * 200) - 100;
        dataset.push([xNumber, yNumber]);
    }

    var xScale = d3.scale.linear()
        .domain([-100, 100])
        .range([padding, w - padding * 2]);
    
    var yScale = d3.scale.linear()
        .domain([-100, 100])
        .range([h - padding, padding]);
        
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(10)

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(10)

    var scatterplot = d3.select("p.chart")
        .append("svg")
        .attr("height", h)
        .attr("width", w)
        

    scatterplot.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d[0]);
        })
        .attr("cy", function(d) {
            return yScale(d[1]);
        }) 
        .attr("r", 3)

    scatterplot.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + ((h/2) ) + ")")
        .call(xAxis);


    scatterplot.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + ((w/2) -25 ) + ",0)")
        .call(yAxis);

})();