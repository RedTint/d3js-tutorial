const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();

const csv = require('csv-parser')
const fs = require('fs')
const data = require('./radial-bar.json');
const dataV2 = require('./radial-bar-modified.json');


app.get('/api/data', jsonParser, (req, res) => {
    console.log('Fetching data...');
    res.status(200);
    res.send(data);
});

app.get('/api/data-modified', jsonParser, (req, res) => {
    console.log('Fetching data...');
    res.status(200);
    res.send(dataV2);
});

// EXPOSE Radial Chart
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/13-radial-bar-chart-v3.html');
});

app.get('/v4', (req, res) => {
    res.sendFile(__dirname + '/13-radial-bar-chart-v4.html');
});

app.get('/v4-modified', (req, res) => {
    res.sendFile(__dirname + '/13-radial-bar-chart-v4-modified.html');
});

app.get('/v7-modified', (req, res) => {
    res.sendFile(__dirname + '/13-radial-bar-chart-v7-modified.html');
});

app.get('/v7-play', (req, res) => {
    res.sendFile(__dirname + '/13-playing-with-arc.html');
});

app.get('/d3.v3.min.js', (req, res) => {
    res.sendFile(__dirname + '/d3s/d3.v3.min.js');
});

app.get('/d3.v4.min.js', (req, res) => {
    res.sendFile(__dirname + '/d3s/d3.v4.min.js');
});

app.get('/d3@7.3.js', (req, res) => {
    res.sendFile(__dirname + '/d3s/d3@7.3.js');
});



// start API
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`You are now listening to http://localhost:${port}`);
});
