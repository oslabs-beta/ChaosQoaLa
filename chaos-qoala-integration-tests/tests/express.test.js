const fetch = require('node-fetch');
const io = require('socket.io-client');
// express with chaos agent embedded
const express = require('./platforms/express-graphql-app');
// import chaos config file - TODO: remove once controler has command line mode
const config = require('../chaos-qoala-config');
// get express config
const platform = express;

let agentDataReceived = false;

// increase default jest timeout as our tests intentionally add latency
jest.setTimeout(30000);

// start platform server before testing
beforeAll((done) => {
  platform.start();
  const socket = io.connect('http://localhost:1025');
  // define event handler for sucessfull connection
  socket.on('connect', async () => {
    socket.emit('eucalyptus', config, () => {
      done();
    });
  });
  // listen for incoming agent data sent during a chaos experiment
  socket.on('eucalyptus', (agentData) => {
    agentDataReceived = true;
  });
});

// test altering basic query response
describe('Chaos 🐨  Proof of Concept', () => {
  // note the async so we can await fetch
  test('change response data', async () => {
    // construct url
    const url = `http://localhost:${platform.port}/graphql`;

    // gql query
    const query = {
      query: '{ dontKnockMeOut, knockMeOut }',
      variables: null,
    };

    // start time
    const startTimeInMS = performance.now();

    // note we await the fetch to stop jest moving on
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });

    // expect the correct injection via chaos middleware
    const json = await response.json();
    expect(json.data.dontKnockMeOut).toBe('I should NOT be knocked out by Chaos QoaLa');
    expect(json.data.knockMeOut).toBe(undefined);

    // check time is within 3 seconds of the configured delay
    const THREE_SECONDS_IN_MS = 3000;
    const timeTakenInMS = performance.now() - startTimeInMS;
    expect(timeTakenInMS).toBeGreaterThan(config.delay);
    expect(timeTakenInMS).toBeLessThan(config.delay + THREE_SECONDS_IN_MS);
    expect(agentDataReceived).toBe(true);
  });
});

// stop platform servers at end of all tests
afterAll(() => {
  platform.stop();
});
