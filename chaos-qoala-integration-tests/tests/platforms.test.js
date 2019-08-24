const fetch = require('node-fetch');
// apollo with chaos agent embedded
const io = require('socket.io-client');
const apollo = require('./platforms/apollo-server-express-app');
// express with chaos agent embedded
const express = require('./platforms/express-graphql-app');
// import chaos config file - TODO: remove once controler has command line mode
const config = require('../chaos-qoala-config');

// TODO - add back in apollo
// array of platform implementations to test via jest test.each
const platforms = [express];

// increase default jest timeout as our tests intentionally add latency
jest.setTimeout(30000);

// start platform servers at before testing
beforeAll(async (done) => {
  // await apollo.start();
  await express.start();
  const socket = await io.connect('http://localhost:80');
  // define event handler for sucessfull connection
  await socket.on('connect', () => {
    socket.emit('eucalyptus', config, () => {
      done();
    });
  });
});

// test altering basic query response
describe('Chaos 🐨  Proof of Concept', () => {
  // note the async so we can await fetch
  test.each(platforms)('change response data', async (platform, done) => {
    // second arg here is config file -->

    // construct url
    const url = `http://localhost:${platform.port}/graphql`;

    // gql query
    const query = {
      query: '{ message }',
      variables: null,
    };

    // start time
    const startTimeInMS = performance.now();

    // note we await the fetch to stop jest moving on
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    })
      .then((response) => response.json())
      .then((json) => {
        expect(json.data.message).toBe('Hello Chaos QoaLa Injected This');
        // check time is within 3 seconds of the configured delay
        const THREE_SECONDS_IN_MS = 3000;
        const timeTakenInMS = performance.now() - startTimeInMS;
        expect(timeTakenInMS).toBeGreaterThan(config.delay);
        expect(timeTakenInMS).toBeLessThan(config.delay + THREE_SECONDS_IN_MS);
        done();
      });
  });
});

// stop platform servers at end of all tests
afterAll(async () => {
  await express.stop();
});
