const svgWidth = Number(d3.select("div#min-wage").style("width").replace(/px/g, ""));
const svgHeight = 400;

const svgMargin = { left: 10, top: 80, right: 10, bottom: 30 }; // margin between staff and edges of svg

const staffWidth = svgWidth - svgMargin.left - svgMargin.right;
const staffHeight = svgHeight - svgMargin.top - svgMargin.bottom;
const staffMargin = staffHeight / 12 ; // vertical space between staff lines
const staffLineWidth = 2;
const measureWidth = staffWidth / 7; // width of each measure


// create svg
let div = d3.select("div#min-wage");
let svg = div.append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// create layers
let staffLayer = svg.append("g")
  .attr("transform", "translate(" + svgMargin.left + ", " + svgMargin.top + ")");

let axisBackgroundLayer = svg.append("g")
  .attr("transform", "translate(" + svgMargin.left + ", " + svgMargin.top + ")");

let axisLayer = svg.append("g")
  .attr("transform", "translate(" + svgMargin.left + ", " + svgMargin.top + ")");

let musicLayer = svg.append("g")
  .attr("transform", "translate(" + svgMargin.left + ", " + svgMargin.top + ")");


// add vertical bars
for (i=0; i<=7; i++) {
  let x = i * staffWidth / 7;

  staffLayer.append("line")
    .attr("x1", x)
    .attr("y1", 0)
    .attr("x2", x)
    .attr("y2", staffHeight)
    .style("stroke", "black")
    .style("stroke-width", "3")
    .attr("class", "bar line");
}

// add horizontal staff lines
for (i=0; i<=9; i++) {
  let y = (i < 5) ?
            i * staffMargin :
            (i + 3) * staffMargin;

  staffLayer.append("line")
    .attr("x1", 0)
    .attr("y1", y)
    .attr("x2", staffWidth)
    .attr("y2", y)
    .style("stroke", "black")
    .style("stroke-width", staffLineWidth)
    .attr("class", "staff line");
};

// add base and treble clef
staffLayer.append("image")
  .attr("xlink:href", "Resources/treble.svg")
  .attr("x", measureWidth / 4)
  .attr("y", -15)
  .attr("height", staffMargin * 6);

staffLayer.append("image")
  .attr("xlink:href", "Resources/bass.png")
  .attr("x", measureWidth / 4)
  .attr("y", 194)
  .attr("height", staffMargin * 3.1);

