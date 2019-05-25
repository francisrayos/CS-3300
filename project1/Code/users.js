var userData;

d3.json("Data/16-17-18_data.json?v=1").then(function(userData) {

    //convert the necessary numbers
    userData.forEach((d, i) => {
      d['total_users'] = Number(d["total_users"].replace(/,/g, ""));
      d['number_paid_users'] = Number(d["number_paid_users"].replace(/,/g, ""));
      d['number_free_users'] = Number(d["number_free_users"].replace(/,/g, ""));

      //remove youtube
      userData = userData.filter(d =>
        d['service'] != "Youtube");

    });

    //get max users and make an array of names
    var total_max = 0;
    var service_names = [];
    userData.forEach((d) => {
      if (total_max < d['total_users']) {
        total_max = d['total_users'];
      }
      service_names.push(d['service']);
    });

    //sort the data in terms of ascending users
    userData.sort(function(d, i) {
      return ((d["total_users"] === i["total_users"]) ? 0 : ((d["total_users"] > i["total_users"]) ? 1 : -1));
    });

    //declare constants
    var padding = 25;
    var width = 400;
    var height = 500;
    var color_paid = "midnightblue";
    var color_unpaid = "mediumturquoise";
    var color_axis = "#000000";
    var color_gridline = "#666666";
    var color_text = "#000000";
    var text_stroke = 1;
    var r = 7;
    var font = "avenir";
    var fontsize = 12;

    var svg = d3.select("div#users")
      .append("svg")
      .attr("width", width + 200)
      .attr("height", height + 100);

    var x_scale = d3.scaleBand()
      .rangeRound([padding, (width - 2 * padding)])
      .domain(userData.map(function(d) {
        return d["service"];
      }))

    var y_scale = d3.scaleLinear()
      .range([height - (2 * padding), padding])
      .domain([0, Math.ceil(total_max / 1000000) * 1000000]);

    let x_axis = d3.axisBottom(x_scale);

    svg.append("g").attr("class", "x axis")
      .attr("transform", "translate(" + padding*2 + "," + (height - padding) + ")")
      .style("stroke", color_axis)
      .style("font-family", font)
      .style("stroke-width", .5)
      .call(x_axis);

    let y_axis = d3.axisLeft(y_scale)
      .ticks(10)
      .tickFormat(d3.format(".2s"));

    svg.append("g").attr("class", "y axis")
      .attr("transform", "translate(" + padding * 3 + "," + padding + ")")
      .style("stroke", color_axis)
      .style("font-family", font)
      .style("stroke-width", .5)
      .call(y_axis);

    let y_grid = d3.axisLeft(y_scale).tickSize(-(width - padding * 3)).tickFormat("");
    svg.append("g").attr("class", "y gridlines")
      .attr("transform", "translate(" + padding * 3 + "," + padding + ")")
      .style("stroke", color_gridline)
      .style("opacity", 0.2)
      .call(y_grid);


    userData.forEach(function(d) {

      var bar_height = 3000000;
      var bar_space = 4000000;
      var bar_width = 30;
      for (var i = 0;
        (i <= d["total_users"]); i = i + bar_space) {
          var top_of_bar = i+bar_height;
          if (i+bar_height > d["total_users"]) {
            top_of_bar = d["total_users"]
          }
        svg.append("line")
          .attr("x1", x_scale(d['service']))
          .attr("x2", x_scale(d['service']))
          .attr("y1", y_scale(i))
          .attr("y2", y_scale(top_of_bar))
          .attr("transform", "translate(" + padding * 3 + "," + padding + ")")
          .style("stroke", color_unpaid)
          .style("stroke-width", bar_width);

      }
      for (var i = 0;
        (i <= d["number_paid_users"]); i = i + bar_space) {
          var top_of_bar = i+bar_height;
          if (i+bar_height > d["number_paid_users"]) {
            top_of_bar = d["number_paid_users"]
          }
        svg.append("line")
          .attr("x1", x_scale(d['service']))
          .attr("x2", x_scale(d['service']))
          .attr("y1", y_scale(i))
          .attr("y2", y_scale(top_of_bar))
          .attr("transform", "translate(" + padding * 3 + "," + padding + ")")
          .style("stroke", color_paid)
          .style("stroke-width", bar_width);
      }
    });

    let key = svg.append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    //key
    let circle1 = key.append("circle")
      .attr("cx", (width + padding))
      .attr("cy", (padding * 6))
      .attr("r", r)
      .style("fill", color_paid);

    key.append("text")
      .attr("x", (width + r * 2 + padding))
      .attr("y", (padding * 6 + r / 2 + 1))
      .style("font-family", font)
      .style("stroke", color_text)
      .style("stoke-width", text_stroke)
      .text("paid users");


    let circle2 = key.append("circle")
      .attr("cx", (width + padding))
      .attr("cy", (padding * 5))
      .attr("r", r)
      .style("fill", color_unpaid);

    key.append("text")
      .attr("x", (width + r * 2 + padding))
      .attr("y", (padding * 5 + r / 2 + 1))
      .style("font-family", font)
      .style("stroke", color_text)
      .style("stoke-width", text_stroke)
      .text("unpaid users");

    //axis and chart titles
    svg.append("text")
      .attr("transform", "translate(" + (width / 2+ padding) + " ," + padding + ")")
      .style("text-anchor", "middle")
      .style("font-family", font)
      .style("font-size", fontsize)
      .style("stroke", color_text)
      .style("stoke-width", text_stroke)
      .text("Users per Service");

    svg.append("text")
      .attr("transform", "translate(" + (width / 2+ padding) + " ," + (height + 15) + ")")
      .style("text-anchor", "middle")
      .style("font-family", font)
      .style("font-size", fontsize)
      .style("stroke", color_text)
      .style("stoke-width", text_stroke)
      .text("Streaming Service");

    svg.append("text")
      .attr("y", padding )
      .attr("x", 0 - (height / 2))
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .style("font-family", font)
      .style("font-size", fontsize)
      .style("stroke", color_text)
      .style("stoke-width", text_stroke)
      .text("Number of Users");

  })
  .catch(error => {
    console.log(error.message);
  });
