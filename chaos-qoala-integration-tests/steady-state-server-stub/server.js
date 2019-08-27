const express = require('express');
const getResults = require('./results');

const PORT = 7766;
const app = express();

let startTimeGlobal;

app.put('/steadystate/start/', (req, res) => {
  startTimeGlobal = new Date();
  res.sendStatus(200);
});

app.get('/steadystate/stop/:baseline/:lowerVariance/:upperVariance/:resultsPerSecond/', (req, res) => {
  const stopTime = new Date(Date.now());
  // if no start time then return client error 400
  if (!startTimeGlobal) return res.sendStatus(400);
  // send back results array based on user query params
  const baseline = parseInt(req.params.baseline, 10);
  const lowerVariance = parseInt(req.params.lowerVariance, 10);
  const upperVariance = parseInt(req.params.upperVariance, 10);
  const resultsPerSecond = parseInt(req.params.resultsPerSecond, 10);
  res.status(200);
  res.json(getResults(
    baseline,
    lowerVariance,
    upperVariance,
    startTimeGlobal,
    stopTime,
    resultsPerSecond,
  ));
  // reset start time so that we can do a clean start/stop cycle
  // on the next iteration of testing
  startTimeGlobal = undefined;
  return undefined;
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`📉 steady state service ready at localhost:${PORT}/steadystate/`);
});

module.exports = app;
