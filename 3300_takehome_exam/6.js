// Problem 6 JS Code

let canvas = d3.select("#colorscale");
let blue = d3.rgb("#2176ff");
let yellow = d3.rgb("#ffee32");

// Creates color scale
let scaleColor = d3.scaleLinear()
    .domain([0, 500])
    .range([yellow, blue])
    .interpolate(d3.interpolateHcl)
    .clamp(true);

// Gets the canvas
var newContext = canvas.node().getContext("2d");
var newImage = newContext.getImageData(0, 0, canvas.node().width, canvas.node().height);
var pixels = newImage.data;

// Loads pixels RGB values onto canvas
function startCanvas () {
    for (let y = 0; y < 500; y++) {
        for (let x = 0; x < 40; x++) {
            let pixelColor = scaleColor(y);
            let rgbColor = d3.rgb(pixelColor);

            pixels[4 * (x * 500 + y)] = rgbColor.r;
            pixels[4 * (x * 500 + y) + 1] = rgbColor.g;
            pixels[4 * (x * 500 + y) + 2] = rgbColor.b;
            pixels[4 * (x * 500 + y) + 3] = 255;
        }
    }
    newContext.putImageData(newImage, 0, 0);
}
let start = startCanvas();