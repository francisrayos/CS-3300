var artistCutData;

d3.json("Data/15_data.json?v=1").then(function(artistCutData) {
    //convert the necessary numbers
    artistCutData.forEach((d, i) => {
      d["label_cut_signed"] = Number(d["label_cut_signed"].replace(/%/g, ""));
      d["distributer_retailer_cut_signed"] = Number(d["distributer_retailer_cut_signed"].replace(/%/g, ""));
      d["distributer_retailer_cut_unsigned"] = Number(d["distributer_retailer_cut_unsigned"].replace(/%/g, ""));
      d["artist_writer_cut_signed"] = Number(d["artist_writer_cut_signed"].replace(/%/g, ""));
      d["artist_writer_cut_unsigned"] = Number(d["artist_writer_cut_unsigned"].replace(/%/g, ""));
    });

    //initialize piechart info
    var de = artistCutData[1];
    var label_cut_sig = de["label_cut_signed"];
    var label_cut_unsig = 0;
    var distributer_cut_sig = de["distributer_retailer_cut_signed"];
    var distributer_cut_unsig = de["distributer_retailer_cut_unsigned"];
    var artist_cut_sig = de["artist_writer_cut_signed"];
    var artist_cut_unsig = de["artist_writer_cut_unsigned"];

    //declare constants
    var padding = 25;
    var width = 800;
    var height = 500;

    var color_label = "coral";
    var color_retailer = "mediumorchid";
    var color_writer = "deeppink";
    var color_note = "#000000";
    var color_text = "#000000";
    var text_stroke = 1;
    var r = 80;
    var font = "avenir";
    var fontsize = 12;
    var key_r = 6;

    var color = d3.scaleOrdinal([color_label, color_retailer, color_writer]);

    var signed = [label_cut_sig, distributer_cut_sig, artist_cut_sig];
    var unsigned = [label_cut_unsig, distributer_cut_unsig, artist_cut_unsig];

    var svg = d3.select("div#cut")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    let music = svg.append("g")
      .attr("transform", "translate(" + (-3 * padding) + "," + (-2 * padding) + ")");

    //signed
    var g = music.append("g").attr("transform", "translate(" + 200 + "," + (height * .75 - 2 * padding) + ")");

    var pie = d3.pie();

    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(r);

    var arcs = g.selectAll("arc")
      .data(pie(signed))
      .enter()
      .append("g")
      .attr("class", "arc")

    arcs.append("path")
      .attr("fill", function(d, i) {
        return color(i);
      })
      .attr("d", arc);

    //unsigned
    var g = music.append("g").attr("transform", "translate(" + 450 + "," + (height * .75 + padding) + ")");

    var pie1 = d3.pie();

    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(r);

    var arcs = g.selectAll("arc")
      .data(pie(unsigned))
      .enter()
      .append("g")
      .attr("class", "arc")

    arcs.append("path")
      .attr("fill", function(d, i) {
        return color(i);
      })
      .attr("d", arc);

    //add outlines to make a music note

    //right outline
    music.append("circle")
      .attr("cy", ((height * .75 + padding)))
      .attr("cx", (450))
      .attr("r", r)
      .style("stroke", color_note)
      .style("stroke-width", 10)
      .style("fill", "none");

    //left outline
    music.append("circle")
      .attr("cy", ((height * .75 - 2 * padding)))
      .attr("cx", (200))
      .attr("r", r)
      .style("stroke", color_note)
      .style("stroke-width", 10)
      .style("fill", "none");

    //right line
    music.append("line")
      .attr("x1", (450 + r))
      .attr("x2", (450 + r))
      .attr("y1", (height * .75 + padding))
      .attr("y2", (height * .25 + padding - 2))
      .style("stroke", color_note)
      .style("stroke-width", 10);

    //left line
    music.append("line")
      .attr("x1", (200 + r))
      .attr("x2", (200 + r))
      .attr("y1", (height * .75 - 2 * padding))
      .attr("y2", (height * .25 - 2 * padding + 2))
      .style("stroke", color_note)
      .style("stroke-width", 10);

    //top line
    var area = d3.area();

    var points = [
      [200 + r - 5, height * .25 - 2 * padding],
      [200 + r - 5, height * .25],
      [450 + r + 5, height * .25 + 2 * padding],
      [450 + r + 5, height * .25],
      [200 + r - 5, height * .25 - 2 * padding]
    ];

    var pathData = area(points);
    music.append("path")
      .data([points])
      .attr("class", "area")
      .attr("d", pathData);

    //make a key
    let key = svg.append("g")
      .attr("transform", "translate(" + (-4 * padding) + "," + padding + ")");

    key.append("circle")
      .attr("cx", (width - 200))
      .attr("cy", (padding * 5))
      .attr("r", key_r)
      .style("fill", color_label);

    key.append("text")
      .attr("x", (width - 180))
      .attr("y", (padding * 5 + key_r / 3))
      .style("font-family", font)
      .style("font-size", 12)
      .style("stroke", color_text)
      .style("stoke-width", text_stroke)
      .text("Label's cut");


    key.append("circle")
      .attr("cx", (width - 200))
      .attr("cy", (padding * 7))
      .attr("r", key_r)
      .style("fill", color_writer);

    key.append("text")
      .attr("x", (width - 180))
      .attr("y", (padding * 7 + key_r / 3))
      .style("font-family", font)
      .style("font-size", 12)
      .style("stroke", color_text)
      .style("stoke-width", text_stroke)
      .text("Artist's cut");

    key.append("circle")
      .attr("cx", (width - 200))
      .attr("cy", (padding * 6))
      .attr("r", key_r)
      .style("fill", color_retailer);

    key.append("text")
      .attr("x", (width - 180))
      .attr("y", (padding * 6 + key_r / 3))
      .style("font-family", font)
      .style("font-size", 12)
      .style("stroke", color_text)
      .style("stoke-width", text_stroke)
      .text("Distributers and Retailers' cut");

    //titles:
    let titles = svg.append("g")
      .attr("transform", "translate(" + (-4 * padding) + "," + padding + ")");

    titles.append("text")
      .attr("x", 200 - r / 1.5)
      .attr("y", ((height * .75 - padding * 0.5)))
      .style("font-family", font)
      .style("stroke", color_text)
      .style("stoke-width", text_stroke)
      .text("Signed Artist");

    titles.append("text")
      .attr("x", 450 - r / 4)
      .attr("y", ((height * .75 + padding * 2.5)))
      .style("font-family", font)
      .style("stroke", color_text)
      .style("stoke-width", text_stroke)
      .text("Independent Artist");



  })
  .catch(error => {
    console.log(error.message);
  });
