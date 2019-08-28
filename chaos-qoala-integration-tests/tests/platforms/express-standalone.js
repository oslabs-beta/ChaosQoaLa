/* eslint-disable global-require */
const express = require('express');
const expressGraphQL = require('express-graphql');
const path = require('path');
const fs = require('fs');
const { buildSchema } = require('graphql');

// Create an express server and a GraphQL endpoint
const app = express();

// 🐨 🐨 🐨 🐨 🐨 🐨 🐨 🐨 🐨
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-extraneous-dependencies
const { chaos, chaosSocketServer } = require('chaos-qoala-agent');

app.use(chaos);
this.chaosSocketServer = chaosSocketServer;
// 🐨 🐨 🐨 🐨 🐨 🐨 🐨 🐨 🐨

// get gql test schema definition
const pathToSchema = path.resolve(__dirname, '../gql-schema/schema.gql');
const schema = buildSchema(fs.readFileSync(pathToSchema, 'utf-8'));

// Root resolver
const root = {
  knockMeOut: () => 'I should be knocked out by Chaos QoaLa',
  dontKnockMeOut: () => 'I should NOT be knocked out by Chaos QoaLa',
};

app.use('/graphql', expressGraphQL({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`🚆 Express GraphQL Server ready at localhost:3000/graphql`);
});
