    // Import Data
    var revenueData;

    d3.json("../Data/16-17-18_data.json?v=1").then(function(data) {
      revenueData = data;

      let width = 900;
    let height = 700;

    let paddingLeft = 200;
    let paddingRight = 200;
    let paddingTop = 60;
    let paddingBottom = 30;

    let plotWidth = width - paddingLeft - paddingRight;
    let plotHeight = height - paddingTop - paddingBottom;

    data.forEach(function(d) {
      d.per_play_16_unsigned = parseFloat(d.per_play_16_unsigned);//.replace(/\$/g,'');
      d.per_play_16_signed = parseFloat(d.per_play_16_signed);//.replace(/\$/g,'');
    });

    data = data.filter(element => element.per_play_16_unsigned != 0.0006072); // Removes YouTube

    // Determine min and max values
    let minUnsigned = d3.min(data, d => d.per_play_16_unsigned);
    let maxUnsigned = d3.max(data, d => d.per_play_16_unsigned);

    let minSigned = d3.min(data, d => d.per_play_16_signed.toFixed(7));
    let maxSigned = d3.max(data, d => d.per_play_16_signed.toFixed(7));


    // Add SVG
    let div = d3.select("div");
    let svg = div.append("svg")
        .attr("width", width)
        .attr("height", height);
        //.style("background", "#F5F5F5");

      // Create Data Scales
      let left_scale = d3.scaleLog()
        .domain([minUnsigned, maxUnsigned])
        .range([plotHeight, 0]);

      let right_scale = d3.scaleLog()
        .domain([minSigned, maxSigned])
        .range([plotHeight, 0]);

      // Define Left and Right Axes
      let left_axis = d3.axisLeft(left_scale)
        .tickValues([0.0038456,  0.005632, 0.0059488, 0.006468, 0.011, 0.01672])
        .tickFormat(d => d.per_play_16_unsigned)
        .tickFormat(d => "$" + d)
        .tickSize(0)
        .tickPadding(10);

      let right_axis = d3.axisRight(right_scale)
        .tickValues([0.00437, 0.0064, 0.00676, 0.00735, 0.0125, 0.019])
        .tickFormat(d => d.per_play_16_unsigned)
        .tickFormat(d => "$" + d)
        .tickSize(0)
        .tickPadding(10);

      // Chart Axes
      svg.append("g")
        .attr("transform", "translate(" + paddingLeft + ", " + paddingTop + ")")
        .style("font-family", "Avenir")
        .style("stroke-dasharray", ("3,5"))
        .style("color", "slategray")
        .call(left_axis);

      svg.append("g")
        .attr("transform", "translate(" + (width - paddingRight) + ", " + paddingTop + ")")
        .style("font-family", "Avenir")
        .style("stroke-dasharray", ("3,5"))
        .style("color", "slategray")
        .call(right_axis);

      // Chart Labels
      svg.append("text")
        .attr("transform", "translate(" + (paddingLeft / 2) + ", " + (paddingTop / 2) + ")")
        .style("font-weight", 700)
        .style("fill", "slategray")
        .style("font-size", "14px")
        .style("font-family", "Avenir")
        .text("Unsigned Revenue Per Play");

      svg.append("text")
        .attr("transform", "translate(" + (width - paddingRight - 75) + ", " + (paddingTop / 2) + ")")
      .style("font-weight", 700)
        .style("fill", "slategray")
        .style("font-size", "14px")
        .style("font-family", "Avenir")
        .text("Signed Revenue Per Play");

      data.forEach(function (d) {
        // Helper Functions

      function returnNotePNG () {
        if (d.per_play_16_unsigned == 0.005632) {
          return "../Resources/half-note-deeppink.png";
        } // Deezer
        if (d.per_play_16_unsigned == 0.0059488) {
          return  "../Resources/half-note-coral.png";
        } // Google Play
        if (d.per_play_16_unsigned == 0.01672) {
          return  "../Resources/half-note-midnightblue.png";
        } // Napster
        if (d.per_play_16_unsigned == 0.0038456) {
          return  "../Resources/half-note-limegreen.png";
        } // Spotify
        if (d.per_play_16_unsigned == 0.011) {
          return  "../Resources/half-note-mediumturquoise.png";
        } // Tidal
        if (d.per_play_16_unsigned == 0.006468) {
          return  "../Resources/half-note-mediumorchid.png";
        } // Apple Music
      }

      function returnLogoPNG () {
        if (d.per_play_16_unsigned == 0.005632) {
          return "../Resources/deezer.png";
        } // Deezer
        if (d.per_play_16_unsigned == 0.0059488) {
          return  "../Resources/google-play.png";
        } // Google Play
        if (d.per_play_16_unsigned == 0.01672) {
          return  "../Resources/napster.png";
        } // Napster
        if (d.per_play_16_unsigned == 0.0038456) {
          return  "../Resources/spotify.png";
        } // Spotify
        if (d.per_play_16_unsigned == 0.011) {
          return  "../Resources/tidal.png";
        } // Tidal
        if (d.per_play_16_unsigned == 0.006468) {
          return  "../Resources/apple.png";
        } // Apple Music
      }

      // Append Circles
        let unsignedCircle = svg.append("circle")
        .attr("r", 3)
        .attr("cy", left_scale(d.per_play_16_unsigned))
        .attr("transform", "translate(" + paddingLeft + ", " + paddingTop + ")")
        .style("fill", "slategray");

      let signedCircle = svg.append("circle")
        .attr("r", 3)
        .attr("cy", right_scale(d.per_play_16_signed))
        .attr("transform", "translate(" + (width - paddingRight) + ", " + paddingTop + ")")
        .style("fill", "slategray");

      // Append Logos
      let unsignedLogo = svg.append("svg:image")
          .attr("xlink:href", returnLogoPNG())
          .attr("width", 20)
          .attr("height", 20)
          .attr("transform", "translate(" + (paddingLeft / 2) + ", " + (paddingTop - 10) + ")")
          .attr("x", 0)
          .attr("y",left_scale(d.per_play_16_unsigned));

        let signedLogo = svg.append("svg:image")
          .attr("xlink:href", returnLogoPNG())
          .attr("width", 20)
          .attr("height", 20)
          .attr("transform", "translate(" + (width - (paddingRight / 1.5)) + ", " + (paddingTop - 10) + ")")
          .attr("x", 0)
          .attr("y",right_scale(d.per_play_16_signed));

        // Append Notes
          for (i = 0; i <= plotWidth - 20; i = i + 20) {
            let note = svg.append("svg:image")
            .attr("xlink:href", returnNotePNG())
            .attr("width", 18)
            .attr("height", 18)
            .attr("transform", "translate(" + (paddingLeft + 3) + ", " + (paddingTop - 10) + ")")
            .attr("x", i)
            .attr("y",left_scale(d.per_play_16_unsigned));
          };

    });

    }).catch( error => { console.log("Error detected: "+e.message);} );
