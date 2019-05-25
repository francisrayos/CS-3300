   // Import Data
    var revenueData;

    d3.json("../Data/16-17-18_data.json?v=1").then(function(data) {
    	revenueData = data;

    let width = 700;
		let height = 700;

		let paddingLeft = 200;
		let paddingRight = 200;
		let paddingTop = 60;
		let paddingBottom = 30;

		let plotWidth = width - paddingLeft - paddingRight;
		let plotHeight = height - paddingTop - paddingBottom;

		data = data.filter(element => element.per_play_16_unsigned != 0.0006072); // Removes YouTube

		// Determine min and max values

		let minUnsigned10x = d3.min(data, d => d.per_play_16_unsigned_x10k);
		let maxUnsigned10x = d3.max(data, d => d.per_play_16_unsigned_x10k);

		let minSigned10x = d3.min(data, d => d.per_play_16_signed_x10k);
		let maxSigned10x = d3.max(data, d => d.per_play_16_signed_x10k);

		// Add SVG

    var svg4 = d3.select("div#revenue10x")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
	    // Create Data Scales

	   	let left_scale10x = d3.scaleLinear()
	   		.domain([30, 200])
	   		.range([plotHeight, 0]);

	   	let right_scale10x = d3.scaleLinear()
	   		.domain([30, 200])
	   		.range([plotHeight, 0]);

	   	// Define Left and Right Axes

	   	let left_axis10x = d3.axisLeft(left_scale10x)
	   		.tickValues([38, 56, 59, 65, 110, 167])
	   		.tickFormat(d => d.per_play_16_unsigned_x10k)
	   		.tickFormat(d => d)
	   		.tickSize(0)
	   		.tickPadding(10);

	   	let right_axis10x = d3.axisRight(right_scale10x)
	   		.tickValues([44, 64, 68, 74, 125, 190])
	   		.tickFormat(d => d.per_play_16_unsigned_x10k)
	   		.tickFormat(d => d)
	   		.tickSize(0)
	   		.tickPadding(10);

	   	// Chart Axes
	   	svg4.append("g")
	    	.attr("transform", "translate(" + paddingLeft + ", " + paddingTop + ")")
	    	.style("font-family", "Avenir")
	    	.style("stroke-dasharray", ("3,5"))
	    	.style("color", "black")
	    	.call(left_axis10x);

	    svg4.append("g")
	    	.attr("transform", "translate(" + (width - paddingRight) + ", " + paddingTop + ")")
	    	.style("font-family", "Avenir")
	    	.style("stroke-dasharray", ("3,5"))
	    	.style("color", "black")
	    	.call(right_axis10x);

	    // Chart Labels
	    svg4.append("text")
	    	.attr("transform", "translate(" + (paddingLeft / 2) + ", " + (paddingTop / 2) + ")")
	    	.style("font-weight", 700)
	    	.style("fill", "black")
	    	.style("font-size", "14px")
	    	.style("font-family", "Avenir")
	    	.text("Unsigned Revenue Per Play ($/10,000 plays)");

	    svg4.append("text")
	    	.attr("transform", "translate(" + (width - paddingRight - 85) + ", " + (paddingTop / 2) + ")")
	 		.style("font-weight", 700)
	    	.style("fill", "black")
	    	.style("font-size", "14px")
	    	.style("font-family", "Avenir")
	    	.text("Signed Revenue Per Play ($/10,000 plays)");

	    data.forEach(function (d) {
	    	// Helper Functions
	    	function defineColor () {
				if (d.per_play_16_unsigned_x10k == 56) {
					return "deeppink";
				} // Deezer
				if (d.per_play_16_unsigned_x10k == 59) {
					return "coral";
				} // Google Play
				if (d.per_play_16_unsigned_x10k == 167) {
					return "midnightblue";
				} // Napster
				if (d.per_play_16_unsigned_x10k == 38) {
					return "limegreen";
				} // Spotify
				if (d.per_play_16_unsigned_x10k == 110) {
					return "mediumturquoise";
				} // Tidal
				if (d.per_play_16_unsigned_x10k == 65) {
					return "mediumorchid";
				} // Apple Music
			}

			function returnLogoPNG () {
				if (d.per_play_16_unsigned == 0.005632) {
					return "../Resources/deezer.png";
				} // Deezer
				if (d.per_play_16_unsigned == 0.0059488) {
					return  "../Resources/google-play1.png";
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

			function fixLeftLogoLabels () {
				if (d.per_play_16_unsigned == 0.005632) {
					return 0;
				} // Deezer
				if (d.per_play_16_unsigned == 0.0059488) {
					return  -22;
				} // Google Play
				if (d.per_play_16_unsigned == 0.01672) {
					return  0;
				} // Napster
				if (d.per_play_16_unsigned == 0.0038456) {
					return  0;
				} // Spotify
				if (d.per_play_16_unsigned == 0.011) {
					return  0;
				} // Tidal
				if (d.per_play_16_unsigned == 0.006468) {
					return  0;
				} // Apple Music
			}

			function fixRightLogoLabels () {
				if (d.per_play_16_unsigned == 0.005632) {
					return 0;
				} // Deezer
				if (d.per_play_16_unsigned == 0.0059488) {
					return 25;
				} // Google Play
				if (d.per_play_16_unsigned == 0.01672) {
					return  0;
				} // Napster
				if (d.per_play_16_unsigned == 0.0038456) {
					return  0;
				} // Spotify
				if (d.per_play_16_unsigned == 0.011) {
					return  0;
				} // Tidal
				if (d.per_play_16_unsigned == 0.006468) {
					return  0;
				} // Apple Music
			}

			// Append Circles
	    	let unsignedCircle = svg4.append("circle")
				.attr("r", 4)
				.attr("cy", left_scale10x(d.per_play_16_unsigned_x10k))
				.attr("transform", "translate(" + paddingLeft + ", " + paddingTop + ")")
				.style("fill", "black");

			let signedCircle = svg4.append("circle")
				.attr("r", 4)
				.attr("cy", right_scale10x(d.per_play_16_signed_x10k))
				.attr("transform", "translate(" + (width - paddingRight) + ", " + paddingTop + ")")
				.style("fill", "black");

			// Append Logos
			let unsignedLogo = svg4.append("svg:image")
	    		.attr("xlink:href", returnLogoPNG())
	    		.attr("width", 20)
	    		.attr("height", 20)
	   			.attr("transform", "translate(" + (paddingLeft / 1.5) + ", " + (paddingTop - 10) + ")")
	   			.attr("x", fixLeftLogoLabels())
	   			.attr("y", left_scale10x(d.per_play_16_unsigned_x10k));

	    	let signedLogo = svg4.append("svg:image")
	    		.attr("xlink:href", returnLogoPNG())
	    		.attr("width", 20)
	    		.attr("height", 20)
	   			.attr("transform", "translate(" + (width - (paddingRight / 1.4)) + ", " + (paddingTop - 10) + ")")
	   			.attr("x", fixRightLogoLabels())
	   			.attr("y", right_scale10x(d.per_play_16_signed_x10k));


			// Append Lines

	    	svg4.append("line")
	            .attr("y1", left_scale10x(d.per_play_16_unsigned_x10k))
	            .attr("x2", plotWidth)
	            .attr("y2", right_scale10x(d.per_play_16_signed_x10k))
	            .attr("transform", "translate(" + paddingLeft + "," + paddingTop + ")")
	            .style("stroke-linecap", "round")
	            .style("stroke",defineColor())
	            .style("stroke-width", 5)

		});

    }).catch( error => { console.log("Error detected: "+e.message);} );
