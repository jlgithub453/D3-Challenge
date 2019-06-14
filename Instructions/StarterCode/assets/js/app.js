// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/js/data.csv").then(function(Data) {
  console.log(Data);

  // Step 4: Parse the data
  // Format the data and convert to numerical and date values
  // =================================

  // var localData = {};
  // Format the data
  Data.map(function (data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  })
  console.log(Data);

  console.log((d3.extent(Data, d => d.poverty)));
  var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(Data, d => d.poverty)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(Data, d => d.healthcare)])
    .range([height, 0]);

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 7: Append the axes to the chartGroup - ADD STYLING
  // ==============================================
  // Add bottomAxis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // CHANGE THE TEXT TO THE CORRECT COLOR
  chartGroup.append("g")
    //.attr("stroke", "green") // NEW!
    .call(leftAxis);


  // create path
  chartGroup.append("path")
    //.attr("d", line(pizzasEatenByMonth))
    .attr("fill", "none")
    .attr("stroke", "green");

  // append circles to data points
  var circlesGroup = chartGroup.selectAll("g")
    .data(Data)
    .enter()
    .append("circle")
    .attr('cx', d => xLinearScale(d.poverty))
    .attr('cy', d => yLinearScale(d.healthcare))
    .attr("r", 10)
    .attr("fill", "blue")
    .attr("opacity", ".5");

   var textGroup = chartGroup.selectAll("g")
    .data(Data)
    .enter()
    .append("text").text(d => d.abbr)
    .attr('x', d => xLinearScale(d.poverty))
    .attr('y', d => yLinearScale(d.healthcare))
    .attr('font-size', 8)
    .attr("fill", "white")
    .attr("opacity", "1");
  


    var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var hairLengthLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    //.attr("value", "hair_length") // value to grab for event listener
    .classed("active", true)
    .text("In Poverty (%)");
  
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Health Care (%)");

})


.catch(function(error){
  // handle error   
  console.error(error);
})