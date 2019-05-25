// Problem 7 JS Code

const LoadData = async () => {
    // Stores data in variable
    let europe = await d3.json("europe.topojson");
    let svgEurope = d3.select("#map");

    // Creates collection & path
    let newCollection = topojson.feature(europe, europe.objects.europe);
    let mercatorProjection = d3.geoMercator().fitSize([500, 500], newCollection);
    let pathGenerator = d3.geoPath().projection(mercatorProjection);

    // Finds min & max of data to determine domain
    let minPISA = d3.min(newCollection.features, d => d.properties.pisa); // 464
    let maxPISA = d3.max(newCollection.features, d => d.properties.pisa); // 521

    // Creates numerical scale
    let scalePISA = d3.scaleSequential()
        .domain([minPISA, maxPISA])
        .interpolator(d3.interpolateViridis)
        .clamp(true);

    // Implements data join to create path
    svgEurope.selectAll("path")
        .data(newCollection.features)
        .enter()
        .append("path")
        .attr("class", "country")
        .style("fill", d => scalePISA(d.properties.pisa))
        .attr("d", pathGenerator)
        .on("mouseover", function(d) {
            d3.select(this)
                .style("stroke", "black")
                .style("stroke-width", 1);
            document.getElementById("hint").innerHTML = d.properties.pisa;
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .style("stroke", "black")
                .style("stroke-width", 0);
            document.getElementById("hint").innerHTML = "";
        });
};
LoadData();