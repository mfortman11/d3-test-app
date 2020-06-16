// Import stylesheets
import './style.scss';
import * as d3 from "d3";

let svg = d3.select(".developer-profile__stats").append("svg")
    .attr("width", 450)
    .attr("height", 375);

let radialScale = d3.scaleLinear()
    .domain([0,10])
    .range([0,150]);

let features = ["JavaScript","HTML","CSS","Angular","React","Node","UI/UX Design"];
let attributeRank = [9,8,7,8,7,5,4];
let ticks = [0,2,4,6,8,10];

let line = d3.line()
    .x(d => d.x)
    .y(d => d.y);
let colors = ["darkorange", "gray", "navy"];

let data = {}
//each feature will be a random number from 1-9
features.forEach((f,index) => data[f] = attributeRank[index]);

let coordinates = getPathCoordinates(data);

ticks.forEach(t =>
    svg.append("circle")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("r", radialScale(t))
);

ticks.forEach(t =>
    svg.append("text")
    .attr("x", 205)
    .attr("y", 200 - radialScale(t))
);

for (var i = 0; i < features.length; i++) {
    let ft_name = features[i];
    let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
    let line_coordinate = angleToCoordinate(angle, 10);
    let label_coordinate = angleToCoordinate(angle, 10.5);

    //draw axis line
    svg.append("line")
    .attr("x1", 200)
    .attr("y1", 200)
    .attr("x2", line_coordinate.x)
    .attr("y2", line_coordinate.y)
    .attr("stroke","black");

    //draw axis label
    svg.append("text")
    .attr("x", label_coordinate.x)
    .attr("y", label_coordinate.y)
    .text(ft_name);
}

//draw the path element
svg.append("path")
.datum(coordinates)
.attr("d",line)
.attr("stroke-width", 5)
.attr("stroke", "blue")
.attr("fill", "blue")
.attr("stroke-opacity", 1)
.attr("opacity", 0.6);


function angleToCoordinate(angle, value){
    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return {"x": 200 + x, "y": 200 - y};
}

function getPathCoordinates(data_point){
    let coordinates = [];
    for (var i = 0; i < features.length; i++){
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    return coordinates;
}
