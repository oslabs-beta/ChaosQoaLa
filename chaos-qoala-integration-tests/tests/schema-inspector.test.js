const express = require('./platforms/express-graphql-app');

const platform = express;
const QueryInspector = require('./gql-schema/schemaInspector');

beforeAll(async () => {
  await platform.start();
});

describe('Schema Inspector', () => {
  test('basic test', async () => {
    const url = `http://localhost:${platform.port}/graphql`;
    const inspector = new QueryInspector(url);
    await inspector.hydrateQueryList();
    const queryList = inspector.getQueryList();
    expect(queryList.join()).toBe('message');
  });
});

// stop platform servers at end of all tests
afterAll(async (done) => {
  await platform.stop();
  done();
});
