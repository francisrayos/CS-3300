// Problem 5 JS Code

const RequestData = async () => {
    // Stores data in variable
    let diamonds = await d3.csv("diamond_counts.csv");

    // Converts strings into numbers
    diamonds.forEach(function(d) {
        d.carat = parseFloat(d.carat);
        d.count = Number(d.count);
    });

    diamonds.pop(); // Removes diamond with missing values

    // Finds min & max of data to determine domain
    let minCarat = d3.min(diamonds, d => d.carat); // 0
    let maxCarat = d3.max(diamonds, d => d.carat); // 2.95

    let minCount = d3.min(diamonds, d => d.count); // 0
    let maxCount = d3.max(diamonds, d => d.count); // 341

    // Creates linear scales
    let scaleCarat = d3.scaleLinear()
        .domain([minCarat, maxCarat])
        .range([10, 490]);

    let scaleCount = d3.scaleLinear()
        .domain([minCount, maxCount])
        .range([100, 0]);

    let x_axis = d3.axisBottom(scaleCarat);

    // Appends axis
    let axis = d3.select("#area")
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,100)")
        .call(x_axis);

    let areaGenerator = d3.area()
        .x(function(d) { return scaleCarat(d.carat); })
        .y0(100)
        .y1(function(d) { return scaleCount(d.count); });

    // Appends path to chart
    let chart = d3.select("#area")
        .append("g")
        .attr("class", "chart");
    
    chart.append("path")
        .datum(diamonds)
        .attr("d", areaGenerator)
        .style("fill", "dodgerblue")
        .style("stroke", "midnightblue")
        .style("stroke-width", 2);
}
RequestData();