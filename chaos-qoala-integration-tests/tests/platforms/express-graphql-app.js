/* eslint-disable global-require */
const express = require('express');
const expressGraphQL = require('express-graphql');
const path = require('path');
const fs = require('fs');
const { buildSchema } = require('graphql');

module.exports = {
  gqlserver: undefined,

  port: 3000,

  chaosSocketServer: undefined,

  start() {
    // Create an express server and a GraphQL endpoint
    const app = express();

    // 🐨 🐨 🐨 🐨 🐨 🐨 🐨 🐨 🐨
    const { chaos, chaosSocketServer } = require('chaosqoala-agent');
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

    this.gqlserver = app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`🚆 Express GraphQL Server ready at localhost:${this.port}/graphql`);
    });
  },

  stop() {
    // we need to close the chaos socket server for a clean exit
    this.chaosSocketServer.close();
    // then close the gql server
    this.gqlserver.close();
  },
};