// import data
const loadData = async () => {
  let data = await d3.json("/Data/16-17-18_data.json?v=1");

  // clean data
  data.forEach(function(d) {
    d.min_wage_plays_unsigned = Number(d.min_wage_plays_unsigned.replace(/,/g, ""));
    d.min_wage_plays_signed = Number(d.min_wage_plays_signed.replace(/,/g, ""));
    d.min_wage_percent_unsigned = Number(d.min_wage_percent_unsigned.replace(/%/g, ""));
    d.min_wage_percent_signed = Number(d.min_wage_percent_signed.replace(/%/g, ""));
  })

  // filter outlier (youtube)
  data = data.filter(d => {
    return d.min_wage_plays_unsigned < 400000;
  });

  // create scales
  const numPlaysScale = d3.scaleLinear()
    .domain([0, 400000])
    .range([staffMargin*4, 0]);

  const percentPlaysScale = d3.scaleLinear()
    .domain([0, 4])
    .range([staffHeight, staffHeight - 4*staffMargin]);

  // add num plays axis labels
  for (let i=0; i<5; i++) {
    axisLayer.append("text")
      .attr("x", (i==0) ? measureWidth - 15 : measureWidth - 30)
      .attr("y", (4-i)*staffMargin + 3)
      .text((i==0) ? "0" : d3.format(".2s")(i*100000))
      .style("font-size", 10)
      .style("font-weight", "bold");
  }

  // add percent axis labels
  for (let i=0; i<5; i++) {
    axisLayer.append("text")
      .attr("x", measureWidth - 30)
      .attr("y", staffHeight - i*staffMargin + 3)
      .text("" + i + ".0%")
      .style("font-size", 10)
      .style("font-weight", "bold");
  }

  // add white background for labels
  let rectWidth = 28;
  axisBackgroundLayer.append("rect")
    .attr("x", measureWidth - rectWidth - 6)
    .attr("y", -2)
    .attr("width", rectWidth)
    .attr("height", staffHeight + 4)
    .style("fill", "white");

  // plot points
  data.forEach(function(d, i) {
    let unsignedYNumber = numPlaysScale(d.min_wage_plays_unsigned);
    let signedYNumber = numPlaysScale(d.min_wage_plays_signed);
    let unsignedYPercent = percentPlaysScale(d.min_wage_percent_unsigned);
    let signedYPercent = percentPlaysScale(d.min_wage_percent_signed);
    let noteHeight = 60;
    let quarterNoteWidth = 0.358372*noteHeight;
    let halfNoteWidth = 0.373788*noteHeight;

    // unsigned number
    musicLayer.append("image")
      .attr("xlink:href", d.quarter_note)
      .attr("x", (i+1.25)*measureWidth - .5*quarterNoteWidth)
      .attr("y", unsignedYNumber - 0.856*noteHeight)
      .attr("height", noteHeight);

    // signed number
    musicLayer.append("image")
      .attr("xlink:href", d.note)
      .attr("x", (i+1.75)*measureWidth - .5*halfNoteWidth)
      .attr("y", signedYNumber - 0.862*noteHeight)
      .attr("height", noteHeight);

    // unsigned percent
    musicLayer.append("image")
      .attr("xlink:href", d.quarter_note)
      .attr("x", (i+1.25)*measureWidth - .5*quarterNoteWidth)
      .attr("y", unsignedYPercent - 0.856*noteHeight)
      .attr("height", noteHeight);

    // signed percent
    musicLayer.append("image")
      .attr("xlink:href", d.note)
      .attr("x", (i+1.75)*measureWidth - .5*halfNoteWidth)
      .attr("y", signedYPercent - 0.862*noteHeight)
      .attr("height", noteHeight);

    // logos
    let maxWidth = measureWidth - 10;
    let maxHeight = staffHeight - 8*staffMargin - 50;
    d3.image(d.logo).then(function(img) {
      let widthToHeight = img.width / img.height;
      let maxHeightWidth = widthToHeight * maxHeight;
      let maxWidthHeight = maxWidth / widthToHeight;
      var adjustedWidth, adjustedHeight;
      if (maxHeightWidth < maxWidth && maxWidthHeight < maxHeight) {
        if (maxHeight - maxWidthHeight < maxWidth - maxHeightWidth) {
          adjustedHeight = maxWidthHeight;
          adjustedWidth = maxWidth;
        } else {
          adjustedHeight = maxHeight;
          adjustedWidth = maxHeightWidth;
        }
      } else if (maxHeightWidth >= maxWidth) {
        adjustedHeight = maxWidthHeight;
        adjustedWidth = maxWidth;
      } else {
        adjustedHeight = maxHeight;
        adjustedWidth = maxHeightWidth;
      }

      musicLayer.append("image")
        .attr("xlink:href", d.logo)
        .attr("x", (i+1)*measureWidth + (measureWidth - adjustedWidth)/2)
        .attr("y", staffHeight/2 - adjustedHeight/2)
        .attr("height", adjustedHeight)
        .attr("width", adjustedWidth);

      // append service label
      let label = musicLayer.append("text")
        .attr("x", (i+1.5)*measureWidth)
        .attr("y", 4*staffMargin + 20)
        .style("text-anchor", "middle")
        .style("font-size", 12)
        .text(d.service);
    });

  });

  // add key for signed/unsigned notes
  let keyX = svgWidth/2 - 85;
  let keyQuarterNote = svg.append("image")
    .attr("xlink:href", "Resources/quarter-note.png")
    .attr("x", keyX)
    .attr("y", 5)
    .attr("height", 30);
  
  svg.append("text")
    .attr("x", keyX + 14)
    .attr("y", 35)
    .text("= unsigned");

  let keyHalfNote = svg.append("image")
    .attr("xlink:href", "Resources/half-note.png")
    .attr("x", keyX + 100)
    .attr("y", 5)
    .attr("height", 30);
  
  svg.append("text")
    .attr("x", keyX + 116)
    .attr("y", 35)
    .text("= signed");
}

loadData();
