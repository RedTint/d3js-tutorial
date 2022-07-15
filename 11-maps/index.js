const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();

const csv = require('csv-parser')
const fs = require('fs')

// EXPOSE DATA

const countyData = [];
const stateData = [];
const metricData = [];

app.get('/api/metric_data', jsonParser, (req, res) => {
    console.log('Fetching metric data...');

    if (!metricData.length) {
      fs.createReadStream('./data/metrics.csv')
        .pipe(csv())
        .on('data', (data) => metricData.push(data))
        .on('end', () => {
            res.status(200);
            res.send(metricData);
        });
    } else {
      res.status(200);
      res.send(metricData);
    }
});

// Helper function for getting metrics
const getMetric = (data, value, type) => {
  let { [value]: metric, county, state } = data

  if (type === 'percent') {
    metric = parseFloat(metric) * 100
    metric = Math.round(metric * 100) / 100 // round
  } else {
    metric = parseInt(metric)
  }

  return {
    metric: value,
    value: metric,
    county,
    state,
    type
  }
}

app.get('/api/county_data', jsonParser, (req, res) => {
    console.log('Fetching county data...');
    const {value, type} = req.query
    if (!countyData.length) {
      fs.createReadStream('./data/county_data.csv')
        .pipe(csv())
        .on('data', (data) => countyData.push(data))
        .on('end', () => {
          const filteredData = countyData.map(data => getMetric(data, value, type));
          res.status(200);
          res.send(filteredData);
        });
    } else {
      const filteredData = countyData.map(data => getMetric(data, value, type));
      res.status(200);
      res.send(filteredData);
    }
});

app.get('/api/state_data', jsonParser, (req, res) => {
    console.log('Fetching state data...');
    const {value, type} = req.query
    if (!stateData.length) {
      fs.createReadStream('./data/state_data.csv')
        .pipe(csv())
        .on('data', (data) => stateData.push(data))
        .on('end', () => {
          const filteredData = stateData.map(data => getMetric(data, value, type));
          res.status(200);
          res.send(filteredData);
        });
    } else {
      const filteredData = stateData.map(data => getMetric(data, value, type));
      res.status(200);
      res.send(filteredData);
    }

});

// EXPOSE STATE DATA

// EXPOSE MAP
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/11-maps.html');
});

app.get('/v1.1', (req, res) => {
    res.sendFile(__dirname + '/11-maps-v1_1.html');
});

// start API
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`You are now listening to http://localhost:${port}`);
});
