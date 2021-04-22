const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Blob = require('node-blob');

const dom = new JSDOM();
// Get the string representation of a DOM node (removes the node)
function domNodeToString(domNode) {
	return domNode;
}

const createD3Chart = () => {
    const D3Node = require('d3-node');
    const canvasModule = require('canvas');
    const d3n = new D3Node({ canvasModule });
    const height = 250, width = 500;
    const svg = d3n.createSVG()
        .attr('width', width)
        .attr('height', height)
        .style('border', '1px solid #000');

    const data = [
        50,90,120,250,200,150,100,50,
        10,40,80,60,40,70,50,90,
        120,60,40,70,50,60,40,70
    ];

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, index) => index * 20)// For each, set x attr
        .attr('y', d => height - d) // for each, set y attr
        .attr('width', 15) // for each, set width attribute
        .attr('height', data => data)
        .attr('fill', 'purple');

    const svgString = domNodeToString(svg.node());

    const image = new canvasModule.Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml; charset=utf-8' });
    console.log('URL', URL.prototype);
    console.log('BLOB', svgBlob);
    // const url = URL.createObjectURL(svgBlob);
    // const canvas = d3n.createCanvas(width, height);
    // const context = canvas.getContext('2d');
    return d3n.svgString();
}

app.get('/api/d3', jsonParser, (req, res) => {
    res.setHeader('content-type', 'image/svg+xml');
    res.status(200).send(createD3Chart());
});

// start API
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`You are now listening to http://localhost:${port}`);
});
